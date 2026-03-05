import { createContext, useContext, useState, useEffect } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import it from '../locales/it.json';
import zh from '../locales/zh.json';

const translations = { es, en, fr, it, zh };

export const LANGUAGES = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'zh', name: '中文' },
];

const LanguageContext = createContext({
    language: 'es',
    setLanguage: () => { },
    t: () => '',
});

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState('es');

    // Load saved language or detect browser language on initial load
    useEffect(() => {
        const savedLang = localStorage.getItem('sd-language');
        if (savedLang && translations[savedLang]) {
            setLanguageState(savedLang);
        } else {
            // Automatic detection
            const browserLang = navigator.language.split('-')[0];
            if (translations[browserLang]) {
                setLanguageState(browserLang);
            }
        }
    }, []);

    const setLanguage = (langCode) => {
        if (translations[langCode]) {
            setLanguageState(langCode);
            localStorage.setItem('sd-language', langCode);
        }
    };

    /**
     * Helper function to get translation by key path (e.g., 'header.nav.home')
     */
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // Fallback to Spanish if translation is missing
                let fallback = translations['es'];
                for (const fk of keys) {
                    if (fallback && fallback[fk] !== undefined) {
                        fallback = fallback[fk];
                    } else {
                        return key; // If all else fails, return the key itself
                    }
                }
                return fallback;
            }
        }

        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
