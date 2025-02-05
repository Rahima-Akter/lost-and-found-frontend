import React, { useContext } from 'react';
import { authContext } from '../../Context/Context';
import { Link, Outlet } from 'react-router-dom';
import { LuTableOfContents } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';

const Toggle = () => {
    const { user } = useContext(authContext)
    return (
        <div className='container px-4 mx-auto my-12'>
            <div className='flex md:flex-row flex-col md:items-center md:justify-between px-5'>
                <h2 className='md:text-2xl text-lg font-medium text-gray-800 dark:text-white'>All Recoverd Item By {user?.displayName}</h2>
                <div className='space-x-3 flex md:mt-0 mt-4 md:-mb-0'>
                    <Link to="/recovered">
                        <div className="bg-gray-800 rounded-md text-white p-2 cursor-pointer">
                            <LuTableOfContents />
                        </div>
                    </Link>
                    <Link to="/recovered/card">
                        <div className="bg-gray-800 rounded-md text-white p-2 cursor-pointer">
                            <IoMdCard />
                        </div>
                    </Link>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Toggle;