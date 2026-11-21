import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(i18n.language || localStorage.getItem('krishi_language') || 'en');

  const setLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem('krishi_language', newLang);
    setLangState(newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key, options) => {
    return i18n.t(key, options);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
