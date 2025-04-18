"use client";

import AppLayout from "@/components/Layout/AppLayout";
import Link from "next/link";
import { useState } from "react";
import {
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

// Mock data for the claims list
const recentClaims = [
  {
    id: "CL-2025-1234",
    patientName: "John Smith",
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
  {
    id: "CL-2025-1231",
    patientName: "Priya Singh",
    policyNumber: "THB4567890",
    type: "OPD Claim",
    submittedDate: "April 3, 2025",
    amount: "$850.00",
    status: "pending",
  },
  {
    id: "CL-2025-1230",
    patientName: "David Brown",
    policyNumber: "THB5678901",
    type: "OPD Claim",
    submittedDate: "March 30, 2025",
    amount: "$300.00",
    status: "pending",
  },
  {
    id: "CL-2025-1229",
    patientName: "Chen Wei",
    policyNumber: "THB6789012",
    type: "OPD Claim",
    submittedDate: "March 28, 2025",
    amount: "$600.00",
    status: "processing",
  },
  {
    id: "CL-2025-1228",
    patientName: "Sarah Johnson",
    policyNumber: "THB7890123",
    type: "IPD Claim",
    submittedDate: "March 25, 2025",
    amount: "$3,200.00",
    status: "approved",
  },
  {
    id: "CL-2025-1227",
    patientName: "Mohamed Al-Fayez",
    policyNumber: "THB8901234",
    type: "Dental Claim",
    submittedDate: "March 20, 2025",
    amount: "$420.00",
    status: "rejected",
  }
];

export default function ClaimsList() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter claims based on status and search query
  const filteredClaims = recentClaims.filter(claim => {
    // Filter by status if a status filter is active
    if (filterStatus && claim.status !== filterStatus) {
      return false;
    }
    
    // Filter by search query if it exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        claim.id.toLowerCase().includes(query) ||
        claim.patientName.toLowerCase().includes(query) ||
        claim.policyNumber.toLowerCase().includes(query) ||
        claim.type.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getStatusTag = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="mr-1 h-3 w-3" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="mr-1 h-3 w-3" />
            Rejected
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <DocumentTextIcon className="mr-1 h-3 w-3" />
            Processing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral">Claims</h1>
          <p className="text-neutral-secondary">Manage and track all insurance claims</p>
        </div>
        <Link 
          href="/claims/new" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          New Claim
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search claims by ID, patient, or policy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                id="filter-menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <FunnelIcon className="h-5 w-5 mr-1" />
                Status
                <ChevronDownIcon className="h-5 w-5 ml-1 -mr-1" aria-hidden="true" />
              </button>
            </div>
            
            <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="filter-menu-button">
                <button 
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  onClick={() => setFilterStatus("pending")}
                >
                  Pending
                </button>
                <button 
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  onClick={() => setFilterStatus("approved")}
                >
                  Approved
                </button>
                <button 
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  onClick={() => setFilterStatus("rejected")}
                >
                  Rejected
                </button>
                <button 
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  onClick={() => setFilterStatus("processing")}
                >
                  Processing
                </button>
                <button 
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                  onClick={() => setFilterStatus(null)}
                >
                  All Statuses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active filters display */}
      {filterStatus && (
        <div className="mb-4 flex items-center">
          <span className="text-sm text-gray-500">Filters:</span>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Status: {filterStatus}
            <XCircleIcon 
              className="ml-1 h-4 w-4 cursor-pointer" 
              onClick={() => setFilterStatus(null)}
            />
          </span>
        </div>
      )}

      {/* Claims Table */}
      <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Claim ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
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
            {filteredClaims.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {claim.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="font-medium text-gray-900">{claim.patientName}</div>
                  <div className="text-xs text-gray-500">{claim.policyNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {claim.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {claim.submittedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {claim.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusTag(claim.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/claims/${claim.id}`} className="text-blue-600 hover:text-blue-900 flex items-center justify-end">
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
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredClaims.length}</span> of{' '}
              <span className="font-medium">{filteredClaims.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronRightIcon className="h-5 w-5 transform rotate-180" aria-hidden="true" />
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                1
              </button>
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}