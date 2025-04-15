import AppLayout from "@/components/Layout/AppLayout";
import ClaimCard from "@/components/claims/ClaimCard";
import StatusTag from "@/components/ui/StatusTag";
import { AdjustmentsHorizontalIcon, PlusIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Mock data for claims list
const pendingClaims = [
  {
    id: "CL-2025-1234",
    patientName: "Somchai Jaidee",
    policyNumber: "THB9876543",
    type: "OPD Claim",
    amount: "$400.00",
    status: "pending",
  },
  {
    id: "CL-2025-1233",
    patientName: "Maria Gonzalez",
    policyNumber: "THB1234567",
    type: "OPD Claim",
    amount: "$650.00",
    status: "pending",
  },
  {
    id: "CL-2025-1232",
    patientName: "Liam O'Sullivan",
    policyNumber: "THB2345678",
    type: "OPD Claim",
    amount: "$720.00",
    status: "pending",
  },
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

const recentClaims = [
  {
    id: "CL-2025-1228",
    patientName: "Nia Abdalla",
    policyNumber: "THB8901234",
    type: "Medical",
    provider: "City Hospital",
    submittedDate: "March 15, 2025",
    amount: "$550.00",
    status: "approved",
  },
  {
    id: "CL-2025-1227",
    patientName: "Raj Patel",
    policyNumber: "THB8901234",
    type: "Physical Therapy",
    provider: "Recovery Therapy Center",
    submittedDate: "March 10, 2025",
    amount: "$700.00",
    status: "approved",
  },
  {
    id: "CL-2025-1226",
    patientName: "Sophia Rodriguez",
    policyNumber: "THB9012345",
    type: "Vision",
    provider: "Clear Vision Center",
    submittedDate: "March 5, 2025",
    amount: "$275.00",
    status: "rejected",
  },
  {
    id: "CL-2025-1225",
    patientName: "Ethan Clark",
    policyNumber: "THB0123456",
    type: "Pharmacy",
    provider: "Health Pharmacy",
    submittedDate: "February 28, 2025",
    amount: "$125.00",
    status: "approved",
  },
];

export default function Claims() {
  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral">Claims Queue</h1>
          <p className="text-neutral-secondary">View and manage your insurance claims</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="flex items-center btn-secondary">
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
            Filter
          </button>
          <Link href="/claims/new" className="flex items-center btn-primary">
            <PlusIcon className="h-5 w-5 mr-1" />
            New Claim
          </Link>
        </div>
      </div>
      
      {/* Claims Queue - Card View */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  Provider
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
                    {claim.provider}
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
        
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-neutral-secondary hover:bg-gray-50">
              Previous
            </button>
            <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-neutral-secondary hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-secondary">
                Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{" "}
                <span className="font-medium">12</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button aria-current="page" className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-secondary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  2
                </button>
                <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-neutral-secondary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                  3
                </button>
                <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
