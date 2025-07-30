
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product, ProductColor } from '../types';
import { NAVIGATION_DATA } from './constants';
import { useAppContext } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './Skeleton';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const colorMap: { [key: string]: string } = {
    'Голубой': '#87CEEB',
    'Синий': '#0000FF',
    'Черный': '#000000',
    'Хаки': '#6B8E23',
    'Розовый': '#FFC0CB',
    'Белый': '#FFFFFF',
    'Красный': '#FF0000',
};

export const CatalogPage: React.FC = () => {
    const { t, products, language } = useAppContext();
    const query = useQuery();
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);

    // Filters from URL are the single source of truth now
    const searchQuery = query.get('q');
    const gender = query.get('gender');
    const tag = query.get('tag');
    const mainCategoryFromQuery = query.get('main_category');
    const selectedCatalogCategory = query.get('category') || 'all';

    const maxPrice = useMemo(() => {
        if (!products || products.length === 0) return 300000;
        const max = Math.max(...products.map(p => p.price));
        return Math.ceil(max / 10000) * 10000; // Round up to nearest 10k for a clean slider
    }, [products]);
    
    // State for filters NOT in URL
    const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [specialFilters, setSpecialFilters] = useState({
        onSale: false,
        isBestSeller: false,
        isNewArrival: false,
    });

    // This effect ensures that the slider's max value updates if products load asynchronously
    useEffect(() => {
        setPriceRange(prev => [prev[0], maxPrice]);
    }, [maxPrice]);
    
    const allNavCategories = useMemo(() => {
        const categories: {id: string, name: string}[] = [];
        
        NAVIGATION_DATA.forEach(navCat => {
            navCat.megaMenu.forEach(col => {
                // Add categories from columns that are links themselves and have no sub-links
                if (col.path && col.links.length === 0) {
                    const catId = new URLSearchParams(col.path.split('?')[1]).get('category');
                    if (catId) {
                        categories.push({ id: catId, name: `${navCat.name[language]} > ${col.title[language]}` });
                    }
                }
                // Add categories from links within columns
                col.links.forEach(link => {
                    const catId = new URLSearchParams(link.path.split('?')[1]).get('category');
                    if (catId) {
                         categories.push({ id: catId, name: `${navCat.name[language]} > ${col.title[language]} > ${link.name[language]}` });
                    }
                });
            });
        });

        // Unique categories by id, sorted alphabetically
        return [...new Map(categories.map(item => [item.id, item])).values()]
            .sort((a, b) => a.name.localeCompare(b.name, language === 'ru' ? 'ru' : 'kk'));
    }, [language]);

    const availableBrands = useMemo(() => [...new Set(products.map(p => p.brand))].sort(), [products]);
    const availableSizes = useMemo(() => [...new Set(products.flatMap(p => p.sizes || []))].sort((a,b) => a.localeCompare(b, undefined, {numeric: true})), [products]);
    
    const availableColors = useMemo(() => {
        const allColors: ProductColor[] = products.flatMap(p => p.colors || []);
        const uniqueColors = [...new Map(allColors.map(item => [item.ru, item])).values()];
        return uniqueColors.sort((a, b) => a.ru.localeCompare(b.ru));
    }, [products]);


    const categoryAffiliationMap = useMemo(() => {
        const map: { [key: string]: { gender?: string; main_category?: string } } = {};
        NAVIGATION_DATA.forEach(navCat => {
            const navParams = new URLSearchParams(navCat.path.split('?')[1]);
            const gender = navParams.get('gender') || undefined;
            const main_category = navParams.get('main_category') || undefined;
            const affiliation = { gender, main_category };

            navCat.megaMenu.forEach(col => {
                if (col.path) {
                    const colParams = new URLSearchParams(col.path.split('?')[1]);
                    const colCatId = colParams.get('category');
                    if (colCatId) map[colCatId] = affiliation;
                }
                col.links.forEach(link => {
                    const linkParams = new URLSearchParams(link.path.split('?')[1]);
                    const linkCatId = linkParams.get('category');
                    if (linkCatId) map[linkCatId] = affiliation;
                });
            });
        });
        return map;
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const productAffiliation = categoryAffiliationMap[product.category];

            // URL-based filters first
            if (tag === 'sale' && !product.oldPrice) return false;
            
            if (gender && (!productAffiliation || productAffiliation.gender !== gender)) {
                 return false;
            }
            
            if (mainCategoryFromQuery && (!productAffiliation || productAffiliation.main_category !== mainCategoryFromQuery)) {
                return false;
            }

            // Search query filter
            if (searchQuery) {
                const queryLower = searchQuery.toLowerCase();
                const textMatch = product.name.ru.toLowerCase().includes(queryLower) ||
                                  product.name.kk.toLowerCase().includes(queryLower) ||
                                  product.sku.toLowerCase().includes(queryLower) ||
                                  product.brand.toLowerCase().includes(queryLower) ||
                                  product.description.ru.toLowerCase().includes(queryLower) ||
                                  product.description.kk.toLowerCase().includes(queryLower);
                
                let categoryMatch = false;
                for (const navCat of NAVIGATION_DATA) {
                    for (const col of navCat.megaMenu) {
                        if (col.title.ru.toLowerCase().includes(queryLower) || col.title.kk.toLowerCase().includes(queryLower)) {
                            if (col.links.some(link => new URLSearchParams(link.path.split('?')[1]).get('category') === product.category)) {
                                categoryMatch = true;
                                break;
                            }
                        }
                        if (col.links.some(link => 
                            (link.name.ru.toLowerCase().includes(queryLower) || link.name.kk.toLowerCase().includes(queryLower)) &&
                            new URLSearchParams(link.path.split('?')[1]).get('category') === product.category
                        )) {
                            categoryMatch = true;
                            break;
                        }
                    }
                    if (categoryMatch) break;
                }
                if (!textMatch && !categoryMatch) return false;
            }
            
            // Sidebar filters
            if (selectedCatalogCategory !== 'all' && product.category !== selectedCatalogCategory) return false;
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
            if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
            
            if (selectedSizes.length > 0 && (!product.sizes || !selectedSizes.some(s => product.sizes!.includes(s)))) {
                return false;
            }
            if (selectedColors.length > 0 && (!product.colors || !selectedColors.some(c_ru => product.colors!.some(p_color => p_color.ru === c_ru)))) {
                return false;
            }


            if (specialFilters.onSale && !product.oldPrice) return false;
            if (specialFilters.isBestSeller && !product.isBestSeller) return false;
            if (specialFilters.isNewArrival && !product.isNewArrival) return false;

            if (selectedAvailability !== 'all' && product.availability !== selectedAvailability) return false;
            if (selectedRating > 0 && product.rating < selectedRating) return false;
            
            return true;
        });
    }, [products, priceRange, selectedBrands, selectedSizes, selectedColors, selectedAvailability, selectedRating, specialFilters, selectedCatalogCategory, searchQuery, gender, tag, mainCategoryFromQuery, categoryAffiliationMap, language]);

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev => 
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleSizeChange = (size: string) => {
        setSelectedSizes(prev => 
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const handleColorChange = (colorRu: string) => {
        setSelectedColors(prev => 
            prev.includes(colorRu) ? prev.filter(c => c !== colorRu) : [...prev, colorRu]
        );
    };
    
    const handleCatalogCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(location.search);

        // When a specific category is chosen, it should be the primary filter.
        // Remove broader, potentially conflicting filters from the URL.
        params.delete('gender');
        params.delete('main_category');
        params.delete('tag');

        if (categoryId === 'all') {
            params.delete('category');
        } else {
            params.set('category', categoryId);
        }
        navigate({ search: params.toString() });
    };

    const clearFilters = () => {
        setPriceRange([0, maxPrice]);
        setSelectedBrands([]);
        setSelectedSizes([]);
        setSelectedColors([]);
        setSpecialFilters({ onSale: false, isBestSeller: false, isNewArrival: false });
        setSelectedAvailability('all');
        setSelectedRating(0);
        // Reset URL-based filters by navigating to the base catalog page
        navigate('/catalog');
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            {searchQuery && (
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Результаты поиска: "{searchQuery}"</h1>
                    <p className="text-gray-600 mt-1">{filteredProducts.length} товаров найдено</p>
                </div>
            )}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="w-full lg:w-1/4">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">{t('filters')}</h2>
                            <button onClick={clearFilters} className="text-sm text-[#2077FF] hover:underline">{t('clearFilters')}</button>
                        </div>
                        
                        {/* Category Filter */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-800">{t('categories')}</h3>
                            <select 
                                value={selectedCatalogCategory} 
                                onChange={e => handleCatalogCategoryChange(e.target.value)}
                                className="w-full bg-gray-100 border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                            >
                                <option value="all" className="text-gray-900">Все категории</option>
                                {allNavCategories.map(cat => (
                                    <option key={cat.id} value={cat.id} className="text-gray-900">{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Filter */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-800">{t('price')}</h3>
                            <input type="range" min="0" max={maxPrice} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2077FF]" />
                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>0 ₸</span>
                                <span>{new Intl.NumberFormat('ru-RU').format(priceRange[1])} ₸</span>
                            </div>
                        </div>

                        {/* Brand Filter */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-800">{t('brand')}</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                {availableBrands.map(brand => (
                                    <label key={brand} className="flex items-center">
                                        <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="h-4 w-4 rounded border-gray-300 text-[#2077FF] focus:ring-[#2077FF]"/>
                                        <span className="ml-2 text-gray-700">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        {/* Size Filter */}
                        {availableSizes.length > 0 && <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-800">Размер</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                {availableSizes.map(size => (
                                    <label key={size} className="flex items-center">
                                        <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} className="h-4 w-4 rounded border-gray-300 text-[#2077FF] focus:ring-[#2077FF]"/>
                                        <span className="ml-2 text-gray-700">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>}
                        
                        {/* Color Filter */}
                        {availableColors.length > 0 && <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-800">Цвет</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                {availableColors.map(color => (
                                    <label key={color.ru} className="flex items-center cursor-pointer">
                                        <input type="checkbox" checked={selectedColors.includes(color.ru)} onChange={() => handleColorChange(color.ru)} className="h-4 w-4 rounded border-gray-300 text-[#2077FF] focus:ring-[#2077FF]"/>
                                        <span className="w-4 h-4 rounded-full border border-gray-300 ml-2" style={{ backgroundColor: colorMap[color.ru] || '#ccc' }}></span>
                                        <span className="ml-2 text-gray-700">{color[language]}</span>
                                    </label>
                                ))}
                            </div>
                        </div>}

                        {/* Special Filters */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-800">{t('specialOffers')}</h3>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={specialFilters.onSale} onChange={() => setSpecialFilters(prev => ({ ...prev, onSale: !prev.onSale }))} className="h-4 w-4 rounded border-gray-300 text-[#2077FF] focus:ring-[#2077FF]"/>
                                    <span className="ml-2 text-gray-700">{t('discounts')}</span>
                                </label>
                                 <label className="flex items-center">
                                    <input type="checkbox" checked={specialFilters.isBestSeller} onChange={() => setSpecialFilters(prev => ({ ...prev, isBestSeller: !prev.isBestSeller }))} className="h-4 w-4 rounded border-gray-300 text-[#2077FF] focus:ring-[#2077FF]"/>
                                    <span className="ml-2 text-gray-700">{t('bestSellers')}</span>
                                </label>
                                 <label className="flex items-center">
                                    <input type="checkbox" checked={specialFilters.isNewArrival} onChange={() => setSpecialFilters(prev => ({ ...prev, isNewArrival: !prev.isNewArrival }))} className="h-4 w-4 rounded border-gray-300 text-[#2077FF] focus:ring-[#2077FF]"/>
                                    <span className="ml-2 text-gray-700">{t('newArrivals')}</span>
                                </label>
                            </div>
                        </div>

                        {/* Availability Filter */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-800">{t('availability')}</h3>
                            <div className="space-y-2">
                                <label className="flex items-center"><input type="radio" name="availability" value="all" checked={selectedAvailability === 'all'} onChange={e => setSelectedAvailability(e.target.value)} className="text-[#2077FF] focus:ring-blue-500"/><span className="ml-2 text-gray-700">{t('all')}</span></label>
                                <label className="flex items-center"><input type="radio" name="availability" value="in-stock" checked={selectedAvailability === 'in-stock'} onChange={e => setSelectedAvailability(e.target.value)} className="text-[#2077FF] focus:ring-blue-500"/><span className="ml-2 text-gray-700">{t('inStock')}</span></label>
                                <label className="flex items-center"><input type="radio" name="availability" value="on-order" checked={selectedAvailability === 'on-order'} onChange={e => setSelectedAvailability(e.target.value)} className="text-[#2077FF] focus:ring-blue-500"/><span className="ml-2 text-gray-700">{t('onOrder')}</span></label>
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <h3 className="font-semibold mb-2 text-gray-800">{t('rating')}</h3>
                             <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} onClick={() => setSelectedRating(star)} className={`text-2xl transition-colors ${star <= selectedRating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}>★</button>
                                ))}
                             </div>
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <main className="w-full lg:w-3/4">
                    {loading ? (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                    { !loading && filteredProducts.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-600">Товары не найдены.</p>
                            <p className="text-gray-500 mt-2">Попробуйте изменить фильтры или сбросить их.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
