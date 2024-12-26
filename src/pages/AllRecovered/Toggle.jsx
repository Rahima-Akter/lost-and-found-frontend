import React, { useContext } from 'react';
import { authContext } from '../../Context/Context';
import { Link, Outlet } from 'react-router-dom';
import { LuTableOfContents } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';

const Toggle = () => {
    const { user } = useContext(authContext)
    return (
        <div className='container px-4 mx-auto my-12'>
            <div className='flex items-center justify-between px-5'>
                <h2 className='text-2xl font-medium text-gray-800 '>All Recoverd Item By {user?.displayName}</h2>
                <div className='space-x-3 flex'>
                    <Link to="/recovered">
                        <div className="bg-gray-800 rounded-md text-white p-2 cursor-pointer">
                            
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