import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LogoIcon } from '../Icons';
import { CheckoutStepper } from './CheckoutStepper';

export const CheckoutLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <NavLink to="/" aria-label="Вернуться на главную">
                        <LogoIcon />
                    </NavLink>
                    <NavLink to="/cart" className="text-sm font-medium text-blue-600 hover:underline">
                        Вернуться в корзину
                    </NavLink>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-3xl mx-auto">
                    <CheckoutStepper />
                    <div className="mt-8">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};
