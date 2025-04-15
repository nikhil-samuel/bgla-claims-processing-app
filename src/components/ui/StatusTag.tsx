import { ReactNode } from "react";

type StatusType = "pending" | "success" | "error" | "warning";

interface StatusTagProps {
  status: StatusType;
  children: ReactNode;
  icon?: ReactNode;
}

export default function StatusTag({ status, children, icon }: StatusTagProps) {
  const tagClasses = {
    pending: "tag-pending",
    success: "tag-success",
    error: "tag-error",
    warning: "tag-warning",
  };

  return (
    <span className={tagClasses[status]}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}
