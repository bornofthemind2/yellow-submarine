
import React, { useContext } from 'react';
import { AuthContext } from '../App';
import { UserRole, ProductCategory } from '../types';

interface HeaderProps {
    navigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
    const auth = useContext(AuthContext);

    const navLinks = [
        { name: 'Flower', href: `/?category=${ProductCategory.FLOWER}` },
        { name: 'Edibles', href: `/?category=${ProductCategory.EDIBLE}` },
        { name: 'Concentrates', href: `/?category=${ProductCategory.CONCENTRATE}` },
        { name: 'Vapes', href: `/?category=${ProductCategory.VAPE}` },
    ];

    return (
        <header className="bg-charcoal/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-deep-blue/20">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center space-x-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-submarine-yellow" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.383 3.674c-2.452.964-4.383 3.012-4.383 5.336v2h-2c-1.104 0-2 .896-2 2v2h-2v2h20v-2h-2v-2c0-1.104-.896-2-2-2h-2v-2c0-2.324-1.931-4.372-4.383-5.336l-.617-1.664-.617 1.664zm-4.383 7.336v2h10v-2c0-2.761-2.239-5-5-5s-5 2.239-5 5zm5 4c-1.656 0-3.17.832-4.062 2h8.124c-.892-1.168-2.406-2-4.062-2z"/>
                    </svg>
                    <h1 className="text-2xl font-display text-sea-salt uppercase tracking-widest">
                        Yellow Submarine
                    </h1>
                </a>
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a 
                            href={link.href} 
                            key={link.name}
                            onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                            className="text-steel-blue hover:text-submarine-yellow font-semibold tracking-wider uppercase text-sm transition-colors duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                    {auth?.user ? (
                        <>
                            {auth.user.role === UserRole.ADMIN && (
                                <>
                                    <button onClick={() => navigate('/admin')} className="text-steel-blue hover:text-submarine-yellow font-semibold tracking-wider uppercase text-sm transition-colors duration-300">
                                        Admin Panel
                                    </button>
                                    <button onClick={() => navigate('/products')} className="text-steel-blue hover:text-submarine-yellow font-semibold tracking-wider uppercase text-sm transition-colors duration-300">
                                        Products
                                    </button>
                                </>
                            )}
                            <button onClick={auth.logout} className="bg-submarine-yellow text-deep-blue font-bold py-2 px-5 rounded-full hover:bg-yellow-300 transition-all duration-300 text-sm uppercase tracking-wider">
                                Logout
                            </button>
                        </>
                    ) : (
                         <>
                            <button onClick={() => navigate('/login')} className="text-steel-blue hover:text-submarine-yellow font-semibold tracking-wider uppercase text-sm transition-colors duration-300">
                                Login
                            </button>
                            <button onClick={() => navigate('/register')} className="bg-submarine-yellow text-deep-blue font-bold py-2 px-5 rounded-full hover:bg-yellow-300 transition-all duration-300 text-sm uppercase tracking-wider">
                                Register
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
