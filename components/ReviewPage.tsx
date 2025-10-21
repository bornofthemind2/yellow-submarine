
import React, { useState, useCallback } from 'react';
import type { Review, VibePairing, Comment } from '../types';
import RatingStars from './RatingStars';
import { generateVibePairing } from '../services/geminiService';
import Spinner from './Spinner';

interface ReviewPageProps {
    review: Review;
    onBack: () => void;
    onUpdateReview: (review: Review) => void;
}

const InfoChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="bg-light-blue/20 text-sea-salt text-sm font-medium mr-2 mb-2 px-3 py-1.5 rounded-full">{children}</span>
);

const VibeCard: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-deep-blue/50 rounded-lg p-4 flex flex-col h-full">
        <div className="flex items-center mb-2">
            {icon}
            <h4 className="font-bold text-lg text-submarine-yellow ml-2">{title}</h4>
        </div>
        <div className="text-steel-blue text-sm">{children}</div>
    </div>
);

const ReviewPage: React.FC<ReviewPageProps> = ({ review, onBack, onUpdateReview }) => {
    const [vibe, setVibe] = useState<VibePairing | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isLiked, setIsLiked] = useState(false);
    const [commenterName, setCommenterName] = useState('');
    const [commentText, setCommentText] = useState('');
    const [commentError, setCommentError] = useState('');

    const handleGenerateVibe = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setVibe(null);
        try {
            const result = await generateVibePairing(review);
            setVibe(result);
        } catch (err) {
            setError('Failed to generate a vibe. The AI might be on a break. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [review]);

    const handleLike = () => {
        const newLikes = isLiked ? review.likes - 1 : review.likes + 1;
        setIsLiked(!isLiked);
        onUpdateReview({ ...review, likes: newLikes });
    };

    const handleShare = () => {
        alert('Sharing is caring! This feature is coming soon.');
    };
    
    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commenterName.trim() || !commentText.trim()) {
            setCommentError('Please fill out both name and comment fields.');
            return;
        }
        setCommentError('');
        const newComment: Comment = {
            id: Date.now(),
            author: commenterName.trim(),
            text: commentText.trim(),
        };
        onUpdateReview({
            ...review,
            comments: [...review.comments, newComment],
        });
        setCommenterName('');
        setCommentText('');
    };
    
    return (
        <div className="animate-fade-in bg-ocean-blue rounded-2xl shadow-2xl overflow-hidden">
             <div className="p-6 md:p-8">
                 <button onClick={onBack} className="flex items-center text-steel-blue hover:text-submarine-yellow transition-colors mb-6 font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to All Reviews
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img src={review.image} alt={review.name} className="w-full h-auto object-cover rounded-xl shadow-lg"/>
                    </div>
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-display text-submarine-yellow mb-1">{review.name}</h2>
                        <p className="text-lg text-steel-blue mb-4">{review.brand}</p>
                        
                        <div className="flex justify-between items-center mb-4">
                             <RatingStars rating={review.rating} size="lg" />
                             <div className="text-right">
                                <p className="font-bold text-xl text-sea-salt">{review.thc}% THC</p>
                                <p className="text-sm text-steel-blue">{review.cbd}% CBD</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 mb-6 pb-6 border-b border-light-blue/20">
                            <button onClick={handleLike} className={`flex items-center text-sea-salt transition-colors duration-200 group ${isLiked ? 'text-red-400' : 'hover:text-red-400'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                <span className="font-semibold">{review.likes}</span>
                            </button>
                            <div className="flex items-center text-sea-salt">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.08-3.239A8.962 8.962 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L8 14.586l-2.293-2.293z" clipRule="evenodd" /></svg>
                                <span className="font-semibold">{review.comments.length}</span>
                            </div>
                             <button onClick={handleShare} className="flex items-center text-sea-salt hover:text-green-400 transition-colors duration-200 group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
                                <span className="font-semibold">Share</span>
                            </button>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold text-sea-salt mb-2">Flavors</h3>
                            <div className="flex flex-wrap">{review.flavors.map(f => <InfoChip key={f}>{f}</InfoChip>)}</div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold text-sea-salt mb-2">Reported Effects</h3>
                            <div className="flex flex-wrap">{review.effects.map(e => <InfoChip key={e}>{e}</InfoChip>)}</div>
                        </div>

                        <p className="text-steel-blue leading-relaxed">{review.fullReview}</p>
                    </div>
                </div>
            </div>

            <div className="bg-deep-blue/30 p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-display text-center text-submarine-yellow mb-4">Generate Vibe Pairing</h3>
                    <div className="text-center">
                    <button 
                        onClick={handleGenerateVibe} 
                        disabled={isLoading}
                        className="bg-submarine-yellow text-deep-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-all duration-300 disabled:bg-steel-blue disabled:cursor-not-allowed transform hover:scale-105"
                    >
                        {isLoading ? 'Consulting the Oracle...' : 'Suggest a Vibe'}
                    </button>
                    </div>
                    
                {isLoading && <div className="mt-6 flex justify-center"><Spinner /></div>}
                {error && <p className="mt-4 text-center text-red-400">{error}</p>}

                {vibe && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                        <VibeCard title="Activity" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-submarine-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                            <p className="font-semibold text-sea-salt">{vibe.activity.name}</p>
                            <p>{vibe.activity.description}</p>
                        </VibeCard>
                            <VibeCard title="Music" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-submarine-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>}>
                            <p className="font-semibold text-sea-salt">{vibe.music.album} by {vibe.music.artist}</p>
                            <p>{vibe.music.description}</p>
                        </VibeCard>
                            <VibeCard title="Movie" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-submarine-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>}>
                            <p className="font-semibold text-sea-salt">{vibe.movie.title} ({vibe.movie.year})</p>
                            <p>{vibe.movie.description}</p>
                        </VibeCard>
                    </div>
                )}
                </div>
            </div>

            <div className="bg-deep-blue/30 p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-display text-center text-submarine-yellow mb-6">Community Buzz</h3>
                    
                    <form onSubmit={handleCommentSubmit} className="bg-ocean-blue rounded-lg p-4 mb-8 shadow-inner">
                        <h4 className="font-bold text-lg text-sea-salt mb-3">Leave a Comment</h4>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={commenterName}
                                onChange={(e) => setCommenterName(e.target.value)}
                                className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt focus:outline-none focus:ring-2 focus:ring-submarine-yellow"
                                aria-label="Your Name"
                            />
                        </div>
                        <div className="mb-2">
                        <textarea
                            placeholder="Share your thoughts..."
                            rows={4}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full bg-deep-blue border border-light-blue/20 rounded-md py-2 px-3 text-sea-salt focus:outline-none focus:ring-2 focus:ring-submarine-yellow"
                            aria-label="Your Comment"
                        />
                        </div>
                        {commentError && <p className="text-red-400 text-sm mt-1">{commentError}</p>}
                        <div className="text-right mt-2">
                            <button type="submit" className="text-sm text-deep-blue font-semibold bg-submarine-yellow px-6 py-2 rounded-full hover:bg-yellow-300 transition-colors">
                                Post Comment
                            </button>
                        </div>
                    </form>

                    <div className="space-y-4">
                        {review.comments.length > 0 ? (
                            review.comments.slice().reverse().map(comment => (
                                <div key={comment.id} className="bg-ocean-blue rounded-lg p-4 flex items-start space-x-4">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-light-blue flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sea-salt" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sea-salt">{comment.author}</p>
                                        <p className="text-steel-blue leading-relaxed">{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-steel-blue py-4">No comments yet. Be the first to share your thoughts!</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-charcoal/30 p-6 md:p-8">
                 <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-display text-center text-submarine-yellow mb-6">Where to Buy</h3>
                    <div className="space-y-4">
                        <div className="bg-ocean-blue rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg text-sea-salt">Stash & Co.</h4>
                                <p className="text-sm text-steel-blue">Online Retailer</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-xl text-submarine-yellow">$55.00</p>
                                 <a href="#" className="text-sm text-deep-blue font-semibold bg-submarine-yellow px-4 py-1 rounded-full mt-1 inline-block hover:bg-yellow-300 transition-colors">View Deal</a>
                            </div>
                        </div>
                         <div className="bg-ocean-blue rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg text-sea-salt">The Green Room</h4>
                                <p className="text-sm text-steel-blue">Local Dispensary Network</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-xl text-submarine-yellow">$58.50</p>
                                <a href="#" className="text-sm text-deep-blue font-semibold bg-submarine-yellow px-4 py-1 rounded-full mt-1 inline-block hover:bg-yellow-300 transition-colors">View Deal</a>
                            </div>
                        </div>
                         <div className="bg-ocean-blue rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg text-sea-salt">CannaCrate</h4>
                                <p className="text-sm text-steel-blue">Subscription Service</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-xl text-submarine-yellow">$62.00</p>
                                <a href="#" className="text-sm text-deep-blue font-semibold bg-submarine-yellow px-4 py-1 rounded-full mt-1 inline-block hover:bg-yellow-300 transition-colors">View Deal</a>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>

            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                 @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default ReviewPage;
