import AppSidebar from "./AppSidebar";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 pl-20">
        <header className="bg-white/40 border-b border-gray-200 px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral">Somchai Jaidee</span>
              <span className="text-xs text-neutral-secondary">Claim ID: #1234ABCTDE</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white shadow-sm p-2 rounded-full">
              <UserCircleIcon className="h-6 w-6 text-neutral-secondary" />
            </div>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
