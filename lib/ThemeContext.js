import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const THEMES = ['white', 'black', 'green', 'orange', 'purple', 'pink'];

const THEME_LABELS = {
    white: 'Blanco',
    black: 'Negro',
    green: 'Verde',
    orange: 'Naranja',
    purple: 'Morado',
    pink: 'Rosado',
};

const THEME_COLORS = {
    white: '#3A7AFE',
    black: '#4C7DFF',
    green: '#2F8F6B',
    orange: '#FF7A3D',
    purple: '#7A5AF8',
    pink: '#FF5C93',
};

const ThemeContext = createContext({
    theme: 'white',
    themeIndex: 0,
    cycleTheme: () => { },
    themeName: 'Blanco',
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
