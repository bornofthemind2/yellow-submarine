
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ReviewGrid from './components/ReviewGrid';
import ReviewPage from './components/ReviewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ProductsPage from './pages/ProductsPage';
import { reviews as initialReviews, users as initialUsers } from './constants';
import type { Review, User } from './types';
import { UserRole } from './types';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    register: (username: string, password: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const App: React.FC = () => {
    const [allReviews, setAllReviews] = useState<Review[]>(initialReviews);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                return JSON.parse(storedUser);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            localStorage.removeItem('user'); // Clear corrupted data
        }
        return null;
    });
    const [route, setRoute] = useState(window.location.pathname + window.location.search);

    const navigate = useCallback((path: string) => {
        window.history.pushState({}, '', path);
        setRoute(path);
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            setRoute(window.location.pathname + window.location.search);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handleUpdateReview = (updatedReview: Review) => {
        const newReviews = allReviews.map(r => r.id === updatedReview.id ? updatedReview : r);
        setAllReviews(newReviews);
    };

    const handleAddReview = (newReview: Omit<Review, 'id' | 'likes' | 'comments'>) => {
        const newReviewWithId: Review = {
            ...newReview,
            id: Date.now(),
            likes: 0,
            comments: []
        };
        setAllReviews(prevReviews => [newReviewWithId, ...prevReviews]);
        navigate('/');
    };

    const authContextValue: AuthContextType = {
        user,
        login: (username, password) => {
            const foundUser = users.find(u => u.username === username && u.password === password);
            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('user', JSON.stringify(foundUser));
                return true;
            }
            return false;
        },
        logout: () => {
            setUser(null);
            localStorage.removeItem('user');
            navigate('/');
        },
        register: (username, password) => {
            if (users.some(u => u.username === username)) {
                return false; // Username already exists
            }
            const newUser: User = {
                id: Date.now(),
                username,
                password,
                role: UserRole.USER,
            };
            setUsers(prev => [...prev, newUser]);
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            return true;
        }
    };

    const renderPage = () => {
        const url = new URL(route, window.location.origin);
        const pathname = url.pathname;
        const params = url.searchParams;

        if (pathname.startsWith('/review/')) {
            const id = parseInt(pathname.split('/')[2]);
            const review = allReviews.find(r => r.id === id);
            if (!review) return <div className="text-center p-8">Review not found.</div>;
            return <ReviewPage review={review} onBack={() => navigate('/')} onUpdateReview={handleUpdateReview} />;
        }

        switch(pathname) {
            case '/login':
                return <LoginPage navigate={navigate} />;
            case '/register':
                return <RegisterPage navigate={navigate} />;
            case '/admin':
                if (user?.role !== UserRole.ADMIN) {
                    return <div className="text-center p-8">Access Denied. You must be an admin to view this page.</div>
                }
                return <AdminPage onAddReview={handleAddReview} />;
            case '/products':
                if (user?.role !== UserRole.ADMIN) {
                    return <div className="text-center p-8">Access Denied. You must be an admin to view this page.</div>
                }
                return <ProductsPage products={allReviews} onUpdateProduct={handleUpdateReview} />;
            case '/':
            default: {
                const category = params.get('category');
                const reviewsToDisplay = category
                    ? allReviews.filter(r => r.category === category)
                    : allReviews;
                return (
                    <>
                        <Hero 
                            featuredProducts={allReviews.filter(r => r.isFeatured)} 
                            onProductClick={(id) => navigate(`/review/${id}`)}
                        />
                        <ReviewGrid reviews={reviewsToDisplay} navigate={navigate} />
                    </>
                );
            }
        }
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <div className="flex flex-col min-h-screen">
                <Header navigate={navigate} />
                <main className="flex-grow container mx-auto px-4 py-8">
                    {renderPage()}
                </main>
                <Footer />
            </div>
        </AuthContext.Provider>
    );
};

export default App;