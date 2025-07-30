import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';

export const AdminLayout: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};
