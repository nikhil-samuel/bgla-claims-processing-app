"use client";

import AppLayout from "@/components/Layout/AppLayout";
import Link from "next/link";
import { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/utils/formatters";

// Mock claim data
const mockClaims = [
  {
    id: "CLM-23456-789",
    status: "Pending",
    submissionDate: "2025-03-15T14:30:00Z",
    memberName: "John Smith",
    memberID: "MEM-12345",
    provider: "City Hospital Medical Center",
    serviceDate: "2025-03-10T09:15:00Z",
    amount: 160.50
  },
  {
    id: "CLM-23456-790",
    status: "In Review",
    submissionDate: "2025-03-14T10:15:00Z",
    memberName: "Sarah Johnson",
    memberID: "MEM-12346",
    provider: "Westside Medical Group",
    serviceDate: "2025-03-09T14:30:00Z",
    amount: 275.20
  },
  {
    id: "CLM-23456-791",
    status: "Approved",
    submissionDate: "2025-03-13T09:45:00Z",
    memberName: "Robert Williams",
    memberID: "MEM-12347",
    provider: "Downtown Health Clinic",
    serviceDate: "2025-03-08T11:00:00Z",
    amount: 425.75
  },
  {
    id: "CLM-23456-792",
    status: "Denied",
    submissionDate: "2025-03-12T16:20:00Z",
    memberName: "Maria Garcia",
    memberID: "MEM-12348",
    provider: "Northside Hospital",
    serviceDate: "2025-03-07T13:45:00Z",
    amount: 1250.00
  },
  {
    id: "CLM-23456-793",
    status: "Pending",
    submissionDate: "2025-03-11T11:30:00Z",
    memberName: "David Lee",
    memberID: "MEM-12349",
    provider: "Eastside Medical Center",
    serviceDate: "2025-03-06T10:30:00Z",
    amount: 85.30
  }
];

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClaims = mockClaims.filter(claim => 
    claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.memberID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AppLayout>
      <div className="py-6">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Claims</h1>
            <div className="mt-4 sm:mt-0">
              <Link 
                href="/claims/new" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Claim
              </Link>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between">
              <div className="w-64 mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search claims"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Claim ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Member
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Provider
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Service Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Submission Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-blue-600 sm:pl-6">
                        <Link href={`/claims/${claim.id}`}>{claim.id}</Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          claim.status === 'Denied' ? 'bg-red-100 text-red-800' :
                          claim.status === 'In Review' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {claim.memberName}
                        <div className="text-xs text-gray-500">{claim.memberID}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {claim.provider}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDate(claim.serviceDate)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDate(claim.submissionDate)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        ${claim.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
