import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const THEMES = ['blue', 'green', 'white'];

const THEME_LABELS = {
    blue: 'Azul',
    green: 'Verde',
    white: 'Blanco',
};

const THEME_COLORS = {
    blue: '#3A7AFE',
    green: '#10B981',
    white: '#FFFFFF',
};

const ThemeContext = createContext({
    theme: 'blue',
    themeIndex: 0,
    cycleTheme: () => { },
    themeName: 'Azul',
    themeColor: '#3A7AFE',
});

export function ThemeProvider({ children }) {
    const [themeIndex, setThemeIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('sd-theme');
        if (saved && THEMES.includes(saved)) {
            const idx = THEMES.indexOf(saved);
            setThemeIndex(idx);
            document.documentElement.setAttribute('data-theme', saved);
        }
    }, []);

    const cycleTheme = useCallback(() => {
        const nextIndex = (themeIndex + 1) % THEMES.length;
        const nextTheme = THEMES[nextIndex];
        setThemeIndex(nextIndex);
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('sd-theme', nextTheme);
    }, [themeIndex]);

    const theme = THEMES[themeIndex];

    return (
        <ThemeContext.Provider
            value={{
                theme,
                themeIndex,
                cycleTheme,
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
