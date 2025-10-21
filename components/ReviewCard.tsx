
import React from 'react';
import type { Review } from '../types';
import { StrainType } from '../types';
import RatingStars from './RatingStars';

interface ReviewCardProps {
    review: Review;
    navigate: (path: string) => void;
}

const strainColorMap: Record<StrainType, string> = {
    [StrainType.SATIVA]: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    [StrainType.INDICA]: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    [StrainType.HYBRID]: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, navigate }) => {
    return (
        <div
            className="bg-ocean-blue rounded-xl overflow-hidden shadow-lg hover:shadow-submarine-yellow/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col group"
            onClick={() => navigate(`/review/${review.id}`)}
        >
            <div className="relative">
                <img className="w-full h-56 object-cover" src={review.image} alt={review.name} />
                <div className="absolute top-0 right-0 m-3 px-3 py-1 text-xs font-semibold text-sea-salt bg-deep-blue/70 backdrop-blur-sm rounded-full border border-light-blue/20">
                    {review.category}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-2xl text-sea-salt group-hover:text-submarine-yellow transition-colors duration-300">{review.name}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${strainColorMap[review.strain]}`}>{review.strain}</span>
                </div>
                <p className="text-steel-blue text-sm mb-4">{review.brand}</p>
                <p className="text-steel-blue text-base flex-grow">{review.summary}</p>
                 <div className="mt-4 pt-4 border-t border-light-blue/20 flex justify-between items-center">
                    <RatingStars rating={review.rating} />
                    <span className="text-sm font-semibold text-submarine-yellow">{review.thc}% THC</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
