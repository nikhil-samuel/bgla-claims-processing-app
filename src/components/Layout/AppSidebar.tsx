"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/i18n-context";
import { 
  HomeIcon, 
  DocumentTextIcon, 
  DocumentPlusIcon, 
  FolderIcon, 
  ChartBarIcon,
  Cog6ToothIcon, 
  QuestionMarkCircleIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

export default function AppSidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  
  const navigationItems = [
    { name: t("nav.dashboard"), icon: HomeIcon, href: "/dashboard" },
    { name: t("nav.claims"), icon: DocumentTextIcon, href: "/claims" },
    { name: t("dashboard.action.newClaim"), icon: DocumentPlusIcon, href: "/claims/new" },
    { name: t("nav.documents"), icon: FolderIcon, href: "/documents" },
    { name: t("nav.reports"), icon: ChartBarIcon, href: "/reports" },
    { name: t("nav.settings"), icon: Cog6ToothIcon, href: "/settings" },
  ];

  return (
    <div className="sidebar">
      <div className="flex flex-col items-center">
        <div className="py-6">
          <Link href="/dashboard">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white text-xl font-bold">
              BG
            </div>
          </Link>
        </div>
        
        <div className="flex flex-col items-center gap-4 mt-6">
          {navigationItems.map((item) => {
            const isActive = 
              pathname === item.href || 
              (pathname?.startsWith(item.href) && item.href !== "/dashboard");
              
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
                title={item.name}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4 pb-6">
        <button 
          className="flex h-10 w-10 items-center justify-center rounded-md text-gray-400 hover:bg-white/5 hover:text-gray-200"
          title="Help"
        >
          <QuestionMarkCircleIcon className="h-5 w-5" />
        </button>
        
        <Link 
          href="/profile" 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white"
          title="Profile"
        >
          <UserCircleIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}