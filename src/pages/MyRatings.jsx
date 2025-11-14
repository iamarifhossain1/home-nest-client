
import React, { useState, useEffect, use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FaCalendarDays, FaTag, FaStar, FaRegStar } from 'react-icons/fa6'; // FaStar, FaRegStar import kora holo

const API_BASE_URL = 'https://home-nest-server-fp6l8gc6y-arif-hossains-projects-a41d4c7a.vercel.app';


const StarDisplay = ({ rating, size = 18 }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - Math.ceil(rating);

    const stars = [];


    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" size={size} />);
    }


    if (rating % 1 !== 0) {
        // 
        //
    }


    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-400" size={size} />);
    }

    return <div className="flex items-center gap-1">{stars}</div>;
};


const MyRatings = () => {
    const { user } = use(AuthContext);

    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const reviewerId = user?.email;

    const fetchMyReviews = async (id) => {
        if (!id) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/reviews/my-reviews/${id}`);
            const data = await response.json();

            if (response.status === 200) {
                setMyReviews(data);
            } else {
                if (data.length === 0) {
                    setMyReviews([]);
                } else {
                    throw new Error(data.message || 'Failed to load your reviews.');
                }
            }

        } catch (err) {
            console.error("Failed to fetch reviews:", err);
            setError("Failed to load your reviews. Please check server connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyReviews(reviewerId);
    }, [reviewerId]);


    if (!user) {
        return <div className='text-center p-10 text-red-600'>Please log in to view your ratings.</div>;
    }

    if (loading) {
        return <div className='text-center p-10 text-indigo-600'>Loading your ratings...</div>;
    }

    if (error) {
        return <div className='text-center p-10 text-red-600 font-bold'>{error}</div>;
    }

    return (
        <div className='p-8 max-w-6xl mx-auto'>
            <h1 className='text-2xl lg:text-4xl font-bold text-gray-800 mb-8 border-b-4 border-yellow-500 pb-2'>
                My Ratings & Feedback ({myReviews.length})
            </h1>

            {myReviews.length === 0 ? (
                <div className='p-10 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded'>
                    <p className='text-lg'>You have not submitted any reviews yet.</p>
                </div>
            ) : (
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {myReviews.map((review) => (
                        <div key={review._id} className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col'>


                            {review.propertyThumbnail && (
                                <img
                                    src={review.propertyThumbnail}
                                    alt={review.propertyName}
                                    className='w-full h-40 object-cover rounded-lg mb-4'
                                />
                            )}


                            <h2 className='text-xl font-extrabold text-indigo-700 mb-2'>
                                {review.propertyName}
                            </h2>


                            <div className='flex items-center gap-2 mb-3'>
                                <StarDisplay rating={review.starRating} size={20} />
                                <span className='text-gray-600 text-sm'>({review.starRating} / 5)</span>
                            </div>


                            <p className='text-gray-800 italic mb-4 flex-grow'>
                                "{review.reviewText}"
                            </p>

                            <hr className='my-2' />


                            <div className='text-sm text-gray-500 mt-auto'>
                                <p className='flex items-center gap-1'>
                                    <FaTag /> Reviewed by: {review.reviewerName || 'N/A'}
                                </p>
                                <p className='flex items-center gap-1 mt-1'>
                                    <FaCalendarDays /> Date: {new Date(review.reviewDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRatings;