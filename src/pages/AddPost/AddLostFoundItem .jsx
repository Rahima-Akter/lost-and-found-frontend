import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../../Context/Context";
import axios from "axios";

const AddLostFoundItem = () => {
    const { user } = useContext(authContext)
    const [postType, setPostType] = useState("Lost");
    const [thumbnail, setThumbnail] = useState('');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data
        const formData = {
            postType,
            title,
            
            category,
            location,
            date: date.toISOString(),
            thumbnail,
            contact: {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL
            },
            status: postType.toLowerCase(),
        };

        try {
            const { data } = await axios.post('http://localhost:5000/addItem', formData)
            if (data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Post added successfully",
                    showConfirmButton: true,
                    showConfirmButtonText: 'ok',
                });
                navigate('/myItems')
            }
            // Reset form
            setPostType("Lost");
            setThumbnail("");
            setTitle("");
            setDescription("");
            setCategory("");
            setLocation("");
            setDate(new Date());
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error updating post',
                text: `${err?.message}`,
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-700">Add Lost or Found Item</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Post Type */}
                <div>
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
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Thumbnail (Image)</label>
                    <input
                        type="text"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter a photo url of the item"
                        required
                    />
                </div>

                {/* Title */}
                <div>
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
                <div>
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

                {/* Location */}
                <div>
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
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Date Lost or Found</label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Description */}
                <div>
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
                <div className="space-y-3">
                    <label className="block text-gray-600 font-medium mb-2">Contact Information</label>
                    <input
                        type="text"
                        value={user.displayName}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                        disabled
                    />
                    <input
                        type="text"
                        value={user.email}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                        disabled
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="col-span-2 mt-3 px-4 py-2 text-white font-bold rounded-lg bg-gray-800 hover:bg-gray-700"
                >
                    Add Post
                </button>
            </form>

        </div>
    );
};

export default AddLostFoundItem;
