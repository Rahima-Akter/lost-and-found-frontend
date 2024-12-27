import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/axiosSecure';

const AllRecoveredCard = () => {
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
        <div className='md:my-10 mt-3 mb-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    items.length === 0 ? <p className='col-span-3 text-center text-3xl drop-shadow-xl text-gray-900 font-bold mt-12'>No Data Available</p> : (
                        items.map(item => <div key={item._id}>
                            <div className='shadow-xl rounded p-4'>
                                <div className='flex justify-between items-center font-semibold text-lg'>
                                    <p>{item.title}</p>
                                    <p>{format(new Date(item.date), 'P')}</p>
                                </div>
                                <p><span className='font-semibold text-lg'>Location:</span> {item.location}</p>
                                <p>
                                    <span className='font-semibold text-lg'>Recoverd By:</span>
                                    <p><span className='font-semibold text-lg'>Name:</span>{item.name}</p>
                                    <p><span className='font-semibold text-lg'>Email:</span>{item.email}</p>
                                </p>
                            </div>

                        </div>)
                    )
                }
            </div>

        </div>
    );
};

export default AllRecoveredCard;