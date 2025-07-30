import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const PaymentPage: React.FC = () => {
    const { t, cart, getCartTotal, shippingAddress, clearCart, language } = useAppContext();
    const navigate = useNavigate();
    const { subtotal, discount, total } = getCartTotal();

    if (!shippingAddress) {
        navigate('/checkout/shipping');
        return null;
    }

    const handlePayment = () => {
        // This is a simulation.
        // In a real app, you would call Stripe/YooKassa here.
        const mockOrderId = `BF-${Date.now()}`;
        clearCart();
        navigate(`/order-success?orderId=${mockOrderId}`);
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 border-b pb-4">{t('orderSummary')}</h2>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-3">
                                <img src={item.images[0]} alt={item.name[language]} className="w-12 h-12 rounded-md object-cover" />
                                <div>
                                    <p className="font-medium text-gray-800">{item.name[language]}</p>
                                    <p className="text-gray-500">{item.quantity} x {new Intl.NumberFormat('ru-RU').format(item.price)} ₸</p>
                                </div>
                            </div>
                            <p className="font-semibold text-gray-800">{new Intl.NumberFormat('ru-RU').format(item.price * item.quantity)} ₸</p>
                        </div>
                    ))}
                </div>
                <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600"><span>Подытог:</span><span>{new Intl.NumberFormat('ru-RU').format(subtotal)} ₸</span></div>
                    {discount > 0 && <div className="flex justify-between text-green-600"><span>Скидка:</span><span>-{new Intl.NumberFormat('ru-RU').format(discount)} ₸</span></div>}
                    <div className="flex justify-between font-bold text-base text-gray-900"><span>{t('total')}:</span><span>{new Intl.NumberFormat('ru-RU').format(total)} ₸</span></div>
                </div>
                <div className="border-t pt-4 text-sm">
                    <h3 className="font-semibold text-gray-800 mb-2">{t('shippingAddress')}</h3>
                    <p className="text-gray-600">{shippingAddress.fullName}</p>
                    <p className="text-gray-600">{shippingAddress.addressLine}, {shippingAddress.city}, {shippingAddress.postalCode}</p>
                    <p className="text-gray-600">{shippingAddress.phone}</p>
                </div>
            </div>

            {/* Payment Form Simulation */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                 <h2 className="text-xl font-bold text-gray-900 mb-6">Детали оплаты</h2>
                 <div className="space-y-4">
                    <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Номер карты</label>
                        <div className="mt-1 p-2.5 w-full border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-400">
                            •••• •••• •••• 1234
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">Срок действия</label>
                             <div className="mt-1 p-2.5 w-full border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-400">
                                MM / YY
                            </div>
                        </div>
                         <div>
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                             <div className="mt-1 p-2.5 w-full border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-400">
                                •••
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center pt-2">Это симуляция формы оплаты. Реальные данные вводить не нужно.</p>
                 </div>
                 <div className="pt-6 mt-6 border-t">
                    <button onClick={handlePayment} className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                        {t('payNow')} {new Intl.NumberFormat('ru-RU').format(total)} ₸
                    </button>
                 </div>
            </div>
        </div>
    );
};
