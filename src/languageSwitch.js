// languageSwitch.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";

function YourComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('welcomeMessage')}</h1>
      <p>{t('someOtherText')}</p>
      <button onClick={() => i18n.changeLanguage('en')}><span class="fi fi-us"></span></button>
      <button onClick={() => i18n.changeLanguage('fr')}><span class="fi fi-yt"></span></button>
    </div>
  );
}

export default YourComponent;
