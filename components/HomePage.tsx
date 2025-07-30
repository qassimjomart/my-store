import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './Skeleton';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

const ProductCarousel: React.FC<{ title: string; products: any[] }> = ({ title, products }) => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const { scrollLeft, clientWidth } = scrollContainer.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollContainer.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
        <div className="flex space-x-2">
          <button onClick={() => scroll('left')} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition text-gray-800"><ChevronLeftIcon /></button>
          <button onClick={() => scroll('right')} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition text-gray-800"><ChevronRightIcon /></button>
        </div>
      </div>
      <div ref={scrollContainer} className="flex space-x-4 overflow-x-auto pb-4 -mb-4 scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-64 md:w-72">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const HomePage: React.FC = () => {
  const { t, products } = useAppContext();
  const loading = false; // Simulate loading state

  const newArrivals = products.filter(p => p.isNewArrival).sort((a,b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  const bestSellers = products.filter(p => p.isBestSeller);
  const onSale = products.filter(p => p.oldPrice);

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#E9F1FF] to-[#F4FAFF] rounded-lg">
        <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">{t('heroTitle')}</h1>
            <p className="text-lg text-gray-600 mt-4">{t('heroSubtitle')}</p>
            <NavLink to="/catalog">
              <button className="mt-8 bg-[#FF8A00] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#E07900] hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150">
                {t('shopNow')}
              </button>
            </NavLink>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="https://images.pexels.com/photos/3662843/pexels-photo-3662843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Happy family" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Product Carousels */}
      <section className="container mx-auto px-4 space-y-12 md:space-y-16">
        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
        ) : (
          <>
            {newArrivals.length > 0 && <ProductCarousel title={t('newArrivals')} products={newArrivals} />}
            {bestSellers.length > 0 && <ProductCarousel title={t('bestSellers')} products={bestSellers} />}
            {onSale.length > 0 && <ProductCarousel title={t('discounts')} products={onSale} />}
          </>
        )}
      </section>
    </div>
  );
};