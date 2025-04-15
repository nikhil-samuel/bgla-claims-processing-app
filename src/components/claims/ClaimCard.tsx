import Link from "next/link";
import StatusTag from "../ui/StatusTag";
import { SyncIcon } from "@heroicons/react/24/outline";

interface ClaimCardProps {
  claimId: string;
  policyNumber: string;
  patientName: string;
  claimType: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "processing";
  href: string;
}

export default function ClaimCard({
  claimId,
  policyNumber,
  patientName,
  claimType,
  amount,
  status,
  href,
}: ClaimCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return { 
          type: "pending" as const, 
          label: "Pending", 
          icon: <SyncIcon className="h-3 w-3" /> 
        };
      case "approved":
        return { 
          type: "success" as const, 
          label: "Approved", 
          icon: null 
        };
      case "rejected":
        return { 
          type: "error" as const, 
          label: "Rejected", 
          icon: null 
        };
      case "processing":
        return { 
          type: "warning" as const, 
          label: "Processing", 
          icon: <SyncIcon className="h-3 w-3" /> 
        };
      default:
        return { 
          type: "pending" as const, 
          label: "Pending", 
          icon: <SyncIcon className="h-3 w-3" /> 
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <Link href={href}>
      <div className="bg-white border border-gray-200 shadow-card rounded-lg p-4 transition-all hover:shadow-lg">
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
      </div>
    </Link>
  );
}
