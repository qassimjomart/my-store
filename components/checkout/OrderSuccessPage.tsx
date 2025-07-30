import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const OrderSuccessPage: React.FC = () => {
    const { t } = useAppContext();
    const query = useQuery();
    const orderId = query.get('orderId');

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg mx-auto">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6">{t('orderSuccessTitle')}</h1>
                <p className="text-gray-600 mt-3">{t('orderSuccessMessage')}</p>
                {orderId && (
                    <div className="mt-6 bg-gray-100 rounded-lg p-3">
                        <p className="text-sm text-gray-500">{t('yourOrderNumber')}:</p>
                        <p className="text-lg font-mono font-semibold text-gray-800 tracking-wider">{orderId}</p>
                    </div>
                )}
                <NavLink 
                    to="/" 
                    className="mt-8 inline-block w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                    {t('backToHome')}
                </NavLink>
            </div>
        </div>
    );
};
