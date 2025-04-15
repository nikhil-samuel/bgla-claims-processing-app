"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";

// Mock data for claim details
const claimDetails = {
  id: "#1234ABCTDE",
  patientName: "Somchai Jaidee",
  policyNumber: "THB9876543",
  idNumber: "1-1022-33445-67-8",
  hasOtherInsurance: "Yes",
  gender: "Male",
  documents: [
    { id: "doc1", name: "Claim Form", type: "Source Document", uploadedBy: "Cameron Williams", lastEdited: "12/04/2024" },
    { id: "doc2", name: "Invoice", type: "Supporting Document", uploadedBy: "Andrea Hans", lastEdited: "1/01/2024" },
    { id: "doc3", name: "Admission Note", type: "Supporting Document", uploadedBy: "Angela Mills", lastEdited: "18/02/2024" },
    { id: "doc4", name: "Operation Note", type: "Supporting Document", uploadedBy: "Sue Keston", lastEdited: "22/04/2024" },
    { id: "doc5", name: "Discharge Summary", type: "Supporting Document", uploadedBy: "Kelsea Chills", lastEdited: "26/06/2024" },
    { id: "doc6", name: "Follow-Up Report", type: "Supporting Document", uploadedBy: "Mark Thompson", lastEdited: "15/08/2024" },
    { id: "doc7", name: "Referral Letter", type: "Supporting Document", uploadedBy: "Julia Roberts", lastEdited: "30/09/2024" },
  ]
};

