import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/axiosSecure';

const AllRecovered = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchRecoveredItems = async () => {
            try {
                const { data } = await axiosSecure.get(`/recoveredItem/${user?.email}`);
                setItems(data);
            } catch (err) {
                console.error("Error fetching recovered items:", err);
            }
        };
        fetchRecoveredItems();
    }, [user, setItems]);

    return (
        <>
            {
                items.length === 0 ? <p className='text-center text-3xl drop-shadow-xl text-gray-900 dark:text-white font-bold mt-12'>No Data Available</p> : (
                <section className='container px-4 mx-auto my-5'>
                    <div className='flex flex-col mt-6'>
                        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                                <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
                                    <table className='min-w-full divide-y divide-gray-200'>
                                        <thead className='bg-gray-200 dark:bg-gray-900'>
                                            <tr>
                                                <th
                                                    scope='col'
                                                    className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white dark:font-bold'
                                                >
                                                    <div className='flex items-center gap-x-3'>
                                                        <span>Title</span>
                                                    </div>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white dark:font-bold'
                                                >
                                                    <span>Date</span>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white dark:font-bold'
                                                >
                                                    <button className='flex items-center gap-x-2'>
                                                        <span>Location</span>
                                                    </button>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white dark:font-bold'
                                                >
                                                    Name
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white dark:font-bold'
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-white dark:font-bold'
                                                >
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        {
                                            items.map(item => <tbody key={item._id} className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 dark:hover:bg-gray-900 hover:bg-gray-50'>
                                                <tr>
                                                    <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap'>
                                                        {item.title}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap'>
                                                        {format(new Date(item.date), 'P')}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap'>
                                                        {item.location}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap'>
                                                        {item.name}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap'>
                                                        {item.email}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-600 dark:text-gray-200 whitespace-nowrap'>
                                                        <span className={`px-2 rounded-full ${item.status === "recovered" ? "bg-green-600/30" : "bg-red-600/30"}`}>{item.status || "N/A"}</span>
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

export default AllRecovered;