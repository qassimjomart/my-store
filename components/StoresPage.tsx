
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { STORES } from './constants';
import { MapPinIcon, ClockIcon } from './Icons';

export const StoresPage: React.FC = () => {
  const { t } = useAppContext();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">{t('ourStores')}</h1>
        
        {/* Placeholder for map */}
        <div className="bg-gray-300 w-full h-64 md:h-96 rounded-lg shadow-md mb-12 flex items-center justify-center">
            <p className="text-gray-500">Интерактивная карта будет здесь</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STORES.map(store => (
                <div key={store.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-150">
                    <div className="flex items-start space-x-4">
                        <div className="mt-1 text-[#2077FF]">
                            <MapPinIcon className="w-6 h-6"/>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{store.address}</h2>
                            <div className="flex items-center space-x-2 text-gray-600 mt-2">
                                <ClockIcon className="w-5 h-5"/>
                                <span>{store.hours}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-4">
                        <a 
                            href={store.maps['2gis']} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#2077FF] font-semibold hover:underline"
                        >
                            2GIS
                        </a>
                        <a 
                            href={store.maps.yandex} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#FF8A00] font-semibold hover:underline"
                        >
                            Yandex Карты
                        </a>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
