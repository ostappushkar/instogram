import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  color: '#fff',
  toggleTheme: () => {},
});
