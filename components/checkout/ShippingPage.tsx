import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ShippingAddress } from '../../types';

const InputField: React.FC<{ label: string; name: keyof ShippingAddress; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; type?: string; placeholder?: string }> = 
({ label, name, value, onChange, required = true, type = 'text', placeholder }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
    </div>
);

export const ShippingPage: React.FC = () => {
    const { t, setShippingAddress: setContextAddress, shippingAddress } = useAppContext();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<ShippingAddress>(shippingAddress || {
        fullName: '',
        phone: '',
        city: '',
        addressLine: '',
        postalCode: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setContextAddress(formData);
        navigate('/checkout/payment');
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('shippingAddress')}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField label="Ф.И.О. получателя" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Иванов Иван Иванович" />
                <InputField label="Номер телефона" name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+7 (777) 123-45-67" />
                <InputField label="Город" name="city" value={formData.city} onChange={handleChange} placeholder="Астана" />
                <InputField label="Улица, дом, квартира" name="addressLine" value={formData.addressLine} onChange={handleChange} placeholder="ул. Достык, 5" />
                <InputField label="Почтовый индекс" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="010000" />
                <div className="pt-6 border-t">
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                        {t('continueToPayment')}
                    </button>
                </div>
            </form>
        </div>
    );
};
