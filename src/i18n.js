import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-xhr-backend"

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: "/locales/{{lng}}.json",
        },
        lng: "en",
        fallbackLng: ["en", "se", "ru"],
        debug: true,

        interpolation: {
            escapeValue: false
        }
    })

export default i18n