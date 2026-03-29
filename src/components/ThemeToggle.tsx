import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2! rounded-full bg-primary-100 dark:bg-dark-100 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-dark-200 transition-colors cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? <Moon size={25} /> : <Sun size={25} />}
    </button>
  );
}
