import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TranslationNamespace as DatatableNS, LangEn as DatatableLangEn } from 'shared/components/datatable/i18n';
import { TranslationNamespace as HomeNS, LangEn as HomeLangEn } from 'home/i18n';

export const resources = {
  en: {
    [DatatableNS]: DatatableLangEn,
    [HomeNS]: HomeLangEn,
  },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: [
    DatatableNS,
    HomeNS,
  ],
  resources,
});
