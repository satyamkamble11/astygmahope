import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeMode } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  fontScale: number;
  setFontScale: (scale: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [fontScale, setFontScale] = useState<number>(100);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-diwali', 'theme-navratri');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'diwali') {
      root.classList.add('theme-diwali');
    } else if (theme === 'navratri') {
      root.classList.add('theme-navratri');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${(fontScale / 100) * 16}px`;
  }, [fontScale]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontScale, setFontScale }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
