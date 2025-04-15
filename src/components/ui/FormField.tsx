"use client";

import { ReactNode } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  validationState?: "success" | "error" | "none";
  validationMessage?: string;
  required?: boolean;
}

export default function FormField({
  label,
  htmlFor,
  children,
  validationState = "none",
  validationMessage,
  required = false,
}: FormFieldProps) {
  return (
    <div className="form-item">
      <div className="flex items-center gap-1">
        {validationState === "success" && (
          <CheckCircleIcon className="h-4 w-4 text-success" />
        )}
        {validationState === "error" && (
          <XCircleIcon className="h-4 w-4 text-error" />
        )}
        <label htmlFor={htmlFor} className="form-label">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      </div>
      
      {children}
      
      {validationState === "error" && validationMessage && (
        <p className="mt-1 text-xs text-error">{validationMessage}</p>
      )}
    </div>
  );
}
