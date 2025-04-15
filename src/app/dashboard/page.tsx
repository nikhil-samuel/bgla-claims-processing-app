import AppLayout from "@/components/Layout/AppLayout";
import { ClipboardDocumentCheckIcon, ClockIcon, DocumentTextIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Mock data for the dashboard
const stats = [
  { name: "Total Claims", value: "12", icon: DocumentTextIcon, color: "text-blue-500" },
  { name: "In Progress", value: "3", icon: ClockIcon, color: "text-amber-500" },
  { name: "Approved", value: "7", icon: ClipboardDocumentCheckIcon, color: "text-green-500" },
  { name: "Requires Attention", value: "2", icon: ExclamationTriangleIcon, color: "text-red-500" },
];

const recentClaims = [
  {
    id: "CL-2025-1234",
    type: "Medical",
    submittedDate: "April 10, 2025",
    amount: "$1,250.00",
    status: "In Progress",
    statusColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "CL-2025-1233",
    type: "Dental",
    submittedDate: "April 8, 2025",
    amount: "$750.00",
    status: "Approved",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "CL-2025-1232",
    type: "Vision",
    submittedDate: "April 5, 2025",
    amount: "$350.00",
    status: "Requires Information",
    statusColor: "bg-red-100 text-red-800",
  },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, John Smith</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className={`h-10 w-10 ${stat.color}`} aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Claims */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Recent Claims</h2>
          <Link href="/claims" className="text-sm text-bgla-blue hover:underline">
            View all
          </Link>
        </div>
        
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
              {recentClaims.map((claim) => (
                <tr key={claim.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.submittedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${claim.statusColor}`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/claims/${claim.id}`} className="text-bgla-blue hover:text-bgla-light-blue">
                      View
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/claims/new" className="card hover:bg-gray-50 transition-colors">
            <h3 className="text-md font-medium text-gray-900 mb-1">Submit New Claim</h3>
            <p className="text-sm text-gray-500">Start the process for a new insurance claim</p>
          </Link>
          <Link href="/documents/upload" className="card hover:bg-gray-50 transition-colors">
            <h3 className="text-md font-medium text-gray-900 mb-1">Upload Documents</h3>
            <p className="text-sm text-gray-500">Upload supporting documents for your claims</p>
          </Link>
          <Link href="/contact" className="card hover:bg-gray-50 transition-colors">
            <h3 className="text-md font-medium text-gray-900 mb-1">Contact Support</h3>
            <p className="text-sm text-gray-500">Get help with your claims or account</p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
