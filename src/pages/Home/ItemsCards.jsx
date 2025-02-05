import { format } from 'date-fns';
import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const ItemsCards = () => {
    const data = useLoaderData();
    const [items, setItem] = useState(data);
    const navigate = useNavigate();

    // Filter dates
    const filterDate = items.filter(item => new Date(item.date) >= new Date(item.date));

    // Slice 6 items
    const slicedItems = filterDate.slice(0, 6);

    return (
        <div className="my-12 dark:bg-black">
            <p className="text-center font-bold text-2xl md:text-3xl drop-shadow-xl mt-16 dark:text-white">
                Latest Find & Lost Items
            </p>
            <Link to="/allItem" className="btn btn-sm md:btn-md my-5 bg-gray-800 hover:bg-gray-700 text-white">
                View All...
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {slicedItems.map(item => (
                    <div
                    key={item._id}
                    className="flex flex-col max-w-sm px-6 py-3 overflow-hidden rounded-lg shadow-lg dark:text-gray-800 hover:scale-105 duration-700 min-h-full dark:bg-gray-800"
                >
                    <div className="flex space-x-4 mb-4">
                        <img alt=""
                            src={item.contact.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMELiYWrb60oG6HxN_tdDOjqoEwhATOtC3uQ&s"}
                            className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                        />
                        <div className="flex flex-col space-y-1">
                            <a href="#" className="text-sm font-semibold dark:text-white">
                                {item.contact.name}
                            </a>
                            <span className="text-xs dark:text-white">
                                {format(new Date(item.date), 'P')}
                            </span>
                        </div>
                    </div>
                    <div>
                        <img
                            src={item.thumbnail}
                            alt=""
                            className="object-cover w-full mb-4 h-48"
                        />
                        <h2 className="mb-1 text-xl font-semibold">{item.title}</h2>
                        <p className="text-sm dark:text-gray-200 dark:font-semibold">
                            {item.description.substring(0, 80)}...
                        </p>
                    </div>
                    <div className='flex-grow mt-auto'>
                        <button
                            onClick={() => navigate(`/details/${item._id}`)}
                            className="btn my-5 bg-gray-800 hover:bg-gray-700 text-white w-full"
                        >
                            Details
                        </button>
                    </div>
                </div>
                
                ))}
            </div>
        </div>
    );
};

export default ItemsCards;
