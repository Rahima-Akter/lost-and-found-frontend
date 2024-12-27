import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/axiosSecure';

const UpdateItem = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth();
    const [postType, setPostType] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [item, setItem] = useState({});
    const { id } = useParams();

    // Fetch the item details based on the ID
    useEffect(() => {
        fetch(`https://lost-and-found-server-two.vercel.app/singleItem/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setItem(result);
                // Initialize form states with item values
                setPostType(result.postType);
                setThumbnail(result.thumbnail);
                setTitle(result.title);
                setDescription(result.description);
                setCategory(result.category);
                setLocation(result.location);
                setDate(new Date(result.date));
            })
            .catch((error) => console.error('Error fetching item:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // form data
        const formData = {
            postType: postType || item.postType,
            title: title || item.title,
            description: description || item.description,
            category: category || item.category,
            location: location || item.location,
            date: date ? date.toISOString() : item.date,
            thumbnail: thumbnail || item.thumbnail,
            contact: {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL,
            },
            status: item.status || 'not claimed yet',
        };

        // Send the updated data to the server
        try {
            const { data } = await axiosSecure.patch(`/singleItem/${id}`, formData)
            if (data.modifiedCount) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Post updated successfully',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                });
                navigate('/myItems')
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error updating post',
                text: `${err.message}`,
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-700">Update {item.title}</h1>
            <form onSubmit={handleSubmit} className="max-w-full w-full flex flex-col gap-5 p-4">
                <div className="flex md:flex-row flex-col gap-7 justify-between items-center">
                    {/* Post Type */}
                    <div className="w-full">
                        <label className="block text-gray-600 font-medium mb-2">Post Type</label>
                        <select
                            value={postType}
                            onChange={(e) => setPostType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>
                    </div>

                    {/* Thumbnail */}
                    <div className="w-full">
                        <label className="block text-gray-600 font-medium mb-2">Thumbnail (Image)</label>
                        <input
                            type="text"
                            value={thumbnail}
                            onChange={(e) => setThumbnail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter a photo URL of the item"
                            required
                        />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-7 justify-between items-center">
                    {/* Title */}
                    <div className="w-full">
                        <label className="block text-gray-600 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter a title for the post"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="w-full">
                        <label className="block text-gray-600 font-medium mb-2">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="e.g., Pets, Documents, Gadgets"
                            required
                        />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-7 justify-between items-center">
                    {/* Location */}
                    <div className="w-full">
                        <label className="block text-gray-600 font-medium mb-2">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Location where the item was lost or found"
                            required
                        />
                    </div>

                    {/* Date */}
                    <div className="w-full">
                        <label className="block text-gray-600 font-medium mb-2">Date Lost or Found</label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-7 justify-between items-center">
                    {/* Description */}
                    <div className="w-full">
                        <label className="block text-gray-600 font-medium mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Provide a detailed description"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3 w-full">
                        <label className="block text-gray-600 font-medium mb-2">Contact Information</label>
                        <input
                            type="text"
                            value={user?.displayName}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                            disabled
                        />
                        <input
                            type="text"
                            value={user?.email}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                            disabled
                        />
                    </div>
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-3 px-4 py-2 text-white font-bold rounded-lg bg-gray-800 hover:bg-gray-700"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default UpdateItem;
