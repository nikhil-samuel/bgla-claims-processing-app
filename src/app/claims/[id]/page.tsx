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
  CalendarIcon,
  ExclamationTriangleIcon,
  DocumentMagnifyingGlassIcon,
  DocumentDuplicateIcon
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
  ],
  
  // New mock data for multi-source conflicts
  fieldSources: {
    policyHolderName: [
      { value: "Somchai Jaidee", source: "API", confidence: 95, documentId: null },
      { value: "Somchai J.", source: "Claim Form", confidence: 85, documentId: "doc1" },
      { value: "S. Jaidee", source: "Invoice", confidence: 70, documentId: "doc2" }
    ],
    idNumber: [
      { value: "1-1022-33445-67-8", source: "Database", confidence: 98, documentId: null }
    ],
    diagnosisCode: [
      { value: "J30.1", source: "Claim Form", confidence: 87, documentId: "doc1" },
      { value: "J30.2", source: "Medical Report", confidence: 92, documentId: "doc3" }
    ]
  }
};

export default function ClaimDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("Policy & Member");
  const [showDocumentPanel, setShowDocumentPanel] = useState(true); // Always show document panel by default
  const [selectedDocument, setSelectedDocument] = useState<string | null>("doc1"); // Default to first document
  const [expandedSections, setExpandedSections] = useState<string[]>(["Policy & Member"]);
  const [selectedField, setSelectedField] = useState<string | null>("policyHolderName"); // Track which field is selected
  const [activeFieldSources, setActiveFieldSources] = useState<any[]>([]); // Sources for the selected field
  const [showConflictModal, setShowConflictModal] = useState(false);
  
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
  
  const handleFieldSelect = (fieldName: string) => {
    setSelectedField(fieldName);
    // Update the active sources for this field
    if (claimDetails.fieldSources[fieldName]) {
      setActiveFieldSources(claimDetails.fieldSources[fieldName]);
    } else {
      setActiveFieldSources([]);
    }
    
    // If there is a document associated with this field, show it
    const sourcesWithDocs = claimDetails.fieldSources[fieldName]?.filter(s => s.documentId);
    if (sourcesWithDocs && sourcesWithDocs.length > 0) {
      setSelectedDocument(sourcesWithDocs[0].documentId);
      setShowDocumentPanel(true);
    }
  };
  
  const toggleConflictModal = () => {
    setShowConflictModal(!showConflictModal);
  };
  
  // Helper function to render source indicators
  const renderSourceIndicator = (source: string) => {
    switch(source) {
      case "API":
        return <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">API</span>;
      case "Database":
        return <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">DB</span>;
      case "Claim Form":
      case "Invoice":
      case "Medical Report":
        return <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">DOC</span>;
      default:
        return null;
    }
  };
  
  // Helper function to get confidence class
  const getConfidenceClass = (confidence: number) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 75) return "text-yellow-500";
    return "text-red-500";
  };
  
  // Helper function to check if field has conflicts
  const hasConflicts = (fieldName: string) => {
    const sources = claimDetails.fieldSources[fieldName];
    if (!sources || sources.length <= 1) return false;
    
    // Check if values are different
    const firstValue = sources[0].value;
    return sources.some(s => s.value !== firstValue);
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
          {/* Main content area - reduced width */}
          <div className={`${showDocumentPanel ? 'w-3/5' : 'flex-1'}`}>
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
                    <div className="relative" onClick={() => handleFieldSelect("policyNumber")}>
                      <input
                        type="text"
                        value={claimDetails.policyNumber}
                        readOnly
                        className={`w-full p-2 pr-10 border ${selectedField === "policyNumber" ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-300"} rounded-lg bg-white text-gray-900`}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        {renderSourceIndicator("Database")}
                        <span className="text-xs font-medium text-green-500">98%</span>
                      </div>
                    </div>
                    
                    <div className={`${hasConflicts("policyHolderName") ? "bg-yellow-50" : ""} rounded-lg p-4`}>
                      <div className="flex items-center space-x-2">
                        {hasConflicts("policyHolderName") ? (
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                        <span className="uppercase text-xs font-medium text-gray-500">POLICY HOLDER NAME</span>
                      </div>
                      <div className="relative mt-2" onClick={() => handleFieldSelect("policyHolderName")}>
                        <input
                          type="text"
                          value={claimDetails.patientName}
                          readOnly
                          className={`w-full p-2 pr-10 border ${selectedField === "policyHolderName" ? "border-blue-500 ring-2 ring-blue-100" : hasConflicts("policyHolderName") ? "border-yellow-300" : "border-gray-300"} rounded-lg bg-white text-gray-900`}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleConflictModal();
                            }}
                            className={`${hasConflicts("policyHolderName") ? "block" : "hidden"} p-1 hover:bg-gray-100 rounded`}
                          >
                            <DocumentDuplicateIcon className="h-4 w-4 text-yellow-500" />
                          </button>
                          {renderSourceIndicator("API")}
                          <span className="text-xs font-medium text-green-500">95%</span>
                        </div>
                      </div>
                      {hasConflicts("policyHolderName") && (
                        <p className="text-xs text-yellow-600 mt-1 flex items-center">
                          <ExclamationTriangleIcon className="h-3 w-3 mr-1" /> 
                          Different values from multiple sources
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <span className="uppercase text-xs font-medium text-gray-500">ID / PASSPORT NUMBER:</span>
                    </div>
                    <div className="relative" onClick={() => handleFieldSelect("idNumber")}>
                      <input
                        type="text"
                        value={claimDetails.idNumber}
                        readOnly
                        className={`w-full p-2 border ${selectedField === "idNumber" ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-300"} rounded-lg bg-white text-gray-900`}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        {renderSourceIndicator("Database")}
                        <span className="text-xs font-medium text-green-500">98%</span>
                      </div>
                    </div>
                    
                    <div className={`${hasConflicts("diagnosisCode") ? "bg-yellow-50" : ""} rounded-lg p-4`}>
                      <div className="flex items-center space-x-2">
                        {hasConflicts("diagnosisCode") ? (
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                        <span className="uppercase text-xs font-medium text-gray-500">DIAGNOSIS CODE</span>
                      </div>
                      <div className="relative mt-2" onClick={() => handleFieldSelect("diagnosisCode")}>
                        <input
                          type="text"
                          value="J30.2" // Using the highest confidence value
                          readOnly
                          className={`w-full p-2 pr-10 border ${selectedField === "diagnosisCode" ? "border-blue-500 ring-2 ring-blue-100" : hasConflicts("diagnosisCode") ? "border-yellow-300" : "border-gray-300"} rounded-lg bg-white text-gray-900`}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleConflictModal();
                            }}
                            className={`${hasConflicts("diagnosisCode") ? "block" : "hidden"} p-1 hover:bg-gray-100 rounded`}
                          >
                            <DocumentDuplicateIcon className="h-4 w-4 text-yellow-500" />
                          </button>
                          {renderSourceIndicator("Medical Report")}
                          <span className="text-xs font-medium text-green-500">92%</span>
                        </div>
                      </div>
                      {hasConflicts("diagnosisCode") && (
                        <p className="text-xs text-yellow-600 mt-1 flex items-center">
                          <ExclamationTriangleIcon className="h-3 w-3 mr-1" /> 
                          Different values from multiple sources
                        </p>
                      )}
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
          
          {/* Document panel - always visible */}
          {showDocumentPanel && (
            <div className="w-2/5 bg-white border border-gray-200 rounded-lg shadow-sm p-4 ml-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">Document View</h3>
                <button 
                  onClick={closeDocumentPanel}
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <ArrowUturnLeftIcon className="h-4 w-4 mr-1" />
                  Close
                </button>
              </div>
              
              {selectedField && activeFieldSources.length > 0 && (
                <div className="mb-4 border-b border-gray-200 pb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Field Sources</h4>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    {activeFieldSources.map((source, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded ${source.confidence >= 90 ? "bg-green-50" : source.confidence >= 75 ? "bg-yellow-50" : "bg-red-50"}`}
                      >
                        <div className="flex items-center">
                          <div className="mr-2">
                            <input 
                              type="radio" 
                              name="selectedSource" 
                              checked={idx === 0} // First one is selected by default
                              readOnly
                              className="h-4 w-4 text-blue-600"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{source.value}</p>
                            <div className="flex items-center">
                              {renderSourceIndicator(source.source)}
                              <span className="ml-1 text-xs text-gray-500">{source.source}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${getConfidenceClass(source.confidence)}`}>
                          {source.confidence}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedDocument && (
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Source Document - {claimDetails.documents.find(d => d.id === selectedDocument)?.name}
                    </h3>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="mb-4 relative">
                        <img src="/images/claim-form-placeholder.png" alt="Claim Form" className="w-full h-auto" />
                        
                        {/* Highlight extraction area if field is selected */}
                        {selectedField === "policyHolderName" && selectedDocument === "doc1" && (
                          <div className="absolute top-1/4 left-1/4 w-1/2 h-12 border-2 border-yellow-500 bg-yellow-100 bg-opacity-50 flex items-center justify-center">
                            <span className="text-xs font-medium text-yellow-800">Extracted: Somchai J.</span>
                          </div>
                        )}
                        
                        {selectedField === "diagnosisCode" && selectedDocument === "doc3" && (
                          <div className="absolute top-1/3 left-1/3 w-1/3 h-10 border-2 border-yellow-500 bg-yellow-100 bg-opacity-50 flex items-center justify-center">
                            <span className="text-xs font-medium text-yellow-800">Extracted: J30.2</span>
                          </div>
                        )}
                      </div>
                      
                      {selectedField === "policyHolderName" && selectedDocument === "doc1" && (
                        <div className="bg-yellow-100 p-2 text-yellow-700 rounded flex items-center">
                          <span className="font-medium mr-2">Member Name:</span>
                          <span className="bg-white px-2 py-1 rounded">Somchai J.</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {activeTab === "Documents" && !selectedField && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Supporting Document - Invoice</h3>
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <img src="/images/invoice-placeholder.png" alt="Invoice" className="w-full h-auto" />
                      </div>
                    </div>
                  )}
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
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Modal for resolving conflicts */}
        {showConflictModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Resolve Field Conflict</h3>
                <button 
                  onClick={toggleConflictModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  This field has different values from multiple sources. Please select the correct value:
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                {activeFieldSources.map((source, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <input 
                      type="radio" 
                      name="conflictResolution" 
                      checked={idx === 0}
                      className="h-4 w-4 text-blue-600 mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{source.value}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        {renderSourceIndicator(source.source)}
                        <span className="ml-1">{source.source}</span>
                        <span className={`ml-2 text-xs font-medium ${getConfidenceClass(source.confidence)}`}>
                          {source.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={toggleConflictModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={toggleConflictModal}
                  className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md"
                >
                  Apply Resolution
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
