import AppLayout from "@/components/Layout/AppLayout";
import ClaimCard from "@/components/claims/ClaimCard";
import StatusTag from "@/components/ui/StatusTag";
import { 
  ClipboardDocumentCheckIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Mock data for the dashboard
const stats = [
  { 
    name: "Total Claims", 
    value: "12", 
    icon: DocumentTextIcon, 
    bgColor: "bg-blue-50", 
    iconColor: "text-primary" 
  },
  { 
    name: "In Progress", 
    value: "3", 
    icon: ClockIcon, 
    bgColor: "bg-warning-light", 
    iconColor: "text-warning" 
  },
  { 
    name: "Approved", 
    value: "7", 
    icon: ClipboardDocumentCheckIcon, 
    bgColor: "bg-success-light", 
    iconColor: "text-success" 
  },
  { 
    name: "Requires Attention", 
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
  },
  {
    id: "CL-2025-1233",
    patientName: "Maria Gonzalez",
    policyNumber: "THB1234567",
    type: "Dental",
    submittedDate: "April 8, 2025",
    amount: "$750.00",
    status: "approved",
  },
  {
    id: "CL-2025-1232",
    patientName: "Liam O'Sullivan",
    policyNumber: "THB2345678",
    type: "Vision",
    submittedDate: "April 5, 2025",
    amount: "$350.00",
    status: "rejected",
  },
];

const pendingClaims = [
  {
    id: "CL-2025-1231",
    patientName: "Priya Singh",
    policyNumber: "THB4567890",
    type: "OPD Claim",
    amount: "$850.00",
    status: "pending",
  },
  {
    id: "CL-2025-1230",
    patientName: "David Brown",
    policyNumber: "THB5678901",
    type: "OPD Claim",
    amount: "$300.00",
    status: "pending",
  },
  {
    id: "CL-2025-1229",
    patientName: "Chen Wei",
    policyNumber: "THB6789012",
    type: "OPD Claim",
    amount: "$600.00",
    status: "pending",
  },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral">Dashboard</h1>
        <p className="text-neutral-secondary">Welcome back, John Smith</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
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
          <h2 className="text-lg font-semibold text-neutral">Claims Queue</h2>
          <Link href="/claims" className="text-sm text-primary hover:text-primary-dark flex items-center">
            View all
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pendingClaims.map((claim) => (
            <ClaimCard
              key={claim.id}
              claimId={claim.id}
              patientName={claim.patientName}
              policyNumber={claim.policyNumber}
              claimType={claim.type}
              amount={claim.amount}
              status={claim.status as any}
              href={`/claims/${claim.id}`}
            />
          ))}
        </div>
      </div>
      
      {/* Recent Claims */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-neutral">Recent Claims</h2>
          <Link href="/claims" className="text-sm text-primary hover:text-primary-dark">
            View all
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  Claim ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-secondary uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
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
                      {claim.status === "pending" ? "Pending" :
                       claim.status === "approved" ? "Approved" : 
                       claim.status === "rejected" ? "Rejected" : "Processing"}
                    </StatusTag>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/claims/${claim.id}`} 
                      className="text-primary hover:text-primary-dark flex items-center justify-end"
                    >
                      View
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
        <h2 className="text-lg font-semibold text-neutral mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/claims/new" className="card hover:bg-gray-50 transition-colors">
            <h3 className="text-md font-medium text-neutral mb-1">Submit New Claim</h3>
            <p className="text-sm text-neutral-secondary">Start the process for a new insurance claim</p>
          </Link>
          <Link href="/documents/upload" className="card hover:bg-gray-50 transition-colors">
            <h3 className="text-md font-medium text-neutral mb-1">Upload Documents</h3>
            <p className="text-sm text-neutral-secondary">Upload supporting documents for your claims</p>
          </Link>
          <Link href="/contact" className="card hover:bg-gray-50 transition-colors">
            <h3 className="text-md font-medium text-neutral mb-1">Contact Support</h3>
            <p className="text-sm text-neutral-secondary">Get help with your claims or account</p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
