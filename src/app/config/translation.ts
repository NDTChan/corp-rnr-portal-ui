import {Storage, TranslatorContext} from 'react-jhipster';
import {setLocale} from "app/shared/reducers/locale";


TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  'zh-cn': {name: '中文'},
  en: {name: 'English'},
};

export const locales = Object.keys(languages).sort();

export const registerLocale = store => {
  store.dispatch(setLocale(Storage.session.get('locale', 'en')));
};
