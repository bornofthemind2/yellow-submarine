
import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';

interface RegisterPageProps {
    navigate: (path: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!auth?.register(username, password)) {
            setError('Username is already taken.');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-ocean-blue p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-display text-submarine-yellow text-center mb-6">Create Account</h2>
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
                <div className="mb-4">
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
                 <div className="mb-6">
                    <label className="block text-sea-salt font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt focus:outline-none focus:ring-2 focus:ring-submarine-yellow"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-submarine-yellow text-deep-blue font-bold py-3 px-5 rounded-full hover:bg-yellow-300 transition-all duration-300 text-lg uppercase tracking-wider">
                    Register
                </button>
                 <p className="text-center text-steel-blue mt-4">
                    Already have an account?{' '}
                    <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-submarine-yellow hover:underline">
                        Login here
                    </a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
