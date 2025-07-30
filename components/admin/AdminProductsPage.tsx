import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const AdminProductsPage: React.FC = () => {
    const { products, language, deleteProductFromState } = useAppContext();

    const handleDelete = async (productId: number) => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            try {
                const response = await fetch(`https://my-store-api-towt.onrender.com/api/products/${productId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Не удалось удалить товар');
                }
                
                // Update frontend state
                deleteProductFromState(productId);

            } catch (error) {
                console.error("Ошибка при удалении товара:", error);
                alert("Произошла ошибка при удалении товара.");
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Управление товарами</h1>
                <NavLink 
                    to="/admin/products/new"
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Добавить товар
                </NavLink>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Артикул</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 max-w-xs truncate">{product.name[language]}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Intl.NumberFormat('ru-RU').format(product.price)} ₸</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <NavLink to={`/admin/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900">
                                        Редактировать
                                    </NavLink>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};