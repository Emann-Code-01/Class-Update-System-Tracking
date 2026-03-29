import { AppSidebar } from './AppSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <AppSidebar />
      <main className="flex-1 overflow-auto lg:ml-0 ml-0">
        {children}
      </main>
    </div>
  );
}