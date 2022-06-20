import React from 'react';
import Toggle from './Toggle';
import useDarkMode from 'use-dark-mode';

const DarkModeToggle = () => {
const darkMode = useDarkMode(false);
  return (
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
  );
};

export default DarkModeToggle;