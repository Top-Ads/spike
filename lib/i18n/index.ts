import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import * as en  from "./dictionary/en.json"
import LanguageDetector from 'i18next-browser-languagedetector'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)


i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en
      }
    },
    fallbackLng: "it", // use en if detected lng is not available
    saveMissing: true, // send not translated keys to endpoint
    interpolation: {
        escapeValue: false // react already safes from xss
      }
}, (err) => {
  console.error(err)
});


export default i18n;