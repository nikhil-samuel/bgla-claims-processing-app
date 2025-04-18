"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/i18n-context";

export default function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 px-0">
        <Globe className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0 hover:bg-slate-100">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t('nav.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={language === 'en' ? 'bg-muted' : ''}
          onClick={() => setLanguage('en')}
        >
          <span className="mr-2">🇺🇸</span>
          {t('language.english')}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={language === 'es' ? 'bg-muted' : ''}
          onClick={() => setLanguage('es')}
        >
          <span className="mr-2">🇪🇨</span>
          {t('language.spanish')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}