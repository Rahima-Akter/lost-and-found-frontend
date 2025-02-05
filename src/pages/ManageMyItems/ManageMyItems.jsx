import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { authContext } from '../../Context/Context';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/axiosSecure';

const ManageMyItems = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(authContext)
    const [itemData, setItemData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.email) {
            const fetchData = async () => {
                try {
                    const { data } = await axiosSecure.get(`/itemsByEmail/${user.email}`);
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
                    const { data } = await axiosSecure.delete(`/singleItem/${id}`);
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
                        <h2 className='text-lg font-medium text-gray-800 dark:text-white'>My Posted Items</h2>
                    </div>
                    <div className='flex flex-col mt-6'>
                        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                                <div className='overflow-auto border border-gray-200 md:rounded-lg'>
                                    <table className='lg:w-full w-[110%] divide-y divide-gray-200'>
                                        <thead className='bg-gray-50 dark:bg-gray-900 dark:text-white'>
                                            <tr>
                                                <th
                                                    scope='col'
                                                    className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white'
                                                >
                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Title</span>
                                                    </div>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white'
                                                >
                                                    <span>Date</span>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white'
                                                >
                                                    <button className='flex items-center gap-x-2'>
                                                        <span>Category</span>
                                                    </button>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white'
                                                >
                                                    Location
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white'
                                                >
                                                    Post Type
                                                </th>

                                                <th className=''></th>
                                            </tr>
                                        </thead>
                                        {
                                            itemData.map(item => <tbody key={item._id} className='bg-white dark:bg-gray-800 divide-y divide-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900'>
                                                <tr>
                                                    <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap'>
                                                        {item.title}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap'>
                                                        {format(new Date(item.date), 'P')}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap'>
                                                        {item.category}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap'>
                                                        {item.location}
                                                    </td>
                                                    <td>
                                                        <p className={`text-sm text-black dark:text-gray-200 text-center whitespace-nowrap ${item.postType === 'Lost' ? "bg-red-600/40 rounded-full" : "bg-green-600/40 rounded-full"}`}>
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