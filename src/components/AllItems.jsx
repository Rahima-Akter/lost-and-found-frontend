import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllItems = () => {
    const data = useLoaderData()
    const [search, setSearch] = useState('')
    const [items, setItem] = useState(data)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`http://localhost:5000/query?search=${search}`);
                setItem(data);
            } catch (error) {
                
            }
        };
        fetchData();
    }, [search]);

    return (
        <div className='my-12 w-11/12 mx-auto'>
            <label className="input input-bordered flex justify-center items-center gap-2 w-3/6 mx-auto mb-8">
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
                    items.map(item => <div key={item._id} className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                        <div className="flex space-x-4">
                            <img alt="" src={item.contact.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMELiYWrb60oG6HxN_tdDOjqoEwhATOtC3uQ&s"} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                            <div className="flex flex-col space-y-1">
                                <a
                                    // rel="noopener noreferrer" 
                                    rel=""
                                    href="#" className="text-sm font-semibold">{item.contact.name}</a>
                                <span className="text-xs dark:text-gray-600">{item.date}</span>
                            </div>
                        </div>
                        <div>
                            <img src={item.thumbnail} alt="" className="object-cover w-full mb-4 h-48 dark:bg-gray-500" />
                            <h2 className="mb-1 text-xl font-semibold">{item.title}</h2>
                            <p className="text-sm dark:text-gray-600">{item.description}...</p>
                        </div>
                        <div>
                            <button onClick={() => navigate(`/details/${item._id}`)} className="btn">Details</button>
                        </div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default AllItems;