
import React, { useState, useMemo, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LogoIcon, SearchIcon, HeartIcon, ShoppingCartIcon, UserIcon, MenuIcon, XIcon, ChevronDownIcon } from './Icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NAVIGATION_DATA } from './constants';

const MobileMenu: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const { language, t } = useAppContext();
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

    const handleToggleSubMenu = (categoryId: string) => {
        setOpenSubMenu(prev => (prev === categoryId ? null : categoryId));
    };
    
    useEffect(() => {
        if(isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col lg:hidden animate-fade-in">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <NavLink to="/" onClick={onClose}>
                    <LogoIcon />
                </NavLink>
                <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <nav className="flex-grow overflow-y-auto p-4">
                <ul className="space-y-1">
                    {NAVIGATION_DATA.map(category => (
                        <li key={category.id} className="border-b border-gray-100 last:border-b-0">
                            <div className="flex justify-between items-center py-2">
                                <NavLink to={category.path} onClick={onClose} className="text-lg font-semibold uppercase text-gray-800 hover:text-[#2077FF]">
                                    {category.name[language]}
                                </NavLink>
                                {category.megaMenu.length > 0 && (
                                    <button onClick={() => handleToggleSubMenu(category.id)} className="p-2 text-gray-500">
                                        <ChevronDownIcon className={`w-6 h-6 transform transition-transform ${openSubMenu === category.id ? 'rotate-180' : ''}`} />
                                    </button>
                                )}
                            </div>
                            {openSubMenu === category.id && (
                                <div className="pl-4 pb-3 space-y-3 animate-fade-in-down-sm">
                                    {category.megaMenu.map((column, index) => {
                                        const isSaleColumn = column.title.ru === 'Sale';
                                        return (
                                            <div key={index}>
                                                <NavLink 
                                                    to={column.path || '#'} 
                                                    onClick={column.path ? onClose : (e) => e.preventDefault()}
                                                    className={`font-bold ${!column.path && 'cursor-default'} ${isSaleColumn ? 'text-[#FF8A00] hover:text-[#E07900]' : 'text-gray-700 hover:text-[#FF8A00]'}`}
                                                >
                                                    {column.title[language]}
                                                </NavLink>
                                                <ul className="mt-2 space-y-1">
                                                    {column.links.map(link => (
                                                        <li key={link.path}>
                                                            <NavLink to={link.path} onClick={onClose} className="block py-1 text-gray-600 hover:text-[#FF8A00] transition-colors">
                                                                {link.name[language]}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </li>
                    ))}
                     <li className="pt-4 mt-4 border-t border-gray-200">
                        <NavLink
                            to="/wishlist"
                            onClick={onClose}
                            className="flex items-center py-2 text-lg font-semibold uppercase text-gray-800 hover:text-[#2077FF]"
                        >
                            <HeartIcon className="w-6 h-6 mr-3" />
                            <span>{t('wishlist')}</span>
                        </NavLink>
                    </li>
                     <li>
                        <NavLink
                            to="/profile"
                            onClick={onClose}
                            className="flex items-center py-2 text-lg font-semibold uppercase text-gray-800 hover:text-[#2077FF]"
                        >
                            <UserIcon className="w-6 h-6 mr-3" />
                            <span>{t('profile')}</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};


export const Header: React.FC = () => {
  const { t, cart, language } = useAppContext();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
  
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>(); // sub-category-id -> main-category-id
    NAVIGATION_DATA.forEach(mainCat => {
        mainCat.megaMenu.forEach(col => {
            if (col.path) {
                const colParams = new URLSearchParams(col.path.split('?')[1]);
                const colCatId = colParams.get('category');
                if (colCatId) map.set(colCatId, mainCat.id);
            }
            col.links.forEach(link => {
                const params = new URLSearchParams(link.path.split('?')[1]);
                const subCatId = params.get('category');
                if (subCatId) map.set(subCatId, mainCat.id);
            });
        });
    });
    return map;
  }, []);

  const activeMegaMenu = useMemo(() => {
    if (!hoveredCategory) return null;
    return NAVIGATION_DATA.find(cat => cat.id === hoveredCategory);
  }, [hoveredCategory]);
  
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const currentGender = searchParams.get('gender');
  const currentMainCategory = searchParams.get('main_category');
  const currentSubCategory = searchParams.get('category');
  const activeMainCatIdFromSubCat = categoryMap.get(currentSubCategory || '');

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40" onMouseLeave={() => setHoveredCategory(null)}>
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
                <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 mr-2 text-gray-600 hover:text-gray-900 lg:hidden">
                    <MenuIcon className="w-6 h-6" />
                </button>
                 <NavLink to="/" className="flex-shrink-0">
                    <LogoIcon />
                </NavLink>
            </div>

            <div className="flex-1 max-w-xl mx-4 hidden md:flex items-center">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-gray-100 border border-transparent focus:border-[#2077FF] focus:ring-1 focus:ring-[#2077FF] rounded-lg py-2 pl-10 pr-4 transition-colors text-gray-900"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="text-gray-400" />
                </div>
              </form>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <LanguageSwitcher />
              <div className="h-6 w-px bg-gray-200"></div>
              <NavLink to="/wishlist" className="hidden sm:block text-gray-600 hover:text-[#2077FF] transition-colors p-2 rounded-full hover:bg-blue-50">
                <HeartIcon />
              </NavLink>
              <NavLink to="/cart" className="relative text-gray-600 hover:text-[#2077FF] transition-colors p-2 rounded-full hover:bg-blue-50">
                <ShoppingCartIcon />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center bg-[#FF8A00] text-white text-xs rounded-full h-5 w-5">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
              <NavLink to="/profile" className="hidden sm:block text-gray-600 hover:text-[#2077FF] transition-colors p-2 rounded-full hover:bg-blue-50">
                <UserIcon />
              </NavLink>
            </div>
          </div>
          {/* Mobile search */}
          <div className="md:hidden pb-3 px-1">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-gray-100 border border-transparent focus:border-[#2077FF] focus:ring-1 focus:ring-[#2077FF] rounded-lg py-2 pl-10 pr-4 transition-colors text-gray-900"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
              </div>
            </form>
          </div>
        </div>
        
        {/* Mega Menu Navigation */}
        <div className="hidden lg:block border-t border-gray-200">
          <nav className="container mx-auto px-4 flex justify-center items-center h-12 relative">
            {NAVIGATION_DATA.map((category) => {
              const isCatActive = category.id === currentGender || category.id === currentMainCategory || category.id === activeMainCatIdFromSubCat;
              return (
                <div key={category.id} onMouseEnter={() => setHoveredCategory(category.id)} className="h-full flex items-center">
                  <NavLink 
                    to={category.path} 
                    className={`px-4 h-full flex items-center uppercase text-sm font-semibold tracking-wide transition-colors duration-200 border-b-2 ${hoveredCategory === category.id || (isCatActive && !hoveredCategory) ? 'text-[#2077FF] border-[#2077FF]' : 'text-gray-700 hover:text-[#2077FF] border-transparent' }`}
                  >
                    {category.name[language]}
                  </NavLink>
                </div>
              )
            })}
            {activeMegaMenu && activeMegaMenu.megaMenu.length > 0 && (
              <div 
                className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg animate-fade-in-down" 
                onMouseEnter={() => setHoveredCategory(activeMegaMenu.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="container mx-auto px-8 py-8">
                  <div className="flex items-start justify-center gap-x-10 text-left">
                    {activeMegaMenu.megaMenu.map((column, index) => {
                      const isSaleColumn = column.title.ru === 'Sale';
                      return (
                        <div key={index} className="flex-shrink-0 w-48">
                          <NavLink 
                            to={column.path || '#'} 
                            className={`text-sm font-bold uppercase tracking-wider pb-1 mb-3 inline-block transition-colors duration-200
                              ${isSaleColumn 
                                ? 'text-[#FF8A00] font-extrabold hover:text-[#E07900]' 
                                : `text-gray-800 ${column.path ? 'hover:text-[#FF8A00] border-b-2 border-transparent hover:border-[#FF8A00]' : 'cursor-default'}`
                              }`}
                          >
                            {column.title[language]}
                          </NavLink>
                          <div className="flex flex-col space-y-1">
                            {column.links.map((link) => (
                              <NavLink key={link.path} to={link.path} className="text-gray-600 hover:text-[#FF8A00] text-sm transition-colors py-1 px-2 rounded-md hover:bg-blue-50/50">
                                {link.name[language]}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
          @keyframes fade-in-down {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.3s ease-out forwards;
          }
          @keyframes fade-in-down-sm {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-down-sm {
            animation: fade-in-down-sm 0.2s ease-out forwards;
          }
       `}</style>
    </>
  );
};
