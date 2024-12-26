import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../Context/Context';
import { format } from 'date-fns';

const AllRecovered = () => {
    const { user } = useContext(authContext)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/recoveredItem/${user?.email}`)
            .then(res => res.json())
            .then(result => setItems(result))
    }, [user, setItems])

    return (
        <>
            {
                items.length === 0 ? <p className='text-center text-3xl drop-shadow-xl text-gray-900 font-bold mt-12'>No Data Available</p> : (<section className='container px-4 mx-auto my-5'>
                    <div className='flex flex-col mt-6'>
                        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                                <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                                    <table className='min-w-full divide-y divide-gray-200'>
                                        <thead className='bg-gray-200'>
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
                                                        <span>Location</span>
                                                    </button>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                                >
                                                    Name
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                                >
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        {
                                            items.map(item => <tbody key={item._id} className='bg-white divide-y divide-gray-200 '>
                                                <tr>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.title}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {format(new Date(item.date), 'P')}
                                                    </td>

                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.location}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.name}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                        {item.email}
                                                    </td>
                                                    <td className='px-4 py-4 text-sm text-gray-600  whitespace-nowrap'>
                                                        <span className={`px-2 rounded-full ${item.status === "recovered"? "bg-green-600/30" : "bg-red-600/30"}`}>{item.status || "N/A"}</span>
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