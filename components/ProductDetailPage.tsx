
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product, Review } from '../types';
import { REVIEWS } from './constants';
import { useAppContext } from '../context/AppContext';
import { StarIcon, HeartIcon, ShoppingCartIcon } from './Icons';
import { SkeletonLine } from './Skeleton';

const colorMap: { [key: string]: string } = {
    'Голубой': '#87CEEB',
    'Синий': '#0000FF',
    'Черный': '#000000',
    'Хаки': '#6B8E23',
    'Розовый': '#FFC0CB',
    'Белый': '#FFFFFF',
    'Красный': '#FF0000',
};

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t, language, addToCart, toggleWishlist, isInWishlist, products, cart } = useAppContext();

    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState<'desc' | 'reviews' | 'shipping'>('desc');
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null); // Stays as RU name string


    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id || ''));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            setProduct(null);
        }
        setReviews(REVIEWS); // Mock reviews for now
    }, [id, products]);
    
    useEffect(() => {
        // Reset options when product changes
        setQuantity(1);
        setActiveImage(0);
        if (product) {
          setSelectedSize(product.sizes?.length === 1 ? product.sizes[0] : null);
          // Set selectedColor to the Russian name of the color
          setSelectedColor(product.colors?.length === 1 ? product.colors[0].ru : null);
        } else {
          setSelectedSize(null);
          setSelectedColor(null);
        }
    }, [id, product]);

    const isWishlisted = product ? isInWishlist(product.id) : false;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
        ));
    };

    if (!product) return <ProductDetailSkeleton />;
    if (!product) return <div className="container mx-auto text-center py-20">Продукт не найден.</div>;

    const discountPercent = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const isStockManaged = product.availability === 'in-stock' && product.stockCount !== undefined;
    
    // Composite key for finding item in local cart state
    const cartItemIdentifier = `${product.id}-${selectedSize || 'nosize'}-${selectedColor || 'nocolor'}`;
    const cartItem = cart.find(item => {
        const itemIdentifier = `${item.id}-${item.selectedSize || 'nosize'}-${item.selectedColor || 'nocolor'}`;
        return itemIdentifier === cartItemIdentifier;
    });
    
    const quantityInCart = cartItem ? cartItem.quantity : 0;
    const stock = isStockManaged ? product.stockCount! : Infinity;
    const availableToAdd = isStockManaged ? stock - quantityInCart : Infinity;

    const isOutOfStock = isStockManaged && stock <= 0;
    const hasReachedLimit = isStockManaged && quantityInCart >= stock;
    
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasColors = product.colors && product.colors.length > 0;
    const areOptionsSelected = (!hasSizes || selectedSize) && (!hasColors || selectedColor);

    const handleQuantityChange = (newQuantity: number) => {
        if (hasReachedLimit) {
            setQuantity(0);
            return;
        }
        if (newQuantity < 1) {
            setQuantity(1);
        } else if (newQuantity > availableToAdd) {
            setQuantity(availableToAdd);
        } else {
            setQuantity(newQuantity);
        }
    };
    
    const handleAddToCart = () => {
        if (areOptionsSelected) {
            addToCart(product, quantity, { size: selectedSize || undefined, color: selectedColor || undefined });
        }
    };
    
    const handleToggleWishlist = () => {
        toggleWishlist(product.id);
    }
    
    const displayedSelectedColorName = product.colors?.find(c => c.ru === selectedColor)?.[language] || selectedColor;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Image Gallery */}
                <div>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative overflow-hidden">
                        <img src={product.images[activeImage]} alt={product.name[language]} className="w-full h-auto aspect-square object-contain transition-transform duration-300 hover:scale-110" />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.images.map((img, index) => (
                            <button key={index} onClick={() => setActiveImage(index)} className={`rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-[#2077FF]' : 'border-transparent'}`}>
                                <img src={img} alt={`${product.name[language]} thumbnail ${index + 1}`} className="w-full aspect-square object-cover"/>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">{product.brand}</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{product.name[language]}</h1>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm text-gray-500 mt-1">{t('sku')}: {product.sku}</p>
                        {product.gender && (
                            <p className="text-sm text-gray-500 mt-1">
                                <span className="font-medium text-gray-600">{t('productGender')}:</span> {t(`gender_${product.gender}`)}
                            </p>
                        )}
                    </div>


                    <div className="flex items-center my-4">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="ml-2 text-gray-600">({product.reviewCount} {t('reviews')})</span>
                    </div>

                    <div className="my-4">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${isOutOfStock ? 'bg-yellow-100 text-yellow-800' : product.availability === 'in-stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {isOutOfStock ? "Нет в наличии" : t(product.availability)}
                        </span>
                        {product.availability === 'in-stock' && product.stockCount && product.stockCount > 0 && (
                             <span className="ml-2 text-sm text-gray-600"> - {t('left')} {product.stockCount}</span>
                        )}
                    </div>
                    
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 my-4">
                        {product.oldPrice ? (
                            <>
                                <p className="text-3xl font-bold text-[#FF8A00]">{new Intl.NumberFormat('ru-RU').format(product.price)} ₸</p>
                                <p className="text-xl text-gray-500 line-through">{new Intl.NumberFormat('ru-RU').format(product.oldPrice)} ₸</p>
                                {discountPercent > 0 && 
                                    <span className="text-base font-bold text-white bg-[#FF8A00] px-3 py-1 rounded-md">Экономия {discountPercent}%</span>
                                }
                            </>
                        ) : (
                            <p className="text-3xl font-bold text-[#2077FF]">{new Intl.NumberFormat('ru-RU').format(product.price)} ₸</p>
                        )}
                    </div>
                    
                    {/* Size Selection */}
                    {hasSizes && (
                        <div className="my-4">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Размер: <span className="font-normal">{selectedSize}</span></h3>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes!.map(size => (
                                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${selectedSize === size ? 'bg-[#2077FF] text-white border-[#2077FF]' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'}`}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Color Selection */}
                    {hasColors && (
                        <div className="my-4">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Цвет: <span className="font-normal">{displayedSelectedColorName}</span></h3>
                            <div className="flex flex-wrap gap-2 items-center">
                                {product.colors!.map(color => (
                                    <button
                                      key={color.ru}
                                      onClick={() => setSelectedColor(color.ru)}
                                      className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2077FF] ${selectedColor === color.ru ? 'border-[#2077FF] border-2 shadow-sm' : 'border-gray-300 hover:border-gray-400'}`}
                                      aria-label={`Выбрать цвет ${color[language]}`}
                                    >
                                      <span
                                        className="w-5 h-5 rounded-full border border-gray-300"
                                        style={{ backgroundColor: colorMap[color.ru] || '#ccc' }}
                                      ></span>
                                      <span className="text-gray-700">{color[language]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-4 my-6">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button onClick={() => handleQuantityChange(quantity - 1)} className="p-2 text-gray-600 hover:text-black disabled:opacity-50" disabled={quantity <= 1 || hasReachedLimit}>-</button>
                            <span className="px-4 font-semibold text-gray-800">{hasReachedLimit ? 0 : quantity}</span>
                            <button onClick={() => handleQuantityChange(quantity + 1)} className="p-2 text-gray-600 hover:text-black disabled:opacity-50" disabled={quantity >= availableToAdd || hasReachedLimit}>+</button>
                        </div>
                         <button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock || hasReachedLimit || availableToAdd <= 0 || !areOptionsSelected}
                            className="flex-1 flex items-center justify-center bg-[#FF8A00] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#E07900] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <ShoppingCartIcon className="w-5 h-5 mr-2" />
                            {isOutOfStock ? "Нет в наличии" : hasReachedLimit ? "Все в корзине" : !areOptionsSelected ? t('chooseOptions') : t('addToCart')}
                        </button>
                        <button onClick={handleToggleWishlist} className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:border-[#FF8A00] hover:text-[#FF8A00] transition-colors">
                            <HeartIcon className={isWishlisted ? 'fill-[#FF8A00] text-[#FF8A00]' : 'fill-none'} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="border-t border-gray-200 mt-auto pt-6">
                         <div className="flex border-b border-gray-200">
                            <button onClick={() => setActiveTab('desc')} className={`py-2 px-4 font-semibold ${activeTab === 'desc' ? 'border-b-2 border-[#2077FF] text-[#2077FF]' : 'text-gray-500'}`}>{t('description')}</button>
                            <button onClick={() => setActiveTab('reviews')} className={`py-2 px-4 font-semibold ${activeTab === 'reviews' ? 'border-b-2 border-[#2077FF] text-[#2077FF]' : 'text-gray-500'}`}>{t('reviews')}</button>
                            <button onClick={() => setActiveTab('shipping')} className={`py-2 px-4 font-semibold ${activeTab === 'shipping' ? 'border-b-2 border-[#2077FF] text-[#2077FF]' : 'text-gray-500'}`}>{t('shippingPayment')}</button>
                        </div>
                        <div className="py-4 text-gray-700 leading-relaxed">
                            {activeTab === 'desc' && <div>
                                <p>{product.description[language]}</p>
                                <ul className="mt-4 space-y-2">
                                    {product.specs && Object.entries(product.specs).map(([key, value]) => (
                                        <li key={key}><span className="font-semibold">{key}:</span> {value[language]}</li>
                                    ))}
                                </ul>
                            </div>}
                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    {reviews.map(review => (
                                        <div key={review.id} className="border-b border-gray-200 pb-4">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold">{review.author}</span>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                            <div className="flex my-1">{renderStars(review.rating)}</div>
                                            <p>{review.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'shipping' && <p>Информация о доставке и оплате будет здесь.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductDetailSkeleton: React.FC = () => (
     <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
                <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="grid grid-cols-4 gap-2">
                    <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
                    <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
                    <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
                    <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
                </div>
            </div>
            <div className="space-y-5">
                <SkeletonLine height="1rem" width="30%" />
                <SkeletonLine height="2.25rem" width="70%" className="mt-1" />
                <SkeletonLine height="1rem" width="40%" />
                <SkeletonLine height="1.5rem" width="50%" />
                <SkeletonLine height="2.5rem" width="60%" />
                <div className="flex items-center space-x-4 pt-5">
                    <SkeletonLine height="3rem" width="8rem" />
                    <SkeletonLine height="3rem" width="60%" />
                    <SkeletonLine height="3rem" width="3rem" />
                </div>
                <div className="pt-6">
                    <SkeletonLine height="2rem" width="100%" />
                    <SkeletonLine height="6rem" width="100%" className="mt-4" />
                </div>
            </div>
        </div>
    </div>
);
