import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AppHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function AppHeader({ title, children }: AppHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-5 shadow-sm">
      <div className="flex flex-col md:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>
        <div className="flex items-center gap-4">
          {children}
          <button
            onClick={toggleTheme}
            className="flex p-2.5 rounded-xl border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}