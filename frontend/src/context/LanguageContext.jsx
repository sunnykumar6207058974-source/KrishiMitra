import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    brand: "KrishiMitra",
    tagline: "Smart Farming. Better Decisions. Stronger Harvests.",
    navHome: "Home",
    navAbout: "About Us",
    navFeatures: "Features",
    navHowItWorks: "How It Works",
    navContact: "Contact",
    navDashboard: "Farmer Dashboard",
    navCropRec: "Crop Advisory",
    navWeather: "Weather",
    navCalendar: "Crop Calendar",
    navAIChat: "Krishi AI",
    navSoil: "Soil Health",
    navMandi: "Mandi Prices",
    btnLogin: "Login",
    btnRegister: "Register",
    btnLogout: "Logout",
    heroTitle: "Intelligent Agriculture for Indian Farmers",
    heroSubtitle: "Empower your field with machine learning crop recommendations, hyperlocal weather advisories, soil health diagnostics, and verified market trends.",
    btnGetStarted: "Get Started Free",
    btnTryDemo: "Test Demo Account"
  },
  hi: {
    brand: "कृषि मित्र",
    tagline: "स्मार्ट खेती। बेहतर निर्णय। मजबूत पैदावार।",
    navHome: "मुख्य पृष्ठ",
    navAbout: "हमारे बारे में",
    navFeatures: "सुविधाएं",
    navHowItWorks: "यह कैसे काम करता है",
    navContact: "संपर्क करें",
    navDashboard: "किसान डैशबोर्ड",
    navCropRec: "फसल चयन",
    navWeather: "मौसम पूर्वानुमान",
    navCalendar: "फसल कैलेंडर",
    navAIChat: "कृषि AI सहायक",
    navSoil: "मृदा स्वास्थ्य",
    navMandi: "मंडी भाव",
    btnLogin: "लॉग इन",
    btnRegister: "पंजीकरण",
    btnLogout: "लॉग आउट",
    heroTitle: "भारतीय किसानों के लिए आधुनिक एवं सटीक कृषि मंच",
    heroSubtitle: "अपनी मिट्टी और मौसम के अनुसार सही फसल का चयन करें, वास्तविक समय मंडी मूल्य जानें और कृषि वैज्ञानिकों की प्रमाणित सलाह प्राप्त करें।",
    btnGetStarted: "अभी शुरू करें",
    btnTryDemo: "डेमो खाता देखें"
  },
  as: {
    brand: "কৃষি মিত্র",
    tagline: "স্মাৰ্ট কৃষি। সঠিক সিদ্ধান্ত। অধিক উৎপাদন।",
    navHome: "বেটুপাত",
    navAbout: "আমাৰ বিষয়ে",
    navFeatures: "সেৱাসমূহ",
    navHowItWorks: "কেনেদৰে কাম কৰে",
    navContact: "যোগাযোগ",
    navDashboard: "কৃষক ডেশ্ববৰ্ড",
    navCropRec: "শস্য নিৰ্বাচন",
    navWeather: "বতৰৰ আগজাননী",
    navCalendar: "কৃষি কেলেণ্ডাৰ",
    navAIChat: "কৃষি এআই সহায়িকা",
    navSoil: "মাটিৰ স্বাস্থ্য",
    navMandi: "বজাৰ মূল্য",
    btnLogin: "প্ৰৱেশ",
    btnRegister: "পঞ্জীয়ন",
    btnLogout: "প্ৰস্থান",
    heroTitle: "ভাৰতীয় কৃষকসকলৰ বাবে বুদ্ধিমত্তা সম্পন্ন কৃষি সেৱা",
    heroSubtitle: "মাটি আৰু বতৰৰ অনুকূল শস্য বাছনি কৰক, সঠিক বজাৰ দৰ জানক আৰু বিশেষজ্ঞৰ পৰামৰ্শ লাভ কৰক।",
    btnGetStarted: "এতিয়াই আৰম্ভ কৰক",
    btnTryDemo: "ডেমো একাউন্ট চাওক"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
