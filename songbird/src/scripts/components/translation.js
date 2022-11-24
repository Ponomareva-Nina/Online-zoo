import langEn from '../data/landEn';
import langRu from '../data/langRu';

export function changeToRussian(component) {
  component.changeLanguage(langRu);
}

export function changeToEnglish(component) {
  component.changeLanguage(langEn);
}

export function getLangContent() {
  const activeLang = localStorage.getItem('language') || 'ru';
  if (activeLang === 'en') {
    return langEn;
  }
  return langRu;
}

export function setLangInLocalStorage(lang) {
  localStorage.setItem('language', lang);
}
