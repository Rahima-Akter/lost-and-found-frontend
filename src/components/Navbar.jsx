import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { authContext } from '../Context/Context';

const Navbar = () => {
    const { user, logOut } = useContext(authContext)
    return (
        <div className="navbar bg-gray-800 text-white fixed top-0 left-0 right-0 px-10 z-10">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Reunify</a>
            </div>
            <div className="flex-none gap-6">
                <div className="space-x-4 hidden lg:flex">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "underline text-yellow-500" : "text-white"}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/allItem"
                        className={({ isActive }) => isActive ? "underline text-yellow-500" : "text-white"}
                    >
                        Lost&Found Items
                    </NavLink>
                </div>
                {/* profile dropdown */}
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring-1 ring-gray-100">
                                <img
                                    alt={user.displayName}
                                    src={user.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 py-2 px-3 shadow text-black border border-gray-800">
                            <p className='font-bold text-pink-600 text-center py-1 text-lg'>{user?.displayName}</p>
                            <div className="lg:hidden flex flex-col">
                                <li><Link to="/" className='border-b'>Home</Link></li>
                                <li><Link to="/allItem" className='border-b'>Lost&Found Items</Link></li>
                            </div>
                            <li className='border-b'><Link to="/addLostFound">Add Lost OR Found Item</Link></li>
                            <li><Link to="/recovered" className='border-b'>All Recovered Items</Link></li>
                            <li><Link to="/myItems" className='border-b'>Manage My Items</Link></li>
                            <button onClick={logOut} className='bg-gray-800 text-white font-bold py-2 rounded mt-2'>Logout</button>
                        </ul>
                    </div> : <Link to='/login' className='bg-white font-bold px-3 py-1 text-black hover:bg-gray-200 rounded'>login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;