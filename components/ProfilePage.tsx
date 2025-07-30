
import React, { useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { UserIcon, ShoppingCartIcon, HeartIcon, MapPinIcon, SettingsIcon } from './Icons';

const ProfileSidebar: React.FC = () => {
    return (
        <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                        <UserIcon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-gray-900">Гость</h2>
                        <p className="text-sm text-gray-500">Войдите в профиль</p>
                    </div>
                </div>
                <nav className="space-y-2">
                     <NavLink to="/profile/orders" className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600'}`}>
                        <ShoppingCartIcon className="w-6 h-6" />
                        <span>Мои заказы</span>
                    </NavLink>
                    <NavLink to="/profile/addresses" className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600'}`}>
                        <MapPinIcon className="w-6 h-6" />
                        <span>Адреса доставки</span>
                    </NavLink>
                    <NavLink to="/wishlist" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                        <HeartIcon className="w-6 h-6" />
                        <span>Список желаний</span>
                    </NavLink>
                     <NavLink to="/profile/settings" className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600'}`}>
                        <SettingsIcon className="w-6 h-6" />
                        <span>Настройки профиля</span>
                    </NavLink>
                </nav>
            </div>
        </aside>
    );
};

const OrdersPlaceholder = () => {
    const { t } = useAppContext();
    return (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-300" />
            <h3 className="text-xl font-semibold mt-4">У вас пока нет заказов</h3>
            <p className="text-gray-500 mt-2">Здесь будет отображаться история ваших покупок. Войдите в профиль, чтобы увидеть свои заказы.</p>
            <NavLink to="/" className="mt-6 inline-block bg-[#FF8A00] text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-[#E07900] transition-colors">
                {t('continueShopping')}
            </NavLink>
        </div>
    )
};

const AddressesPlaceholder = () => (
    <div className="text-center p-10 bg-white rounded-lg shadow-md">
        <MapPinIcon className="w-16 h-16 mx-auto text-gray-300" />
        <h3 className="text-xl font-semibold mt-4">У вас нет сохраненных адресов</h3>
        <p className="text-gray-500 mt-2">Добавьте адрес, чтобы ускорить оформление заказа. Для этого нужно войти в профиль.</p>
        <button disabled className="mt-6 inline-block bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg cursor-not-allowed">
            Добавить адрес
        </button>
    </div>
);

const SettingsPlaceholder = () => (
    <div className="p-6 md:p-8 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Настройки профиля</h3>
        <p className="text-gray-500 mt-2 border-b pb-6">Здесь вы сможете изменить свои личные данные и пароль после входа в систему.</p>
        <div className="mt-6">
            <p className="text-gray-600">Функция входа в систему находится в разработке.</p>
        </div>
    </div>
);


export const ProfilePage: React.FC = () => {
    const { section } = useParams<{ section?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!section) {
            navigate('/profile/orders', { replace: true });
        }
    }, [section, navigate]);

    const renderContent = () => {
        if (!section) {
            return <div className="p-8 text-center">Загрузка...</div>;
        }

        switch(section) {
            case 'addresses':
                return <AddressesPlaceholder />;
            case 'settings':
                return <SettingsPlaceholder />;
            case 'orders':
            default:
                return <OrdersPlaceholder />;
        }
    }
    
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                 <div className="p-4 mb-6 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg text-center">
                    Функционал личного кабинета находится в разработке. Для сохранения корзины и избранного вернитесь на сайт позже.
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <ProfileSidebar />
                    <main className="w-full md:w-3/4 lg:w-4/5">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};
