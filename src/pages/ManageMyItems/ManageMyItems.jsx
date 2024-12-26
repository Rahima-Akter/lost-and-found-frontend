import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { authContext } from '../../Context/Context';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const ManageMyItems = () => {
    const { user } = useContext(authContext)
    const [itemData, setItemData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.email) {
            const fetchData = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:5000/itemsByEmail/${user.email}`, {
                        withCredentials: true,
                    });
                    setItemData(data);
                } catch (error) {
                    console.error('Error fetching items by email:', error);
                }
            };
    
            fetchData();
        }
    }, [user, setItemData]);
    

    // delete an item
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => { // Use async inside .then
            if (result.isConfirmed) {
                try {
                    const { data } = await axios.delete(`http://localhost:5000/singleItem/${id}`);
                    if (data.deletedCount) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your selected post has been deleted.",
                            icon: "success",
                        });
    
                        // Show the remaining items on the UI
                        const remaining = itemData.filter((item) => item._id !== id);
                        setItemData(remaining);
                    }
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error deleting post',
                        text: `${err.message}`,
                    });
                }
            }
        });
    };
    


    return (
        <>
            {
                itemData.length === 0 ? <p className='text-center text-3xl drop-shadow-xl text-gray-900 font-bold mt-12'>No Data Available</p> : (<section className='container px-4 mx-auto my-12'>
                    <div className='flex items-center gap-x-3'>
                        <h2 className='text-lg font-medium text-gray-800 '>My Posted Items</h2>
                    </div>
                    <div className='flex flex-col mt-6'>
                        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                                <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                                    <table className='min-w-full divide-y divide-gray-200'>
                                        <thead className='bg-gray-50'>
                                            <tr>
                                                <th
                                                    scope='col'
                                                    className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                                >
                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Title</span>
                                                    </div>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                                >
                                                    <span>Date</span>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                                >
                                                    <button className='flex items-center gap-x-2'>
                                                        <span>Category</span>
                                                    </button>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                                >
                                                    Location
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                                >
                                                    Post Type
                                                </th>

                                                <th></th>
                                            </tr>
                                        </thead>
                                        {
                                            itemData.map(item => <tbody key={item._id} className='bg-white divide-y divide-gray-200 '>
                                                <tr>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.title}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {format(new Date(item.date), 'P')}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.category}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.location}
                                                    </td>
                                                    <td>
                                                        <p className={`text-sm text-black text-center whitespace-nowrap ${item.postType === 'Lost' ? "bg-red-600/40 rounded-full" : "bg-green-600/40 rounded-full"}`}>
                                                            {item.postType}
                                                        </p>
                                                    </td>
                                                    <td className='mt-3'>
                                                        <div className='flex gap-3 justify-center'>
                                                            <div onClick={() => navigate(`/details/${item._id}`)} className="bg-gray-800 rounded-md text-white p-2 cursor-pointer">
                                                                <FaEye />
                                                            </div>
                                                            <div onClick={() => navigate(`/update/${item._id}`)} className="bg-gray-800 rounded-md text-white p-2 cursor-pointer">
                                                                <FaPen />
                                                            </div>
                                                            <div onClick={() => handleDelete(`${item._id}`)} className="bg-gray-800 rounded-md text-white p-2 cursor-pointer">
                                                                <FaTrash />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>)
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>)
            }
        </>
    );
};

export default ManageMyItems;