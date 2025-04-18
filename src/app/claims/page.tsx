"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useI18n } from "@/lib/i18n/i18n-context";
import StatusTag from "@/components/ui/StatusTag";
import { Button } from "@/components/ui/button";
import { 
  ChevronRightIcon, 
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export default function ClaimsPage() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for claims
  const allClaims = [
    {
      id: "CL-2025-1234",
      patientName: "Somchai Jaidee",
      policyNumber: "THB9876543",
      type: "Medical",
      submittedDate: "April 10, 2025",
      amount: "$1,250.00",
      status: "pending",
      slaRemaining: "2 days",
    },
    {
      id: "CL-2025-1233",
      patientName: "Maria Gonzalez",
      policyNumber: "THB1234567",
      type: "Dental",
      submittedDate: "April 8, 2025",
      amount: "$750.00",
      status: "approved",
      slaRemaining: "Completed",
    },
    {
      id: "CL-2025-1232",
      patientName: "Liam O'Sullivan",
      policyNumber: "THB2345678",
      type: "Vision",
      submittedDate: "April 5, 2025",
      amount: "$350.00",
      status: "rejected",
      slaRemaining: "Completed",
    },
    {
      id: "CL-2025-1231",
      patientName: "Priya Singh",
      policyNumber: "THB4567890",
      type: "OPD Claim",
      submittedDate: "April 3, 2025",
      amount: "$850.00",
      status: "pending",
      slaRemaining: "1 day",
    },
    {
      id: "CL-2025-1230",
      patientName: "David Brown",
      policyNumber: "THB5678901",
      type: "OPD Claim",
      submittedDate: "April 2, 2025",
      amount: "$300.00",
      status: "pending",
      slaRemaining: "3 days",
    },
    {
      id: "CL-2025-1229",
      patientName: "Chen Wei",
      policyNumber: "THB6789012",
      type: "OPD Claim",
      submittedDate: "March 29, 2025",
      amount: "$3,600.00",
      status: "pending",
      slaRemaining: "2 days",
    },
  ];

  // Filter claims based on search query
  const filteredClaims = searchQuery 
    ? allClaims.filter(claim => 
        claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.policyNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allClaims;

  // Configure status display
  const getStatusConfig = (status: string) => {
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
      default:
        return { 
          type: "warning" as const, 
          label: t("status.processing"), 
          icon: <ArrowPathIcon className="h-3 w-3" /> 
        };
    }
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral">{t("nav.claims")}</h1>
          <Button className="flex items-center gap-2">
            <Link href="/claims/new" className="flex items-center gap-2">
              {t("dashboard.action.newClaim")}
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by claim ID, patient name or policy number..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary transition duration-150 ease-in-out sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <FunnelIcon className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      {/* Claims list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  {t("claims.id")}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  {t("claims.patient")}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  {t("claims.type")}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  {t("claims.submitted")}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  {t("claims.amount")}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  {t("claims.status")}
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">{t("claims.view")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClaims.map((claim) => {
                const statusConfig = getStatusConfig(claim.status);
                return (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral">
                      {claim.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral">
                      {claim.patientName}
                      <div className="text-xs text-neutral-secondary">{claim.policyNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-secondary">
                      {claim.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-secondary">
                      {claim.submittedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral">
                      {claim.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusTag status={statusConfig.type} icon={statusConfig.icon}>
                        {statusConfig.label}
                      </StatusTag>
                      {claim.status === "pending" && (
                        <div className="text-xs text-gray-500 mt-1">
                          SLA: {claim.slaRemaining}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/claims/${claim.id}`} 
                        className="text-primary hover:text-primary-dark flex items-center justify-end"
                      >
                        {t("claims.view")}
                        <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredClaims.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No claims matching your search criteria</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}