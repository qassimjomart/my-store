import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { HeartIcon } from './Icons';

export const WishlistPage: React.FC = () => {
  const { t, wishlist, products } = useAppContext();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="container mx-auto text-center py-20 px-4">
        <HeartIcon className="mx-auto h-24 w-24 text-gray-300" />
        <h1 className="text-3xl font-bold text-gray-800 mt-6">Список желаний пуст</h1>
        <p className="text-gray-500 mt-2">Добавляйте товары, которые вам понравились, чтобы не потерять их.</p>
        <NavLink to="/"
          className="mt-8 inline-block bg-[#2077FF] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#0058CC] transition-colors"
        >
          {t('continueShopping')}
        </NavLink>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('wishlist')}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {wishlistedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};