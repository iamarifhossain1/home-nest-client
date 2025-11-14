import React, { useState, useEffect, use } from 'react';
import { FaArrowLeftLong, FaLocationDot, FaUser, FaEnvelope, FaPhone, FaStar, FaRegStar, FaMoneyBillWave } from 'react-icons/fa6';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthContext';

const API_BASE_URL = 'https://home-nest-server-fp6l8gc6y-arif-hossains-projects-a41d4c7a.vercel.app';

const StarDisplay = ({ rating, size = 18 }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - Math.ceil(rating);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" size={size} />);
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-400" size={size} />);
    }

    return <div className="flex items-center gap-1">{stars}</div>;
};



const RatingsAndReviews = ({ propertyId, initialPropertyData }) => {
    const { user } = use(AuthContext);
    const [property, setProperty] = useState(initialPropertyData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [newRating, setNewRating] = useState(0);
    const [newReviewText, setNewReviewText] = useState('');
    const [submitting, setSubmitting] = useState(false);


    const fetchPropertyDetails = async (id) => {
        setLoading(true);
        setError(null);
        try {

            const response = await fetch(`${API_BASE_URL}/properties/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProperty(data);
        } catch (err) {
            console.error("Failed to fetch property details for refresh:", err);
            setError("Failed to load reviews.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (propertyId) {
            // 
        }
    }, [propertyId]);


    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire('Error', 'Please login to submit a review.', 'error');
            return;
        }
        if (newRating === 0) {
            Swal.fire('Error', 'Please select a star rating.', 'error');
            return;
        }

        setSubmitting(true);

        const reviewData = {
            propertyId: propertyId,
            propertyName: property.propertyName,
            propertyThumbnail: property.imageLink,
            reviewerId: user.email,
            reviewerName: user.displayName || user.email,
            starRating: newRating,
            reviewText: newReviewText,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit review.');
            }

            Swal.fire('Success!', 'Your review has been submitted.', 'success');
            setNewRating(0);
            setNewReviewText('');

            fetchPropertyDetails(propertyId);

        } catch (error) {
            Swal.fire('Error!', error.message || 'Failed to submit review.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className='text-center p-5 text-indigo-600'>Loading reviews...</div>;
    }

    if (error) {
        return <div className='text-center p-5 text-red-600 font-bold'>{error}</div>;
    }


    return (
        <div className='mt-8 pt-6 border-t-4 border-indigo-300'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6'>Ratings & Reviews ({property?.reviewCount || 0})</h2>

            <div className='mb-8 p-6 bg-gray-50 rounded-xl shadow-inner'>
                <h3 className='text-2xl font-semibold mb-4'>Write a Review</h3>
                <form onSubmit={handleReviewSubmit}>
                    <div className='mb-4'>
                        <label className='block text-lg font-medium text-gray-700'>Star Rating</label>
                        <div className='flex gap-1 text-3xl mt-2'>
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <FaStar
                                        key={ratingValue}
                                        className={ratingValue <= newRating ? 'text-yellow-500 cursor-pointer' : 'text-gray-300 cursor-pointer'}
                                        onClick={() => setNewRating(ratingValue)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="reviewText" className='block text-lg font-medium text-gray-700'>Short Review Text</label>
                        <textarea
                            id="reviewText"
                            rows="3"
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            required
                            maxLength={300}
                            className='mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3'
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting || newRating === 0 || !user}
                        className='px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-indigo-400 transition'
                    >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    {!user && <p className='text-sm text-red-500 mt-2'>You must be logged in to post a review.</p>}
                </form>
            </div>

            <div className='space-y-4'>
                {property?.reviews && property.reviews.length > 0 ? (
                    property.reviews.map(review => (
                        <div key={review._id} className='bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <p className='font-bold text-lg'>{review.reviewerName}</p>
                                    <StarDisplay rating={review.starRating} size={16} />
                                </div>
                                <p className='text-sm text-gray-500'>{new Date(review.reviewDate).toLocaleDateString()}</p>
                            </div>
                            <p className='mt-2 text-gray-700 italic'>"{review.reviewText}"</p>
                        </div>
                    ))
                ) : (
                    <div className='p-5 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded'>
                        No reviews yet. Be the first one to rate this property!
                    </div>
                )}
            </div>
        </div>
    );
};


const PropertiesDetails = () => {

    const propertiseData = useLoaderData();

    const { id } = useParams();


    const handleBookNow = () => {
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Booked",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const {
        propertyName,
        description,
        price,
        location,
        imageLink,
        userName,
        userEmail,
        phoneNumber,
        createdAt
    } = propertiseData;

    return (
        <div className='container mx-auto p-4 md:p-10 bg-gray-50 min-h-screen'>
            <div className='flex justify-start mb-6'>

                <Link to='/allProperties' className='flex items-center gap-2 text-gray-700 transition duration-300 font-medium'>
                    <FaArrowLeftLong />
                    Back To Properties
                </Link>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

                <div className='lg:col-span-2'>

                    <img
                        src={imageLink || propertiseData.thumbnail}
                        className='w-full max-h-[500px] object-cover rounded-xl shadow-xl border border-gray-200'
                        alt={propertyName}
                    />

                    <div className='mt-8 bg-white p-6 rounded-xl shadow-lg'>
                        <h2 className='text-xl lg:text-3xl font-bold text-gray-800 mb-4'>Property Description</h2>
                        <hr className='text-gray-200 mb-6' />
                        <p className='text-base lg:text-lg text-gray-700 leading-relaxed'>
                            {description}
                        </p>
                    </div>
                </div>


                <div className='lg:col-span-1 space-y-8'>

                    <div className='bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#FA6509]'>
                        <h1 className='text-2xl lg:text-4xl font-extrabold text-gray-900 mb-2'>{propertyName}</h1>
                        <div className='mt-4'>
                            <h2 className='text-xl lg:text-3xl font-bold text-green-600'>
                                {price}
                            </h2>
                            <p className='text-sm text-gray-500 mt-1'>Per unit/month</p>
                        </div>
                    </div>


                    <div className='bg-white p-6 rounded-xl shadow-lg'>
                        <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2'>Product Details</h3>
                        <div className='space-y-2 text-gray-700'>
                            <p><strong>Category:</strong> {propertiseData.category}</p>
                            <p><strong>Posted:</strong> {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    </div>


                    <div className='bg-white p-6 rounded-xl shadow-lg'>
                        <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2'>Seller Information</h3>
                        <div className='space-y-3 text-gray-700'>

                            <p className='flex items-center gap-2'>
                                <FaUser className='text-indigo-500' />
                                <strong>Posted By:</strong> {userName || propertiseData.postedBy}
                            </p>

                            {phoneNumber && (
                                <p className='flex items-center gap-2 text-lg font-bold text-blue-700'>
                                    <FaPhone className='text-blue-600' />
                                    <span className='font-normal text-gray-700'>
                                        <strong>Contact:</strong> {phoneNumber}
                                    </span>
                                </p>
                            )}

                            {userEmail && (
                                <p className='flex items-center gap-2'>
                                    <FaEnvelope className='text-indigo-500' />
                                    <strong>Email:</strong> {userEmail}
                                </p>
                            )}

                            <p className='flex items-center gap-2'>
                                <FaLocationDot className='text-red-500' />
                                <strong>Location:</strong> {location}
                            </p>

                        </div>
                    </div>


                    <button onClick={handleBookNow} className='w-full py-3 bg-[#FA6509] cursor-pointer text-white font-semibold rounded-lg shadow-md transition duration-300'>
                        Book Now
                    </button>
                </div>
            </div>


            <h1 className='text-4xl text-center mt-10'>Ratings</h1>
            <div className='lg:col-span-3 mt-4'>

                <RatingsAndReviews propertyId={propertiseData._id} initialPropertyData={propertiseData} />
            </div>

        </div>
    );
};

export default PropertiesDetails;