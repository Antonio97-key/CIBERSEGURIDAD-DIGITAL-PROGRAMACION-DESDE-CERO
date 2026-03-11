import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const THEMES = ['light', 'dark'];

const THEME_LABELS = {
    light: 'Claro',
    dark: 'Oscuro',
};

const THEME_COLORS = {
    light: '#1A365D',
    dark: '#3B82F6',
};

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
    themeName: 'Claro',
    themeColor: '#1A365D',
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('sd-theme');
        if (saved && THEMES.includes(saved)) {
            setTheme(saved);
            document.documentElement.setAttribute('data-theme', saved);
            if (saved === 'dark') document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
        } else {
            // Default to light or check OS preference if desired
            setTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = useCallback(() => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
        if (nextTheme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('sd-theme', nextTheme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                themeName: THEME_LABELS[theme],
                themeColor: THEME_COLORS[theme],
                mounted,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export { THEMES, THEME_LABELS, THEME_COLORS };
