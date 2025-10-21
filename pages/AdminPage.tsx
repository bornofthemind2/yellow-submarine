
import React, { useState } from 'react';
import type { Review } from '../types';
import { ProductCategory, StrainType } from '../types';

interface AdminPageProps {
    onAddReview: (review: Omit<Review, 'id' | 'likes' | 'comments'>) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onAddReview }) => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: ProductCategory.FLOWER,
        strain: StrainType.HYBRID,
        image: '',
        rating: 3,
        thc: 20,
        cbd: 1,
        effects: '',
        flavors: '',
        summary: '',
        fullReview: '',
        price: 49.99,
        isFeatured: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReviewData = {
            ...formData,
            rating: Number(formData.rating),
            thc: Number(formData.thc),
            cbd: Number(formData.cbd),
            effects: formData.effects.split(',').map(s => s.trim()),
            flavors: formData.flavors.split(',').map(s => s.trim()),
        };
        onAddReview(newReviewData);
    };

    const inputClass = "w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt focus:outline-none focus:ring-2 focus:ring-submarine-yellow";
    const labelClass = "block text-sea-salt font-bold mb-2";

    return (
        <div className="bg-ocean-blue p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-display text-submarine-yellow text-center mb-6">Admin Panel - Add New Review</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Column 1 */}
                <div className="space-y-4">
                    <div>
                        <label className={labelClass} htmlFor="name">Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} required />
                    </div>
                     <div>
                        <label className={labelClass} htmlFor="brand">Brand</label>
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="image">Image URL</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className={labelClass} htmlFor="category">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
                                {Object.values(ProductCategory).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className={labelClass} htmlFor="strain">Strain</label>
                            <select name="strain" value={formData.strain} onChange={handleChange} className={inputClass}>
                                {Object.values(StrainType).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                     <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className={labelClass} htmlFor="rating">Rating (1-5)</label>
                            <input type="number" name="rating" value={formData.rating} onChange={handleChange} className={inputClass} min="1" max="5" step="1" required />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="thc">THC %</label>
                            <input type="number" name="thc" value={formData.thc} onChange={handleChange} className={inputClass} min="0" step="0.1" required />
                        </div>
                         <div>
                            <label className={labelClass} htmlFor="cbd">CBD %</label>
                            <input type="number" name="cbd" value={formData.cbd} onChange={handleChange} className={inputClass} min="0" step="0.1" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass} htmlFor="price">Price ($)</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                className={inputClass} 
                                min="0" 
                                step="0.01" 
                                required 
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                                    className="form-checkbox h-5 w-5 text-submarine-yellow rounded border-light-blue/20 focus:ring-submarine-yellow"
                                />
                                <span className={labelClass}>Feature in Hero</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                     <div>
                        <label className={labelClass} htmlFor="flavors">Flavors (comma-separated)</label>
                        <input type="text" name="flavors" value={formData.flavors} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="effects">Effects (comma-separated)</label>
                        <input type="text" name="effects" value={formData.effects} onChange={handleChange} className={inputClass} required />
                    </div>
                     <div>
                        <label className={labelClass} htmlFor="summary">Summary</label>
                        <textarea name="summary" value={formData.summary} onChange={handleChange} className={inputClass} rows={3} required />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="fullReview">Full Review</label>
                        <textarea name="fullReview" value={formData.fullReview} onChange={handleChange} className={inputClass} rows={5} required />
                    </div>
                </div>

                <div className="md:col-span-2 text-center mt-4">
                     <button type="submit" className="w-full md:w-auto bg-submarine-yellow text-deep-blue font-bold py-3 px-12 rounded-full hover:bg-yellow-300 transition-all duration-300 text-lg uppercase tracking-wider">
                        Add Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPage;
