
import React from 'react';
import ReviewCard from './ReviewCard';
import type { Review } from '../types';

interface ReviewGridProps {
    reviews: Review[];
    navigate: (path: string) => void;
}

const ReviewGrid: React.FC<ReviewGridProps> = ({ reviews, navigate }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} navigate={navigate} />
            ))}
        </div>
    );
};

export default ReviewGrid;
