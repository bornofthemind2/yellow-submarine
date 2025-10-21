
import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';

interface LoginPageProps {
    navigate: (path: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!auth?.login(username, password)) {
            setError('Invalid username or password.');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-ocean-blue p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-display text-submarine-yellow text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sea-salt font-bold mb-2" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt focus:outline-none focus:ring-2 focus:ring-submarine-yellow"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sea-salt font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt focus:outline-none focus:ring-2 focus:ring-submarine-yellow"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-submarine-yellow text-deep-blue font-bold py-3 px-5 rounded-full hover:bg-yellow-300 transition-all duration-300 text-lg uppercase tracking-wider">
                    Sign In
                </button>
                 <p className="text-center text-steel-blue mt-4">
                    Don't have an account?{' '}
                    <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }} className="text-submarine-yellow hover:underline">
                        Register here
                    </a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
