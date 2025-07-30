
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LogoIcon } from './Icons';
import { NAVIGATION_DATA } from './constants';

export const Footer: React.FC = () => {
  const { t, language } = useAppContext();

  const socialLinks = [
    { name: 'Instagram', url: '#' },
    { name: 'Facebook', url: '#' },
    { name: 'Telegram', url: '#' },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Logo & Slogan */}
          <div className="space-y-4">
            <LogoIcon />
            <p className="text-sm text-gray-600">
              {t('heroTitle')}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t('categories')}</h3>
            <ul className="space-y-2">
              {NAVIGATION_DATA.map(cat => (
                <li key={cat.id}>
                  <NavLink to={cat.path} className="text-gray-600 hover:text-[#FF8A00]">
                    {cat.name[language]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Col 3: Legal & Help */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Информация</h3>
            <ul className="space-y-2">
              <li><NavLink to="/stores" className="text-gray-600 hover:text-[#FF8A00]">{t('ourStores')}</NavLink></li>
              <li><NavLink to="/faq" className="text-gray-600 hover:text-[#FF8A00]">{t('faq')}</NavLink></li>
              <li><NavLink to="/privacy" className="text-gray-600 hover:text-[#FF8A00]">{t('privacyPolicy')}</NavLink></li>
            </ul>
          </div>

          {/* Col 4: Contacts & Social */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">{t('contacts')}</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="tel:+77771234567">+7 (777) 123-45-67</a></li>
              <li><a href="mailto:info@bigfamily.kz">info@bigfamily.kz</a></li>
            </ul>
            <h3 className="font-semibold text-gray-800 mt-6 mb-4">{t('socialMedia')}</h3>
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <a key={link.name} href={link.url} className="text-gray-500 hover:text-[#2077FF]">{link.name}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Big Family. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