export default function ClaimDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("Policy & Member");
  const [showDocumentPanel, setShowDocumentPanel] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(["Policy & Member"]);
  
  const claimId = params.id;

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Auto-expand the section related to the tab
    if (!expandedSections.includes(tab)) {
      setExpandedSections([...expandedSections, tab]);
    }
  };

  const handleDocumentClick = (docId: string) => {
    setSelectedDocument(docId);
    setShowDocumentPanel(true);
  };

  const closeDocumentPanel = () => {
    setShowDocumentPanel(false);
    setSelectedDocument(null);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header area with breadcrumbs */}
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">
            <Link href="/claims" className="hover:text-blue-500">Claims Queue</Link> / 
            <span className="mx-1">Claim View</span>
            {activeTab !== "Policy & Member" && (
              <>
                <span className="mx-1">/</span>
                <Link href={`/claims/${claimId}`} className="hover:text-blue-500">Policy & Member</Link>
              </>
            )}
            {selectedDocument && (
              <>
                <span className="mx-1">/</span>
                <span>Documents</span>
              </>
            )}
          </div>
        </div>

        {/* Main tabs navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-6">
            <button 
              className={`pb-2 ${activeTab === "Policy & Member" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Policy & Member")}
            >
              Policy & Member
            </button>
            <button 
              className={`pb-2 ${activeTab === "Claim" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Claim")}
            >
              Claim
            </button>
            <button 
              className={`pb-2 ${activeTab === "Medical & Provider" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Medical & Provider")}
            >
              Medical & Provider
            </button>
            <button 
              className={`pb-2 ${activeTab === "Reimbursement" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Reimbursement")}
            >
              Reimbursement
            </button>
            <button 
              className={`pb-2 ${activeTab === "Documents" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Documents")}
            >
              Documents
            </button>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Main content area */}
          <div className={`flex-1 ${showDocumentPanel ? 'mr-4' : ''}`}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Policy & Member Section */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Policy & Member")}>
                <div className="flex items-center">
                  <div className="mr-2 w-5 h-5 flex-shrink-0">
                    {expandedSections.includes("Policy & Member") ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                    )}
                  </div>
                  <h3 className="text-base font-medium">Policy & Member</h3>
                </div>
              </div>
              
              {expandedSections.includes("Policy & Member") && (
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <span className="uppercase text-xs font-medium text-gray-500">POLICY NUMBER</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={claimDetails.policyNumber}
                        readOnly
                        className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                      />
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                        <span className="uppercase text-xs font-medium text-gray-500">POLICY HOLDER NAME</span>
                      </div>
                      <div className="relative mt-2">
                        <input
                          type="text"
                          value={claimDetails.patientName}
                          readOnly
                          className="w-full p-2 pr-10 border border-red-300 rounded-lg bg-white text-gray-900"
                        />
                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-red-500 mt-1">Conflicting info from different sources</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <span className="uppercase text-xs font-medium text-gray-500">ID / PASSPORT NUMBER:</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={claimDetails.idNumber}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="uppercase text-xs font-medium text-gray-500">POLICY EFFECTIVE DATE</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-400"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="uppercase text-xs font-medium text-gray-500">PLAN NAME</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Text"
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-400"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="uppercase text-xs font-medium text-gray-500">HAS OTHER INSURANCE</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md"
                      >
                        Yes
                      </button>
                      <button 
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-500 font-medium rounded-md"
                      >
                        No
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="uppercase text-xs font-medium text-gray-500">OTHER INSURANCE COMPANY</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={claimDetails.idNumber}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="uppercase text-xs font-medium text-gray-500">OTHER POLICY NUMBER</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="#number"
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Additional Member Information Section */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Additional Member Information")}>
                <div className="flex items-center">
                  <div className="mr-2 w-5 h-5 flex-shrink-0">
                    {expandedSections.includes("Additional Member Information") ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                    )}
                  </div>
                  <h3 className="text-base font-medium">Additional Member Information</h3>
                </div>
              </div>
              
              {expandedSections.includes("Additional Member Information") && (
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="uppercase text-xs font-medium text-gray-500">GENDER</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md"
                      >
                        Male
                      </button>
                      <button 
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-500 font-medium rounded-md"
                      >
                        Female
                      </button>
                      <button 
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-500 font-medium rounded-md"
                      >
                        Other
                      </button>
                    </div>
                    
                    {/* Add more additional member fields here */}
                  </div>
                </div>
              )}
              
              {/* Additional sections would be added here (Claim, Medical & Provider, etc.) */}
            </div>
          </div>
          
          {/* Document panel - shown when a document is selected */}
          {showDocumentPanel && (
            <div className="w-1/2 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={closeDocumentPanel}
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <ArrowUturnLeftIcon className="h-4 w-4 mr-1" />
                  Back
                </button>
                {/* Instead of Close button, you can use the Back button as in the design */}
              </div>
              
              {selectedDocument && (
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Source Document - Claim Form</h3>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="mb-4">
                        <img src="/images/claim-form-placeholder.png" alt="Claim Form" className="w-full h-auto" />
                      </div>
                      
                      <div className="bg-red-100 p-2 text-red-700 rounded flex items-center">
                        <span className="font-medium mr-2">Member Name</span>
                        <span className="bg-white px-2 py-1 rounded">{claimDetails.patientName}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Supporting Document - Invoice</h3>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <img src="/images/invoice-placeholder.png" alt="Invoice" className="w-full h-auto" />
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "Documents" && !selectedDocument && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Documents</h3>
                    <div className="flex space-x-2">
                      <button className="btn-primary flex items-center">
                        <span>Request Documents</span>
                      </button>
                      <button className="btn-secondary flex items-center">
                        <span>Filter</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Uploaded by
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Edited
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {claimDetails.documents.map((document) => (
                          <tr 
                            key={document.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleDocumentClick(document.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                                <div className="text-sm font-medium text-gray-900">{document.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xs font-medium">
                                  {document.uploadedBy.charAt(0)}
                                </div>
                                <div className="ml-2 text-sm text-gray-900">{document.uploadedBy}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {document.lastEdited}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 border border-gray-200 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                      <DocumentTextIcon className="h-6 w-6" />
                    </div>
                    <p className="text-gray-700 mb-1">Click or drag missing documents to this area to upload</p>
                    <p className="text-gray-500 text-sm">Support for a single or bulk upload.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
