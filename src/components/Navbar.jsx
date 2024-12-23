import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isUser, setIsUser] = useState(false)
    const handleToggle = () => {
        setIsUser(!false)
    }
    return (
        <div className="navbar bg-base-100 px-10">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Reunify</a>
            </div>
            <div className="flex-none gap-6">
                <div className="space-x-4">
                    <Link>Home</Link>
                    <Link>Lost&Found Items</Link>
                </div>
                {/* profile dropdown */}
                {
                    isUser? <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>: <p>login</p>
                }
            </div>
        </div>
    );
};

export default Navbar;