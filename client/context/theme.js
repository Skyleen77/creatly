import { useEffect, useState, createContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'));
    }
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
