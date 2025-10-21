import React from 'react';
import type { Review } from '../types';

interface HeroProps {
    featuredProducts: Review[];
    onProductClick: (productId: number) => void;
}

const Hero: React.FC<HeroProps> = ({ featuredProducts, onProductClick }) => {
    return (
        <div className="text-center mb-12 p-6">
            <h1 className="text-4xl md:text-6xl font-display text-charcoal tracking-wider uppercase mb-8">
                Find the <span className="text-sea-salt" style={{ textShadow: '1px 1px 3px rgba(28, 28, 28, 0.9)' }}>BEST</span> Cannabis
            </h1>
            <div className="max-w-6xl mx-auto mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {featuredProducts.map((product) => (
                        <div 
                            key={product.id}
                            onClick={() => onProductClick(product.id)}
                            className="bg-ocean-blue rounded-xl overflow-hidden shadow-lg hover:shadow-submarine-yellow/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                        >
                            <div className="relative">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-0 right-0 bg-submarine-yellow text-deep-blue px-3 py-1 m-2 rounded-full text-sm font-bold">
                                    Featured
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-xl text-sea-salt">{product.name}</h3>
                                <p className="text-steel-blue text-sm mb-2">{product.brand}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-submarine-yellow font-bold">${product.price.toFixed(2)}</span>
                                    <span className="text-steel-blue text-sm">{product.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="max-w-4xl mx-auto">
                    <img 
                        src="/cannabis-variants.png" 
                        alt="Cannabis variants: Indica, Sativa, Ruderalis, and Hybrid"
                        className="mx-auto"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </div>
            </div>
            <p className="mt-4 text-lg md:text-xl text-charcoal max-w-3xl mx-auto">
                With Reviews from Local Connoisseurs...
            </p>
        </div>
    );
};

export default Hero;