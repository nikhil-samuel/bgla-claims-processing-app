"use client";

import { ReactNode, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export default function SectionCard({ title, children, defaultExpanded = true }: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="section-card">
      <div 
        className="section-header cursor-pointer flex justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-medium text-base">{title}</h3>
        <button className="text-neutral-secondary">
          {isExpanded ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}
