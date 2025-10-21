import React, { useState } from 'react';
import type { Review } from '../types';
import { ProductCategory, StrainType } from '../types';

interface ProductsPageProps {
    products: Review[];
    onUpdateProduct: (product: Review) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onUpdateProduct }) => {
    const [editingProduct, setEditingProduct] = useState<Review | null>(null);
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            onUpdateProduct(editingProduct);
            setEditingProduct(null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!editingProduct) return;
        
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? parseFloat(value) : 
                        type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                        value;
        
        setEditingProduct(prev => ({
            ...prev!,
            [name]: newValue
        }));
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-display text-submarine-yellow mb-6">Manage Products</h2>
            
            {editingProduct ? (
                <form onSubmit={handleSave} className="bg-ocean-blue p-6 rounded-xl shadow-lg mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sea-salt font-bold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editingProduct.name}
                                onChange={handleChange}
                                className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sea-salt font-bold mb-2">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={editingProduct.brand}
                                onChange={handleChange}
                                className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sea-salt font-bold mb-2">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={editingProduct.price}
                                onChange={handleChange}
                                className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sea-salt font-bold mb-2">Category</label>
                            <select
                                name="category"
                                value={editingProduct.category}
                                onChange={handleChange}
                                className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt"
                            >
                                {Object.values(ProductCategory).map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sea-salt font-bold mb-2">THC %</label>
                            <input
                                type="number"
                                name="thc"
                                value={editingProduct.thc}
                                onChange={handleChange}
                                className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt"
                                step="0.1"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sea-salt font-bold mb-2">CBD %</label>
                            <input
                                type="number"
                                name="cbd"
                                value={editingProduct.cbd}
                                onChange={handleChange}
                                className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt"
                                step="0.1"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={editingProduct.isFeatured}
                                    onChange={handleChange}
                                    className="form-checkbox h-5 w-5 text-submarine-yellow rounded border-light-blue/20"
                                />
                                <span className="text-sea-salt font-bold">Featured Product</span>
                            </label>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 text-steel-blue hover:text-sea-salt transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-submarine-yellow text-deep-blue font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            ) : null}
            
            <div className="overflow-x-auto">
                <table className="w-full bg-ocean-blue rounded-xl overflow-hidden">
                    <thead className="bg-deep-blue">
                        <tr>
                            <th className="px-6 py-4 text-left text-sea-salt">Product</th>
                            <th className="px-6 py-4 text-left text-sea-salt">Category</th>
                            <th className="px-6 py-4 text-left text-sea-salt">Price</th>
                            <th className="px-6 py-4 text-left text-sea-salt">THC/CBD</th>
                            <th className="px-6 py-4 text-left text-sea-salt">Featured</th>
                            <th className="px-6 py-4 text-left text-sea-salt">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-light-blue/20">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-deep-blue/30">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-bold text-sea-salt">{product.name}</div>
                                        <div className="text-sm text-steel-blue">{product.brand}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-steel-blue">{product.category}</td>
                                <td className="px-6 py-4 text-submarine-yellow font-bold">
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-steel-blue">
                                        THC: {product.thc}% / CBD: {product.cbd}%
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {product.isFeatured ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-submarine-yellow text-deep-blue">
                                            Featured
                                        </span>
                                    ) : null}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className="text-steel-blue hover:text-submarine-yellow transition-colors"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductsPage;