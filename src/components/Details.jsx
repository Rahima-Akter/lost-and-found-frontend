import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/axiosSecure';
import { format } from 'date-fns';

const Details = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const data = useLoaderData();
    const { postType, title, description, category, location, date, thumbnail, contact, status, _id } = data || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const location = form.location.value;
        const email = form.email.value;
        const name = form.name.value;
        const date = startDate.toISOString();
        const photo = user?.photoURL;
        const postId = _id;
        const status = "recovered";

        const formData = { title, location, email, date, photo, name, status, postId };

        // send data to the database
        try {
            const { data } = await axiosSecure.post('/recoveredItem', formData);
            if (data.insertedId) {
                document.getElementById('detailsModal')?.close();
                Swal.fire({
                    title: "Submitted Successfully",
                    icon: "success",
                }).then(() => {
                    navigate('/recovered');
                });
            }
        } catch (err) {
            document.getElementById('detailsModal')?.close();
            Swal.fire({
                title: `${err?.response?.data}`,
                icon: "error",
            });
        }
    };

    return (
        <div className='flex lg:flex-row flex-col gap-6 lg:max-w-screen-lg w-10/12 mx-auto my-12'>
            <div className='flex-1 px-4 py-7 bg-white dark:bg-gray-800 rounded-md shadow-md lg:min-h-[350px] flex flex-col'>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-light text-gray-800 dark:text-white'>
                        <span className='font-bold'>Posted At:</span> {format(date, 'P')}
                    </span>
                    <span
                        className={`rounded-full px-4 py-1 text-xs uppercase text-black dark:text-gray-300 ${postType === "Lost"
                            ? "bg-red-500/20 dark:bg-red-500/40"
                            : "bg-green-500/20 dark:bg-red-500/40"
                            }`}>
                        {status}
                    </span>
                </div>

                <div>
                    <h1 className='mt-2 text-2xl font-semibold text-gray-800 dark:text-white'>
                        {title}
                    </h1>

                    <p className='mt-2 text-sm text-gray-600 dark:text-gray-200'>
                        {description}
                    </p>
                    <p className='mt-3 text-sm font-bold text-gray-600 dark:text-white'>
                        Uploader Details:
                    </p>
                    <div className='flex items-center gap-7'>
                        <div className='space-y-2'>
                            <p className='text-sm  text-gray-600 dark:text-white'>
                                Name: {contact.name}
                            </p>
                            <p className='text-sm  text-gray-600 dark:text-white'>
                                Email: {contact.email}
                            </p>
                        </div>
                        <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
                            <img
                                src={contact.photo || "N/A"}
                                alt='user-image'
                            />
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col md:gap-5 mt-2 mb-5'>
                        <p className='text-[15px] font-bold text-gray-600 dark:text-white'>
                            Location: <span className='text-sm text-gray-600 dark:text-gray-200 font-normal'>{location}</span>
                        </p>
                        <p className='text-[15px] font-bold text-gray-600 dark:text-white'>
                            Type: <span className='text-sm text-gray-600 fon dark:text-gray-200 fontt-normal'>{postType}</span>
                        </p>
                        <p className='text-[15px] font-bold text-gray-600 dark:text-white'>
                            Category: <span className='text-sm text-gray-600 dark:text-gray-200 font-normal'>{category}</span>
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => document.getElementById('detailsModal')?.showModal()}
                    className='btn btn-sm bg-gray-800 hover:bg-gray-700 text-white mt-auto w-28'>{postType === "Lost" ? "Found This" : "This is mine"}</button>


                {/* modal */}
                <dialog id="detailsModal" className="modal modal-middle backdrop-blur-md">
                    <div className="modal-box dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className='h-[50vh]'>
                            <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                                <div>
                                    <label className='text-gray-700 dark:text-white' htmlFor='location'>
                                        Recovered Location
                                    </label>
                                    <input
                                        id='location'
                                        type='text'
                                        name='location'
                                        required
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
                                    />
                                </div>

                                <div>
                                    <label className='text-gray-700 dark:text-white' htmlFor='email'>
                                        Email Address
                                    </label>
                                    <input
                                        id='email'
                                        type='email'
                                        name='email'
                                        defaultValue={user?.email}
                                        disabled
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
                                    />
                                </div>

                                <div>
                                    <label className='text-gray-700 dark:text-white' htmlFor='name'>
                                        Name
                                    </label>
                                    <input
                                        id='name'
                                        name='name'
                                        type='text'
                                        disabled
                                        defaultValue={user?.displayName}
                                        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
                                    />
                                </div>
                                <div className='flex flex-col gap-2 '>
                                    <label className='text-gray-700 dark:text-white'>Date</label>

                                    {/* Date Picker Input Field */}
                                    <DatePicker
                                        className='border p-2 rounded-md'
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end mt-6'>
                                <button
                                    type='submit'
                                    className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 dark:bg-none dark:borer dark:border-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>

            </div>
            {/* image div */}
            <div className='lg:w-[45%] w-full overflow-hidden'>
                <img src={thumbnail} alt="item-image" className='object-cover w-full h-full' />
            </div>
        </div>
    );
};

export default Details;
