import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product, ProductGender, Language } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { NAVIGATION_DATA } from '../constants';

const initialProductState: Omit<Product, 'id' | 'rating' | 'reviewCount'> & { id?: number } = {
    name: { ru: '', kk: '' },
    sku: '',
    price: 0,
    oldPrice: undefined,
    images: [''],
    availability: 'in-stock',
    stockCount: 0,
    brand: '',
    category: '',
    gender: ProductGender.UNISEX,
    description: { ru: '', kk: '' },
    specs: {},
    isNewArrival: true,
    isBestSeller: false,
    dateAdded: new Date().toISOString(),
    colors: [],
    sizes: [],
};

const allCategories = [...new Set(NAVIGATION_DATA.flatMap(nav => nav.megaMenu.flatMap(col => col.links.map(link => new URLSearchParams(link.path.split('?')[1]).get('category')))))].filter(Boolean) as string[];

export const AdminProductFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const { products, addProductToState, updateProductInState } = useAppContext();
    
    const [product, setProduct] = useState<Partial<Product>>(initialProductState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const productToEdit = products.find(p => p.id === parseInt(id!));
            if (productToEdit) {
                setProduct({
                    ...productToEdit,
                    oldPrice: productToEdit.oldPrice || undefined, // Ensure oldPrice is number or undefined
                });
            } else {
                setError('Товар не найден');
            }
        } else {
            setProduct(initialProductState);
        }
    }, [id, products, isEditMode]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        const isCheckbox = type === 'checkbox';
        const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
        let finalValue: any = value;

        // Convert numeric inputs
        if (type === 'number') {
            finalValue = value === '' ? undefined : parseFloat(value);
        }

        if (name.includes('.')) {
            const [field, lang] = name.split('.');
            setProduct(prev => ({
                ...prev,
                [field]: { ...(prev[field as keyof Product] as object), [lang]: finalValue }
            }));
        } else if (name === 'sizes') {
             setProduct(prev => ({ ...prev, sizes: value.split(',').map(s => s.trim()) }));
        }
        else {
            setProduct(prev => ({
                ...prev,
                [name]: isCheckbox ? checked : finalValue
            }));
        }
    };
    
    const handleImageChange = (index: number, value: string) => {
        const images = [...(product.images || [])];
        images[index] = value;
        setProduct(prev => ({ ...prev, images }));
    };

    const addImageField = () => {
        setProduct(prev => ({ ...prev, images: [...(prev.images || []), ''] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const productDataForApi = {
            ...product,
            price: Number(product.price || 0),
            oldPrice: Number(product.oldPrice || 0) || undefined,
            stockCount: Number(product.stockCount || 0),
            rating: product.rating ?? 0,
            reviewCount: product.reviewCount ?? 0,
            sizes: product.sizes?.map(s => s.trim()).filter(Boolean) || [],
            images: product.images?.filter(Boolean) || [],
        };
        
        try {
            const url = isEditMode
                ? `https://my-store-api-towt.onrender.com/api/products/${id}`
                : 'https://my-store-api-towt.onrender.com/api/products';
            
            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productDataForApi),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка сервера');
            }

            const savedProduct = await response.json();
            
            if(isEditMode) {
                updateProductInState(savedProduct.id, savedProduct);
            } else {
                addProductToState(savedProduct);
            }
            
            navigate('/admin/products');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">
                {isEditMode ? `Редактирование товара: ${product.name?.ru || ''}` : 'Добавить новый товар'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Название (RU)</label>
                        <input type="text" name="name.ru" value={product.name?.ru || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Название (KK)</label>
                        <input type="text" name="name.kk" value={product.name?.kk || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                </div>

                {/* SKU & Brand */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Артикул (SKU)</label>
                        <input type="text" name="sku" value={product.sku || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Бренд</label>
                        <input type="text" name="brand" value={product.brand || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Цена (₸)</label>
                        <input type="number" name="price" value={product.price || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Старая цена (₸)</label>
                        <input type="number" name="oldPrice" value={product.oldPrice || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                </div>
                
                {/* Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Описание (RU)</label>
                        <textarea name="description.ru" value={product.description?.ru || ''} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Описание (KK)</label>
                        <textarea name="description.kk" value={product.description?.kk || ''} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                </div>
                
                 {/* Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Изображения (URL)</label>
                    {product.images?.map((img, index) => (
                         <input key={index} type="text" value={img} onChange={(e) => handleImageChange(index, e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm mb-2" placeholder="https://example.com/image.jpg" />
                    ))}
                    <button type="button" onClick={addImageField} className="text-sm text-blue-600 hover:underline">Добавить еще изображение</button>
                </div>

                {/* Category & Availability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Категория</label>
                        <select name="category" value={product.category || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                            <option value="">Выберите категорию</option>
                            {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Наличие</label>
                        <select name="availability" value={product.availability || 'in-stock'} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                            <option value="in-stock">В наличии</option>
                            <option value="on-order">Под заказ</option>
                        </select>
                    </div>
                </div>

                {/* Stock & Sizes */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Количество на складе</label>
                        <input type="number" name="stockCount" value={product.stockCount || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Размеры (через запятую)</label>
                        <input type="text" name="sizes" value={product.sizes?.join(', ') || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="S, M, L, XL" />
                    </div>
                </div>

                {/* Flags */}
                <div className="flex items-center space-x-8">
                     <label className="flex items-center">
                        <input type="checkbox" name="isNewArrival" checked={product.isNewArrival || false} onChange={handleChange} className="rounded border-gray-300 text-blue-600 shadow-sm" />
                        <span className="ml-2 text-gray-700">Новинка</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" name="isBestSeller" checked={product.isBestSeller || false} onChange={handleChange} className="rounded border-gray-300 text-blue-600 shadow-sm" />
                        <span className="ml-2 text-gray-700">Хит продаж</span>
                    </label>
                </div>
                

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-end pt-4 border-t">
                    <button type="button" onClick={() => navigate('/admin/products')} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors mr-4">
                        Отмена
                    </button>
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                        {loading ? 'Сохранение...' : (isEditMode ? 'Обновить товар' : 'Сохранить товар')}
                    </button>
                </div>
            </form>
        </div>
    );
};