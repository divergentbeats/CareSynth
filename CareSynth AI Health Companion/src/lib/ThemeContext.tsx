import { createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
});

export const useTheme = () => useContext(ThemeContext);
