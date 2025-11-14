import React, { useState, useEffect, use } from 'react';
import {
    FaPlus,
    FaXmark,
    FaLocationDot,
    FaTag,
    FaEnvelope,
    FaUser,
    FaMoneyBillWave,
    FaPhone
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthContext';


const API_BASE_URL = 'https://home-nest-server-sand.vercel.app';

const AddProperties = () => {

    const { user } = use(AuthContext);

    const userEmail = user?.email || 'unauthorized@default.com';
    const userName = user?.displayName || user?.name || 'Anonymous';

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [addedProperties, setAddedProperties] = useState([]);

    const [formData, setFormData] = useState({
        propertyName: '',
        description: '',
        category: '',
        price: '',
        location: '',
        imageLink: '',
        phoneNumber: '',
        userEmail: userEmail,
        userName: userName,
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            userEmail: user?.email || 'unauthorized@default.com',
            userName: user?.displayName || user?.name || 'Unauthorized User'
        }));
    }, [user]);

    const openModal = () => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You must be logged in to add a property.',
                confirmButtonColor: '#ff9800'
            });
            return;
        }
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const categories = [
        'Rent',
        'Sale',
        'Commercial',
        'Land',
        'Apartment',
        'House'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'User data is missing. Please log in again.',
                confirmButtonColor: '#ef4444'
            });
            return;
        }

        const API_URL = `${API_BASE_URL}/properties`;

        try {
            const propertyData = {
                ...formData,
                price: Number(formData.price),
                createdAt: new Date(),
                userEmail: userEmail,
                userName: userName
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propertyData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Property added successfully and saved to the database!',
                confirmButtonColor: '#4f46e5'
            });

            const addedPropertyWithId = { ...propertyData, _id: result.insertedId || Date.now() };

            setAddedProperties(prev => [addedPropertyWithId, ...prev]);

            closeModal();

            setFormData({
                propertyName: '',
                description: '',
                category: '',
                price: '',
                location: '',
                imageLink: '',
                phoneNumber: '',
                userEmail: userEmail,
                userName: userName,
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed!',
                text: `Error: ${error.message}. Please ensure the server is running and all fields are valid.`,
                confirmButtonColor: '#ef4444'
            });
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className='p-6 min-h-screen'>


            <div className='flex justify-center'>
                <button
                    onClick={openModal}
                    className='flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] disabled:bg-gray-400'
                    disabled={!user}
                >
                    <FaPlus />
                    Add New Property
                </button>
            </div>

            {!user && (
                <p className='mt-2 text-sm text-red-500 text-center'>⚠️ Please log in to add a property.</p>
            )}

            {addedProperties.length > 0 && (
                <div className='mt-8 space-y-4'>
                    <h3 className='text-2xl font-bold text-gray-800 mb-4 border-b pb-2'>Recently Added Properties ({addedProperties.length})</h3>

                    <div className='p-4 bg-red-100 text-red-700 rounded-lg'>
                        This list only shows properties added during this session. Please use the **My Properties** page to view all your listings.
                    </div>
                    {addedProperties.map((property) => (
                        <div key={property._id} className='p-6 border-2 border-dashed border-green-500 bg-green-50 rounded-xl shadow-lg transition-opacity duration-500'>
                            <h4 className='text-xl font-bold text-green-700 mb-3 border-b pb-2'>
                                {property.propertyName}
                            </h4>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600'>
                                <p className='flex items-center gap-2'><FaTag className='text-indigo-500' /> **Category:** {property.category}</p>
                                <p className='flex items-center gap-2'><FaMoneyBillWave className='text-green-500' /> **Price:** {formatPrice(property.price)}</p>
                                <p className='flex items-center gap-2'><FaLocationDot className='text-red-500' /> **Location:** {property.location}</p>
                                {property.phoneNumber && (
                                    <p className='flex items-center gap-2'><FaPhone className='text-blue-500' /> **Contact:** {property.phoneNumber}</p>
                                )}
                                <p className='flex items-center gap-2'><FaUser className='text-gray-500' /> **Posted By:** {property.userName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {isModalOpen && (
                <div className='fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50 p-4 backdrop-blur-sm'>
                    <div className='bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 ring-4 ring-indigo-400'>

                        <div className='sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-xl z-10'>
                            <h2 className='text-3xl font-extrabold'> Add Your Property</h2>
                            <button onClick={closeModal} className='p-3 rounded-full hover:bg-indigo-700 transition duration-300'>
                                <FaXmark size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='p-8 space-y-6'>

                            <div className='grid grid-cols-1 gap-6'>
                                <label className='block'>
                                    <span className='text-lg font-semibold text-gray-800'>Property Name</span>
                                    <input
                                        type="text"
                                        name="propertyName"
                                        value={formData.propertyName}
                                        onChange={handleChange}
                                        required
                                        placeholder="E.g., Sunny 3-Bedroom Apartment"
                                        className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150'
                                    />
                                </label>
                                <label className='block'>
                                    <span className='text-lg font-semibold text-gray-800'>Description</span>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                        placeholder="A detailed description of the property, features, and amenities."
                                        className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150'
                                    ></textarea>
                                </label>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <label className='block'>
                                    <span className='text-lg font-semibold text-gray-800'>Category</span>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150 bg-white'
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className='block'>
                                    <span className='text-lg font-semibold text-gray-800'>Price (BDT)</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        placeholder="e.g., 500000"
                                        className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150'
                                    />
                                </label>
                                <label className='block'>
                                    <span className='text-lg font-semibold text-gray-800'>Location (City/Address)</span>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Gulshan, Dhaka"
                                        className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150'
                                    />
                                </label>
                            </div>

                            <label className='block'>
                                <span className='text-lg font-semibold text-gray-800'>Image Link (URL)</span>
                                <input
                                    type="url"
                                    name="imageLink"
                                    value={formData.imageLink}
                                    onChange={handleChange}
                                    required
                                    placeholder="https://example.com/property.jpg"
                                    className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150'
                                />
                            </label>

                            <label className='block'>
                                <span className='text-lg font-semibold text-gray-800'>Contact Phone Number</span>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., +8801XXXXXXXXX"
                                    className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 transition duration-150'
                                />
                            </label>


                            <div className='p-5 bg-gray-50 rounded-xl border border-gray-200'>
                                <h4 className='text-xl font-bold text-gray-800 mb-3 border-b pb-2'>Posting User Information</h4>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-base text-gray-700'>
                                    <p className='flex items-center gap-2'><FaUser className='text-indigo-500' /> User Name: <span className='font-bold text-indigo-600'>{userName}</span></p>
                                    <p className='flex items-center gap-2'><FaEnvelope className='text-indigo-500' /> User Email: <span className='font-bold text-indigo-600 break-all'>{userEmail}</span></p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className='w-full py-3 bg-green-500 text-white text-xl font-extrabold rounded-xl shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-[1.01]'
                            >
                                Add Property
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProperties;