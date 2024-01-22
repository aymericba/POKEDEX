// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importez vos fichiers de traduction
import enTranslation from './en.json';
import frTranslation from './fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      // Ajoutez d'autres langues au besoin
    },
    lng: 'en', // Langue par défaut
    fallbackLng: 'en', // Langue de secours
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
