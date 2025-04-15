import AppLayout from "@/components/Layout/AppLayout";
import { ChevronRightIcon, AdjustmentsHorizontalIcon, PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

// Mock data for claims list
const claims = [
  {
    id: "CL-2025-1234",
    type: "Medical",
    provider: "City Hospital",
    submittedDate: "April 10, 2025",
    amount: "$1,250.00",
    status: "In Progress",
    statusColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "CL-2025-1233",
    type: "Dental",
    provider: "Smile Dental Clinic",
    submittedDate: "April 8, 2025",
    amount: "$750.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "CL-2025-1232",
    type: "Vision",
    provider: "Clear Vision Center",
    submittedDate: "April 5, 2025",
    amount: "$350.00",
    status: "Requires Information",
    statusColor: "bg-red-100 text-red-800",
  },
  {
    id: "CL-2025-1231",
    type: "Medical",
    provider: "Family Medical Group",
    submittedDate: "March 28, 2025",
    amount: "$2,100.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "CL-2025-1230",
    type: "Pharmacy",
    provider: "Health Pharmacy",
    submittedDate: "March 25, 2025",
    amount: "$85.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "CL-2025-1229",
    type: "Dental",
    provider: "Smile Dental Clinic",
    submittedDate: "March 20, 2025",
    amount: "$420.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "CL-2025-1228",
    type: "Medical",
    provider: "City Hospital",
    submittedDate: "March 15, 2025",
    amount: "$3,500.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "CL-2025-1227",
    type: "Physical Therapy",
    provider: "Recovery Therapy Center",
    submittedDate: "March 10, 2025",
    amount: "$650.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "CL-2025-1226",
    type: "Vision",
    provider: "Clear Vision Center",
    submittedDate: "March 5, 2025",
    amount: "$275.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "CL-2025-1225",
    type: "Pharmacy",
    provider: "Health Pharmacy",
    submittedDate: "February 28, 2025",
    amount: "$125.00",
    status: "Denied",
    statusColor: "bg-red-100 text-red-800",
  },
  {
    id: "CL-2025-1224",
    type: "Medical",
    provider: "Family Medical Group",
    submittedDate: "February 20, 2025",
    amount: "$1,800.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "CL-2025-1223",
    type: "Mental Health",
    provider: "Wellness Counseling",
    submittedDate: "February 15, 2025",
    amount: "$180.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
];

export default function Claims() {
  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Claims</h1>
          <p className="text-gray-600">View and manage your insurance claims</p>
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
      
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Claim ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.submittedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${claim.statusColor}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/claims/${claim.id}`} className="text-bgla-blue hover:text-bgla-light-blue inline-flex items-center">
                      View
                      <ChevronRightIcon className="ml-1 h-4 w-4" />
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
            <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">12</span> of{" "}
                <span className="font-medium">48</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-bgla-blue px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bgla-blue">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  2
                </a>
                <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                  3
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  4
                </a>
                <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
