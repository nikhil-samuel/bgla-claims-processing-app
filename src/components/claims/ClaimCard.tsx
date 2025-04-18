"use client";

import Link from "next/link";
import StatusTag from "../ui/StatusTag";
import { useI18n } from "@/lib/i18n/i18n-context";
import { 
  ArrowPathIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  BanknotesIcon,
  DocumentDuplicateIcon
} from "@heroicons/react/24/outline";

interface ClaimCardProps {
  claimId: string;
  policyNumber: string;
  patientName: string;
  claimType: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "processing";
  slaRemaining?: string;
  isUrgent?: boolean;
  isHighValue?: boolean;
  hasDuplicateWarning?: boolean;
  href: string;
}

export default function ClaimCard({
  claimId,
  policyNumber,
  patientName,
  claimType,
  amount,
  status,
  slaRemaining,
  isUrgent = false,
  isHighValue = false,
  hasDuplicateWarning = false,
  href,
}: ClaimCardProps) {
  const { t } = useI18n();

  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return { 
          type: "pending" as const, 
          label: t("status.pending"), 
          icon: <ArrowPathIcon className="h-3 w-3" /> 
        };
      case "approved":
        return { 
          type: "success" as const, 
          label: t("status.approved"), 
          icon: null 
        };
      case "rejected":
        return { 
          type: "error" as const, 
          label: t("status.rejected"), 
          icon: null 
        };
      case "processing":
        return { 
          type: "warning" as const, 
          label: t("status.processing"), 
          icon: <ArrowPathIcon className="h-3 w-3" /> 
        };
      default:
        return { 
          type: "pending" as const, 
          label: t("status.pending"), 
          icon: <ArrowPathIcon className="h-3 w-3" /> 
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Determine border color based on urgency
  const borderClass = isUrgent 
    ? "border-l-4 border-l-error" 
    : isHighValue 
      ? "border-l-4 border-l-success" 
      : "border border-gray-200";

  return (
    <Link href={href}>
      <div className={`bg-white ${borderClass} shadow-card rounded-lg p-4 transition-all hover:shadow-lg relative`}>
        {/* Indicators */}
        <div className="absolute -top-2 right-3 flex gap-1">
          {isUrgent && (
            <div className="bg-error text-white px-2 py-0.5 rounded-full text-xs flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" />
              Urgent
            </div>
          )}
          {isHighValue && (
            <div className="bg-success text-white px-2 py-0.5 rounded-full text-xs flex items-center">
              <BanknotesIcon className="h-3 w-3 mr-1" />
              High Value
            </div>
          )}
          {hasDuplicateWarning && (
            <div className="bg-warning text-white px-2 py-0.5 rounded-full text-xs flex items-center">
              <DocumentDuplicateIcon className="h-3 w-3 mr-1" />
              Duplicate
            </div>
          )}
        </div>
        
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-medium text-neutral">{patientName}</h3>
            <p className="text-xs text-neutral-secondary">{policyNumber}</p>
          </div>
          <StatusTag status={statusConfig.type} icon={statusConfig.icon}>
            {statusConfig.label}
          </StatusTag>
        </div>
        
        <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between">
          <div>
            <p className="text-xs text-neutral-secondary">Type</p>
            <p className="text-sm text-neutral-secondary">{claimType}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-secondary">Amount</p>
            <p className="text-sm font-medium text-neutral">{amount}</p>
          </div>
        </div>
        
        {slaRemaining && (
          <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between items-center">
            <div className="flex items-center">
              <ClockIcon className={`h-4 w-4 mr-1 ${isUrgent ? 'text-error' : 'text-neutral-secondary'}`} />
              <p className={`text-xs ${isUrgent ? 'text-error font-medium' : 'text-neutral-secondary'}`}>
                SLA: {slaRemaining}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-secondary">{claimId}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}