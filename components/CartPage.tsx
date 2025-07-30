import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MinusIcon, PlusIcon, XIcon, ShoppingCartIcon } from './Icons';

export const CartPage: React.FC = () => {
  const { t, language, cart, updateQuantity, removeFromCart, getCartTotal, applyPromoCode, products } = useAppContext();
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  
  const { subtotal, discount, total } = getCartTotal();
  
  const handleApplyPromo = () => {
      const success = applyPromoCode(promoCode);
      if (success) {
          setPromoMessage('Промокод применен!');
      } else {
          setPromoMessage('Неверный промокод.');
      }
      setTimeout(() => setPromoMessage(''), 3000);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto text-center py-20 px-4">
        <ShoppingCartIcon className="mx-auto h-24 w-24 text-gray-300" />
        <h1 className="text-3xl font-bold text-gray-800 mt-6">{t('emptyCart')}</h1>
        <p className="text-gray-500 mt-2">Добавьте товары, чтобы увидеть их здесь.</p>
        <NavLink to="/"
          className="mt-8 inline-block bg-[#2077FF] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#0058CC] transition-colors"
        >
          {t('continueShopping')}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('shoppingCart')}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <div className="hidden md:grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-4 mb-4">
              <div className="col-span-3">{t('product')}</div>
              <div className="text-center">{t('price')}</div>
              <div className="text-center">{t('quantity')}</div>
              <div className="text-right">{t('total')}</div>
            </div>
            <div className="space-y-6">
              {cart.map(item => {
                const isStockManaged = item.availability === 'in-stock' && item.stockCount !== undefined;
                const hasReachedStockLimit = isStockManaged && item.quantity >= item.stockCount!;
                
                const originalProduct = products.find(p => p.id === item.id);
                const colorInfo = originalProduct?.colors?.find(c => c.ru === item.selectedColor);
                const displayColor = colorInfo ? colorInfo[language] : item.selectedColor;

                return (
                    <div key={item.cart_item_id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b pb-4">
                      {/* Product */}
                      <div className="md:col-span-3 flex items-center space-x-4">
                        <img src={item.images[0]} alt={item.name[language]} className="w-20 h-20 rounded-md object-cover" />
                        <div>
                          <p className="font-semibold text-gray-800">{item.name[language]}</p>
                           {(item.selectedSize || item.selectedColor) && (
                                <p className="text-sm text-gray-500">
                                    {item.selectedSize && `Размер: ${item.selectedSize}`}
                                    {item.selectedSize && item.selectedColor && ', '}
                                    {item.selectedColor && `Цвет: ${displayColor}`}
                                </p>
                            )}
                          <p className="text-sm text-gray-500">{t('sku')}: {item.sku}</p>
                        </div>
                      </div>
                      {/* Price */}
                      <div className="text-center text-gray-800 md:font-semibold">
                        <span className="md:hidden font-semibold">{t('price')}: </span>
                        {new Intl.NumberFormat('ru-RU').format(item.price)} ₸ 
                      </div>
                      {/* Quantity */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><MinusIcon /></button>
                          <span className="w-10 text-center font-semibold text-gray-800">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={hasReachedStockLimit}>
                            <PlusIcon />
                          </button>
                        </div>
                         {hasReachedStockLimit && <p className="text-xs text-orange-600 mt-1">Максимум</p>}
                      </div>
                      {/* Total & Remove */}
                      <div className="flex justify-between items-center md:block md:text-right">
                         <div className="md:font-semibold text-gray-800">
                            <span className="md:hidden font-semibold">{t('total')}: </span>
                            {new Intl.NumberFormat('ru-RU').format(item.price * item.quantity)} ₸ 
                        </div>
                         <button onClick={() => removeFromCart(item.cart_item_id)} className="text-gray-500 hover:text-red-500 p-1">
                            <XIcon className="w-5 h-5"/>
                        </button>
                      </div>
                    </div>
                );
              })}
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:w-1/3">
             <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h2 className="text-xl font-bold border-b pb-4 mb-4">Сумма заказа</h2>
                <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                        <span>Подытог</span>
                        <span>{new Intl.NumberFormat('ru-RU').format(subtotal)} ₸</span>
                    </div>
                     {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Скидка</span>
                            <span>-{new Intl.NumberFormat('ru-RU').format(discount)} ₸</span>
                        </div>
                     )}
                     <div className="flex justify-between font-bold text-xl border-t pt-4 mt-2">
                        <span>{t('total')}</span>
                        <span>{new Intl.NumberFormat('ru-RU').format(total)} ₸</span>
                    </div>
                </div>
                <div className="mt-6">
                    <label className="font-semibold text-sm">{t('promoCode')}</label>
                    <div className="flex mt-1">
                        <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="w-full rounded-l-lg border-gray-300 focus:ring-[#FF8A00] focus:border-[#FF8A00]" />
                        <button onClick={handleApplyPromo} className="bg-[#FF8A00] text-white font-semibold px-4 rounded-r-lg hover:bg-[#E07900]">{t('apply')}</button>
                    </div>
                    {promoMessage && <p className={`text-sm mt-2 ${promoMessage.includes('Неверный') ? 'text-red-500' : 'text-green-600'}`}>{promoMessage}</p>}
                </div>
                <NavLink to="/checkout/shipping" className="block text-center w-full mt-6 bg-[#2077FF] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#0058CC] transition-colors">
                    {t('checkout')}
                </NavLink>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};