import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoIcon } from '../Icons';

export const AdminSidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-slate-800 text-white p-4 flex flex-col">
            <div className="mb-8">
                <NavLink to="/">
                    <LogoIcon className="text-white" />
                </NavLink>
                 <p className="text-sm text-slate-400 mt-1">Admin Panel</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink 
                            to="/admin/products"
                            className={({isActive}) => `block py-2 px-3 rounded-md transition-colors ${isActive ? 'bg-slate-700' : 'hover:bg-slate-700/50'}`}
                        >
                            Товары
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
