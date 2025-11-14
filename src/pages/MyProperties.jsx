import React, { useState, useEffect, use } from 'react';

import { useNavigate } from 'react-router-dom';
import {
    FaTag,
    FaMoneyBillWave,
    FaLocationDot,
    FaCalendarDays,
    FaPenToSquare,
    FaTrashCan,
    FaEye,
    FaXmark
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthContext';

const API_BASE_URL = 'http://localhost:3000';

const MyProperties = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();


    const [myProperties, setMyProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [editFormData, setEditFormData] = useState(null);

    const userEmail = user?.email;
    const categories = ['Rent', 'Sale', 'Commercial', 'Land', 'Apartment', 'House'];



    const fetchMyProperties = async (email) => {
        if (!email) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/properties/my-properties/${email}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setMyProperties(data);
        } catch (err) {
            console.error("Failed to fetch properties:", err);
            setError("Failed to load your properties. Please check the server connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyProperties(userEmail);
    }, [userEmail]);


    const openEditModal = (property) => {
        setEditingProperty(property);
        setEditFormData({
            propertyName: property.propertyName || '',
            description: property.description || '',
            category: property.category || '',
            price: property.price || 0,
            location: property.location || '',
            imageLink: property.imageLink || '',
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingProperty(null);
        setEditFormData(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!editingProperty || !editFormData) return;

        const propertyId = editingProperty._id;

        const updates = {
            propertyName: editFormData.propertyName,
            description: editFormData.description,
            category: editFormData.category,
            price: Number(editFormData.price),
            location: editFormData.location,
            imageLink: editFormData.imageLink,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/properties/${propertyId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Update failed on the server.');
            }

            Swal.fire('Success!', 'Property updated successfully!', 'success');


            // 🌟 EIKHANE PORIBORTON KORA HOLO: Redirect logic add kora holo
            closeEditModal();
            navigate(`/propertiesDetails/${propertyId}`);
            // Note: navigate korar age list refresh na kore navigate korle, details page-e giye data refresh hobe.
            // Jodi apnar details page auto-refresh na kore, tahole ei line-er age await fetchMyProperties(userEmail) call kora lagbe.
            // Ami ekhon shudhu navigate kora holo.

        } catch (error) {
            Swal.fire('Error!', error.message || 'Failed to update property.', 'error');
            console.error('❌ Update failed:', error.message);
        }
    };


    const handleDelete = async (id, propertyName) => {
        const result = await Swal.fire({
            title: `Are you sure you want to delete "${propertyName}"?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {

                const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Deletion failed on the server.');
                }


                setMyProperties(myProperties.filter(p => p._id !== id));

                Swal.fire('Deleted!', 'Your property has been deleted.', 'success');



            } catch (error) {
                Swal.fire('Error!', error.message || 'Failed to delete the property.', 'error');
            }
        }
    };

    // View Details Handler 
    const handleViewDetails = (id) => {

        navigate(`/propertiesDetails/${id}`);
    };


    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(price);
    };


    if (!user) {
        return <div className='text-center p-10 text-red-600'>Please log in to view your properties.</div>;
    }

    if (loading) {
        return <div className='text-center p-10 text-indigo-600'>Loading properties...</div>;
    }

    if (error) {
        return <div className='text-center p-10 text-red-600 font-bold'>{error}</div>;
    }

    return (
        <div className='p-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-6 border-b-4 border-indigo-500 pb-2'>
                My Properties ({myProperties.length})
            </h1>

            {myProperties.length === 0 ? (
                <div className='p-10 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded'>
                    <p className='text-lg'>You have not listed any properties yet. Add one now!</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {myProperties.map((property) => (
                        <div key={property._id} className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300'>

                            <h2 className='text-2xl font-extrabold text-indigo-700 mb-4'>{property.propertyName}</h2>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6 text-gray-600 text-sm'>

                                <p className='flex items-center gap-2'><FaTag className='text-indigo-500' /> **Category:** {property.category}</p>
                                <p className='flex items-center gap-2'><FaMoneyBillWave className='text-green-500' /> **Price:** {formatPrice(property.price)}</p>
                                <p className='flex items-center gap-2'><FaLocationDot className='text-red-500' /> **Location:** {property.location}</p>

                                <p className='flex items-center gap-2'><FaCalendarDays className='text-gray-500' /> **Posted Date:** {new Date(property.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div className='mt-5 pt-4 border-t flex flex-wrap gap-3'>
                                <button
                                    onClick={() => openEditModal(property)}
                                    className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
                                >
                                    <FaPenToSquare /> Update
                                </button>
                                <button
                                    onClick={() => handleDelete(property._id, property.propertyName)}
                                    className='flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
                                >
                                    <FaTrashCan /> Delete
                                </button>
                                <button
                                    onClick={() => handleViewDetails(property._id)}
                                    className='flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition'
                                >
                                    <FaEye /> View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isEditModalOpen && editFormData && editingProperty && (
                <div className='fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50 p-4 backdrop-blur-sm'>
                    <div className='bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 ring-4 ring-blue-400'>


                        <div className='sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center rounded-t-xl z-10'>
                            <h2 className='text-3xl font-extrabold'>✍️ Edit Property: {editingProperty.propertyName}</h2>
                            <button onClick={closeEditModal} className='p-3 rounded-full hover:bg-blue-700 transition duration-300'>
                                <FaXmark size={24} />
                            </button>
                        </div>


                        <form onSubmit={handleUpdateSubmit} className='p-8 space-y-6'>


                            <div className='p-4 bg-gray-50 rounded-lg border border-gray-200'>
                                <p className='text-sm text-gray-600'>User Name: <span className='font-semibold'>{editingProperty.userName}</span></p>
                                <p className='text-sm text-gray-600'>**User Email: <span className='font-semibold'>{editingProperty.userEmail}</span></p>
                            </div>


                            <label className='block'>
                                <span className='text-lg font-semibold text-gray-800'>Property Name</span>
                                <input type="text" name="propertyName" value={editFormData.propertyName} onChange={handleEditChange} required className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-3' />
                            </label>
                            <label className='block'>
                                <span className='text-lg font-semibold text-gray-800'>Description</span>
                                <textarea name="description" value={editFormData.description} onChange={handleEditChange} rows="4" required className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-3'></textarea>
                            </label>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <label className='block'>
                                    <span className='text-lg font-semibold text-gray-800'>Category</span>
                                    <select name="category" value={editFormData.category} onChange={handleEditChange} required className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-3 bg-white'>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className='block'>
                                    <span className='text-lg font-semibold text-gray-800'>Price (BDT)</span>
                                    <input type="number" name="price" value={editFormData.price} onChange={handleEditChange} required min="0" className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-3' />
                                </label>
                                <label className='block'>
                                    <span className='text-lg font-semibold text-gray-800'>Location</span>
                                    <input type="text" name="location" value={editFormData.location} onChange={handleEditChange} required className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-3' />
                                </label>
                            </div>

                            <label className='block'>
                                <span className='text-lg font-semibold text-gray-800'>Image Link (URL)</span>
                                <input type="url" name="imageLink" value={editFormData.imageLink} onChange={handleEditChange} required className='mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-3' />
                            </label>

                            <button
                                type="submit"
                                className='w-full py-3 bg-green-500 text-white text-xl font-extrabold rounded-xl shadow-lg hover:bg-green-600 transition'
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MyProperties;