"use client";

import { useState } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import ClaimCard from "@/components/claims/ClaimCard";
import StatusTag from "@/components/ui/StatusTag";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Button } from "@/components/ui/button";
import { 
  ClipboardDocumentCheckIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Dashboard() {
  const { t } = useI18n();
  const [sorting, setSorting] = useState<"sla" | "value">("sla");
  
  // Mock data for the dashboard
  const stats = [
    { 
      name: t("dashboard.stats.total"), 
      value: "12", 
      icon: DocumentTextIcon, 
      bgColor: "bg-blue-50", 
      iconColor: "text-primary" 
    },
    { 
      name: t("dashboard.stats.inProgress"), 
      value: "3", 
      icon: ClockIcon, 
      bgColor: "bg-warning-light", 
      iconColor: "text-warning" 
    },
    { 
      name: t("dashboard.stats.approved"), 
      value: "7", 
      icon: ClipboardDocumentCheckIcon, 
      bgColor: "bg-success-light", 
      iconColor: "text-success" 
    },
    { 
      name: t("dashboard.stats.attention"), 
      value: "2", 
      icon: ExclamationTriangleIcon, 
      bgColor: "bg-error-light", 
      iconColor: "text-error" 
    },
  ];

  const recentClaims = [
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
  ];

  // Modified pendingClaims to include SLA and high-value indicators
  const pendingClaims = [
    {
      id: "CL-2025-1231",
      patientName: "Priya Singh",
      policyNumber: "THB4567890",
      type: "OPD Claim",
      amount: "$850.00",
      status: "pending",
      slaRemaining: "1 day",
      isUrgent: true,
      isHighValue: false,
      hasDuplicateWarning: false,
    },
    {
      id: "CL-2025-1230",
      patientName: "David Brown",
      policyNumber: "THB5678901",
      type: "OPD Claim",
      amount: "$300.00",
      status: "pending",
      slaRemaining: "3 days",
      isUrgent: false,
      isHighValue: false,
      hasDuplicateWarning: true,
    },
    {
      id: "CL-2025-1229",
      patientName: "Chen Wei",
      policyNumber: "THB6789012",
      type: "OPD Claim",
      amount: "$3,600.00",
      status: "pending",
      slaRemaining: "2 days",
      isUrgent: false,
      isHighValue: true,
      hasDuplicateWarning: false,
    },
  ];

  // Sort claims based on current sort criteria
  const sortedClaims = [...pendingClaims].sort((a, b) => {
    if (sorting === "sla") {
      // Sort by urgency first (if SLA is urgent), then by SLA days remaining
      if (a.isUrgent && !b.isUrgent) return -1;
      if (!a.isUrgent && b.isUrgent) return 1;
      
      const aDays = parseInt(a.slaRemaining.split(' ')[0]);
      const bDays = parseInt(b.slaRemaining.split(' ')[0]);
      return aDays - bDays;
    } else {
      // Sort by high value first, then by amount
      if (a.isHighValue && !b.isHighValue) return -1;
      if (!a.isHighValue && b.isHighValue) return 1;
      
      const aAmount = parseFloat(a.amount.replace('$', '').replace(',', ''));
      const bAmount = parseFloat(b.amount.replace('$', '').replace(',', ''));
      return bAmount - aAmount;
    }
  });

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral">{t("dashboard.title")}</h1>
        <p className="text-neutral-secondary">{t("dashboard.welcome")}, John Smith</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-neutral-secondary truncate">{stat.name}</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-neutral">{stat.value}</div>
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Claims Queue */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral">{t("dashboard.queue")}</h2>
          <div className="flex gap-3 items-center">
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <Button 
                variant={sorting === "sla" ? "default" : "outline"} 
                size="sm" 
                className="rounded-none gap-1 border-0"
                onClick={() => setSorting("sla")}
              >
                <CalendarDaysIcon className="h-4 w-4" />
                SLA
              </Button>
              <Button 
                variant={sorting === "value" ? "default" : "outline"} 
                size="sm" 
                className="rounded-none gap-1 border-0"
                onClick={() => setSorting("value")}
              >
                <ArrowTrendingUpIcon className="h-4 w-4" />
                Value
              </Button>
            </div>
            <Link href="/claims" className="text-sm text-primary hover:text-primary-dark flex items-center">
              {t("dashboard.viewAll")}
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sortedClaims.map((claim) => (
            <ClaimCard
              key={claim.id}
              claimId={claim.id}
              patientName={claim.patientName}
              policyNumber={claim.policyNumber}
              claimType={claim.type}
              amount={claim.amount}
              status={claim.status as any}
              slaRemaining={claim.slaRemaining}
              isUrgent={claim.isUrgent}
              isHighValue={claim.isHighValue}
              hasDuplicateWarning={claim.hasDuplicateWarning}
              href={`/claims/${claim.id}`}
            />
          ))}
        </div>
      </div>
      
      {/* Recent Claims */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-neutral">{t("dashboard.recentClaims")}</h2>
          <Link href="/claims" className="text-sm text-primary hover:text-primary-dark">
            {t("dashboard.viewAll")}
          </Link>
        </div>
        
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
              {recentClaims.map((claim) => (
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
                    <StatusTag status={claim.status as any}>
                      {claim.status === "pending" ? t("status.pending") :
                       claim.status === "approved" ? t("status.approved") : 
                       claim.status === "rejected" ? t("status.rejected") : t("status.processing")}
                    </StatusTag>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-neutral mb-4">{t("dashboard.quickActions")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/claims/new" className="card hover:bg-gray-50 transition-colors hover:shadow-md">
            <h3 className="text-md font-medium text-neutral mb-1">{t("dashboard.action.newClaim")}</h3>
            <p className="text-sm text-neutral-secondary">Start the process for a new insurance claim</p>
          </Link>
          <Link href="/documents/upload" className="card hover:bg-gray-50 transition-colors hover:shadow-md">
            <h3 className="text-md font-medium text-neutral mb-1">{t("dashboard.action.uploadDocuments")}</h3>
            <p className="text-sm text-neutral-secondary">Upload supporting documents for your claims</p>
          </Link>
          <Link href="/contact" className="card hover:bg-gray-50 transition-colors hover:shadow-md">
            <h3 className="text-md font-medium text-neutral mb-1">{t("dashboard.action.contactSupport")}</h3>
            <p className="text-sm text-neutral-secondary">Get help with your claims or account</p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}