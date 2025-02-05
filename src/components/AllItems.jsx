import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { format } from 'date-fns';

const AllItems = () => {
    const data = useLoaderData()
    const [search, setSearch] = useState('')
    const [items, setItem] = useState(data)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`https://lost-and-found-server-two.vercel.app/query?search=${search}`);
                setItem(data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    }, [search]);

    return (
        <div className='my-12 w-11/12 mx-auto'>
            <label className="input input-bordered flex justify-center items-center gap-2 md:w-3/6 w-full mx-auto mb-8">
                <input
                    className="grow"
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title" />
                <span className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-white ">Search</span>
            </label>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    items.map(item => <div key={item._id} className="flex flex-col h-full max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-800">
                        <div className="flex items-center space-x-1 -my-2">
                            {
                                item.contact?.photo? <img alt="User profile photo" src={item.contact?.photo} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" /> : <img src={logo} alt="Default logo" className='w-8 rounded'/>
                            }
                            <div className="flex flex-col space-y-1">
                                <p className="text-xs font-semibold dark:text-gray-200">{item.contact?.name}</p>
                                <span className="text-[10px] dark:text-gray-200">
                                    {/* {item.date} */}
                                    {format(new Date(item.date), 'P')}
                                    </span>
                            </div>
                        </div>
                        <div>
                            <img src={item.thumbnail} alt="" className="object-cover w-full mb-4 h-48 dark:bg-gray-500" />
                            <h2 className="mb-1 text-xl font-semibold dark:text-white dark:font-bold">{item.title}</h2>
                            <p className="text-sm dark:text-gray-200">{item.description.substring(0, 120)}...</p>
                        </div>
                        <div>
                            <button onClick={() => navigate(`/details/${item._id}`)} className="btn btn-sm bg-gray-800 hover:bg-gray-700 text-white flex-grow -mt-8">Details</button>
                        </div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default AllItems;