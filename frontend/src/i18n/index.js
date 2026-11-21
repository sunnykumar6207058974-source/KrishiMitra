import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enFeatures from './locales/en/features.json';
import enHowItWorks from './locales/en/howItWorks.json';
import enContact from './locales/en/contact.json';
import enAuth from './locales/en/auth.json';
import enDashboard from './locales/en/dashboard.json';
import enAssistant from './locales/en/assistant.json';
import enCrops from './locales/en/crops.json';
import enWeather from './locales/en/weather.json';
import enSoil from './locales/en/soil.json';
import enMandi from './locales/en/mandi.json';
import enFarmer from './locales/en/farmer.json';
import enCalendar from './locales/en/calendar.json';
import enDisease from './locales/en/disease.json';
import enSettings from './locales/en/settings.json';

// Hindi translations
import hiCommon from './locales/hi/common.json';
import hiHome from './locales/hi/home.json';
import hiAbout from './locales/hi/about.json';
import hiFeatures from './locales/hi/features.json';
import hiHowItWorks from './locales/hi/howItWorks.json';
import hiContact from './locales/hi/contact.json';
import hiAuth from './locales/hi/auth.json';
import hiDashboard from './locales/hi/dashboard.json';
import hiAssistant from './locales/hi/assistant.json';
import hiCrops from './locales/hi/crops.json';
import hiWeather from './locales/hi/weather.json';
import hiSoil from './locales/hi/soil.json';
import hiMandi from './locales/hi/mandi.json';
import hiFarmer from './locales/hi/farmer.json';
import hiCalendar from './locales/hi/calendar.json';
import hiDisease from './locales/hi/disease.json';
import hiSettings from './locales/hi/settings.json';

const savedLang = localStorage.getItem('krishi_language') || 'en';

const resources = {
  en: {
    translation: {
      ...enCommon,
      home: enHome,
      about: enAbout,
      featuresPage: enFeatures,
      howItWorksPage: enHowItWorks,
      contactPage: enContact,
      authPage: enAuth,
      dash: enDashboard,
      assistantPage: enAssistant,
      cropsPage: enCrops,
      weatherPage: enWeather,
      soilPage: enSoil,
      mandiPage: enMandi,
      farmerPage: enFarmer,
      calendarPage: enCalendar,
      diseasePage: enDisease,
      settingsPage: enSettings,
      // Legacy flat keys backward-compatibility
      navHome: enCommon.nav.home,
      navAbout: enCommon.nav.about,
      navFeatures: enCommon.nav.features,
      navHowItWorks: enCommon.nav.howItWorks,
      navContact: enCommon.nav.contact,
      navDashboard: enCommon.nav.dashboard,
      btnLogin: enCommon.buttons.login,
      btnRegister: enCommon.buttons.register,
      btnLogout: enCommon.buttons.logout,
      heroTitle: enHome.heroTitle1 + " " + enHome.heroTitle2 + " " + enHome.heroTitle3,
      heroSubtitle: enHome.heroSubtitle,
      btnGetStarted: enHome.btnGetStarted,
      btnTryDemo: enHome.btnTestDemo
    }
  },
  hi: {
    translation: {
      ...hiCommon,
      home: hiHome,
      about: hiAbout,
      featuresPage: hiFeatures,
      howItWorksPage: hiHowItWorks,
      contactPage: hiContact,
      authPage: hiAuth,
      dash: hiDashboard,
      assistantPage: hiAssistant,
      cropsPage: hiCrops,
      weatherPage: hiWeather,
      soilPage: hiSoil,
      mandiPage: hiMandi,
      farmerPage: hiFarmer,
      calendarPage: hiCalendar,
      diseasePage: hiDisease,
      settingsPage: hiSettings,
      // Legacy flat keys backward-compatibility
      navHome: hiCommon.nav.home,
      navAbout: hiCommon.nav.about,
      navFeatures: hiCommon.nav.features,
      navHowItWorks: hiCommon.nav.howItWorks,
      navContact: hiCommon.nav.contact,
      navDashboard: hiCommon.nav.dashboard,
      btnLogin: hiCommon.buttons.login,
      btnRegister: hiCommon.buttons.register,
      btnLogout: hiCommon.buttons.logout,
      heroTitle: hiHome.heroTitle1 + " " + hiHome.heroTitle2 + " " + hiHome.heroTitle3,
      heroSubtitle: hiHome.heroSubtitle,
      btnGetStarted: hiHome.btnGetStarted,
      btnTryDemo: hiHome.btnTestDemo
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
