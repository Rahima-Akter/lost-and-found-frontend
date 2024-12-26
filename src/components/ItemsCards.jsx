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
        <div className="my-12">
            <p className="text-center font-bold text-3xl drop-shadow-xl mt-16">
                Latest Find & Lost Items
            </p>
            <Link to="/allItem" className="btn my-5 bg-gray-800 hover:bg-gray-700 text-white">
                View All...
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {slicedItems.map(item => (
                    <div
                        key={item._id}
                        className="flex flex-col max-w-md p-6 space-y-6 overflow-hidden rounded-lg shadow-lg dark:bg-gray-50 dark:text-gray-800 hover:scale-95 duration-700"
                    >
                        <div className="flex space-x-4">
                            <img
                                alt=""
                                src={item.contact.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMELiYWrb60oG6HxN_tdDOjqoEwhATOtC3uQ&s"}
                                className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                            />
                            <div className="flex flex-col space-y-1">
                                <a href="#" className="text-sm font-semibold">
                                    {item.contact.name}
                                </a>
                                <span className="text-xs dark:text-gray-600">
                                    {format(new Date(item.date), 'P')}
                                </span>
                            </div>
                        </div>
                        <div>
                            <img
                                src={item.thumbnail}
                                alt=""
                                className="object-cover w-full mb-4 h-48 dark:bg-gray-500"
                            />
                            <h2 className="mb-1 text-xl font-semibold">{item.title}</h2>
                            <p className="text-sm dark:text-gray-600">
                                {item.description.substring(0, 80)}...
                            </p>
                        </div>
                        <div>
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
