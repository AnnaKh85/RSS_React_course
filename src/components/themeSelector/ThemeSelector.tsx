import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './themeSelector.css';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as 'light' | 'dark');
  };

  return (
    <div className="theme-selector" data-testid="theme-provider">
      <label htmlFor="theme">Select Theme: </label>
      <select id="theme" value={theme} onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
