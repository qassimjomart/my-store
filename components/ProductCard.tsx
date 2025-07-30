
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';
import { HeartIcon } from './Icons';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t, toggleWishlist, isInWishlist } = useAppContext();

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <NavLink to={`/product/${product.id}`} className="block group h-full">
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 p-3 h-full flex flex-col">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={product.images[0]} 
              alt={product.name[language]} 
              className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
              loading="lazy" 
            />
            <button 
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-[#FF8A00] transition-colors"
              aria-label={t('wishlist')}
            >
              <HeartIcon className={isWishlisted ? 'fill-[#FF8A00] text-[#FF8A00]' : 'fill-none'} />
            </button>
          </div>
          <div className="pt-3 px-1 flex flex-col flex-grow">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{product.brand}</p>
            <h3 className="text-base font-semibold text-gray-800 h-12 mt-1">{product.name[language]}</h3>
            
            <div className="mt-auto pt-2">
              {product.oldPrice ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-bold text-[#FF8A00]">{new Intl.NumberFormat('ru-RU').format(product.price)} ₸</p>
                    <p className="text-sm text-gray-500 line-through">{new Intl.NumberFormat('ru-RU').format(product.oldPrice)} ₸</p>
                  </div>
                  {discountPercent > 0 && (
                    <span className="text-sm font-bold text-white bg-[#FF8A00] px-2 py-0.5 rounded-md">-{discountPercent}%</span>
                  )}
                </div>
              ) : (
                <p className="text-lg font-bold text-[#2077FF]">{new Intl.NumberFormat('ru-RU').format(product.price)} ₸</p>
              )}
            </div>
          </div>
        </div>
    </NavLink>
  );
};
