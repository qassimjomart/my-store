
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Language } from '../types';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useAppContext();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex flex-col items-center space-y-1 text-sm">
      <button
        onClick={() => handleLanguageChange(Language.KK)}
        className={`font-semibold transition-colors duration-150 ${language === Language.KK ? 'text-[#2077FF]' : 'text-gray-500 hover:text-[#2077FF]'}`}
      >
        ҚАЗ
      </button>
      <button
        onClick={() => handleLanguageChange(Language.RU)}
        className={`font-semibold transition-colors duration-150 ${language === Language.RU ? 'text-[#2077FF]' : 'text-gray-500 hover:text-[#2077FF]'}`}
      >
        РУС
      </button>
    </div>
  );
};
