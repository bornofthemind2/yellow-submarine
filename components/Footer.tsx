
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-ocean-blue border-t border-light-blue/20 mt-12">
            <div className="container mx-auto px-4 py-6 text-center text-steel-blue">
                <p>&copy; {new Date().getFullYear()} Yellow Submarine Reviews. All Rights Reserved.</p>
                <p className="text-sm mt-2">For educational and entertainment purposes only. Please consume responsibly and in accordance with local laws.</p>
            </div>
        </footer>
    );
};

export default Footer;
