"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  DocumentTextIcon,
  DocumentMagnifyingGlassIcon,
  ArrowUturnLeftIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Import our utility functions
import { formatDate, formatCurrency } from "@/utils/formatters";

// Example of real claim data that might come from the dashboard
const claimData = {
  id: "CLM-23456-789",
  status: "Pending",
  submissionDate: "2025-03-15T14:30:00Z",
  memberName: "John Smith",
  memberID: "MEM-12345",
  policyNumber: "POL-987654",
  provider: {
    name: "City Hospital Medical Center",
    id: "PRV-54321",
    networkStatus: "In-Network",
  },
  services: [
    {
      code: "99213",
      description: "Office visit, established patient (15-25 min)",
      date: "2025-03-10T09:15:00Z",
      amount: 125.00
    },
    {
      code: "85027",
      description: "Complete blood count (CBC)",
      date: "2025-03-10T09:45:00Z",
      amount: 35.50
    }
  ],
  diagnosis: [
    {
      code: "J45.909",
      description: "Unspecified asthma, uncomplicated",
      confidence: 95,
      source: "Medical Report"
    },
    {
      code: "R05",
      description: "Cough",
      confidence: 85,
      source: "Claim Form"
    }
  ],
  totalAmount: 160.50,
  documents: [
    { id: "doc1", name: "Claim Form", type: "Source Document", uploadedBy: "Online Portal", lastEdited: "2025-03-15" },
    { id: "doc2", name: "Medical Report", type: "Supporting Document", uploadedBy: "Provider Upload", lastEdited: "2025-03-11" },
    { id: "doc3", name: "Invoice", type: "Supporting Document", uploadedBy: "Provider Upload", lastEdited: "2025-03-11" },
    { id: "doc4", name: "Insurance Card Copy", type: "Supporting Document", uploadedBy: "Member Upload", lastEdited: "2025-03-15" },
  ],
  conflicts: [
    {
      field: "memberName",
      values: [
        { value: "John Smith", source: "Database", confidence: 98, documentId: null },
        { value: "John M. Smith", source: "Claim Form", confidence: 85, documentId: "doc1" },
        { value: "J. Smith", source: "Invoice", confidence: 75, documentId: "doc3" }
      ]
    },
    {
      field: "serviceDate",
      values: [
        { value: "2025-03-10", source: "Claim Form", confidence: 90, documentId: "doc1" },
        { value: "2025-03-11", source: "Invoice", confidence: 85, documentId: "doc3" }
      ]
    },
    {
      field: "diagnosisCode",
      values: [
        { value: "J45.909", source: "Medical Report", confidence: 95, documentId: "doc2" },
        { value: "J45.901", source: "Claim Form", confidence: 80, documentId: "doc1" }
      ]
    }
  ]
};

export default function ClaimDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("Claim Details");
  const [showDocumentPanel, setShowDocumentPanel] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<string | null>("doc1");
  const [expandedSections, setExpandedSections] = useState<string[]>(["Claim Summary", "Member Information"]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [currentConflict, setCurrentConflict] = useState<any>(null);
  const [resolvedFields, setResolvedFields] = useState<Record<string, any>>({});
  
  const claimId = params.id;

  // Effect to simulate loading claim data
  useEffect(() => {
    // In a real app, we would fetch data here
    // For now, we'll just set up initial state based on our mock data
    
    // Find any fields with conflicts and pre-mark them
    const initialResolved: Record<string, any> = {};
    claimData.conflicts.forEach(conflict => {
      // Initially select the highest confidence value
      const highestConfidence = conflict.values.reduce(
        (prev, current) => (current.confidence > prev.confidence) ? current : prev,
        conflict.values[0]
      );
      initialResolved[conflict.field] = highestConfidence;
    });
    
    setResolvedFields(initialResolved);
  }, []);

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDocumentClick = (docId: string) => {
    setSelectedDocument(docId);
    setShowDocumentPanel(true);
  };

  const toggleDocumentPanel = () => {
    setShowDocumentPanel(!showDocumentPanel);
  };
  
  const handleFieldSelect = (fieldName: string) => {
    setSelectedField(fieldName);
    
    // Find if this field has conflicts
    const conflict = claimData.conflicts.find(c => c.field === fieldName);
    
    if (conflict) {
      // If there's a relevant document, show it
      const resolvedValue = resolvedFields[fieldName];
      if (resolvedValue && resolvedValue.documentId) {
        setSelectedDocument(resolvedValue.documentId);
      } else if (conflict.values.some(v => v.documentId)) {
        // Otherwise show the first document that has this field
        const firstWithDoc = conflict.values.find(v => v.documentId);
        if (firstWithDoc) {
          setSelectedDocument(firstWithDoc.documentId);
        }
      }
    }
  };
  
  const openConflictModal = (fieldName: string) => {
    const conflict = claimData.conflicts.find(c => c.field === fieldName);
    if (conflict) {
      setCurrentConflict(conflict);
      setShowConflictModal(true);
    }
  };
  
  const handleResolveConflict = (selectedValue: any) => {
    if (currentConflict) {
      setResolvedFields({
        ...resolvedFields,
        [currentConflict.field]: selectedValue
      });
    }
    setShowConflictModal(false);
  };
  
  // Helper function to check if a field has conflicts
  const hasFieldConflicts = (fieldName: string) => {
    return claimData.conflicts.some(c => c.field === fieldName);
  };
  
  // Helper function to get the resolved or highest confidence value for a field
  const getFieldValue = (fieldName: string, defaultValue: string) => {
    if (resolvedFields[fieldName]) {
      return resolvedFields[fieldName].value;
    }
    
    const conflict = claimData.conflicts.find(c => c.field === fieldName);
    if (conflict) {
      // Return the highest confidence value
      const highestConfidence = conflict.values.reduce(
        (prev, current) => (current.confidence > prev.confidence) ? current : prev,
        conflict.values[0]
      );
      return highestConfidence.value;
    }
    
    return defaultValue;
  };
  
  // Helper function to render source indicator
  const renderSourceIndicator = (source: string) => {
    switch(source) {
      case "API":
        return <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">API</span>;
      case "Database":
        return <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">DB</span>;
      case "Claim Form":
      case "Medical Report":
      case "Invoice":
        return <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">DOC</span>;
      default:
        return null;
    }
  };
  
  // Helper function for confidence color
  const getConfidenceClass = (confidence: number) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header with breadcrumbs */}
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">
            <Link href="/claims" className="hover:text-blue-500">Claims Queue</Link> / 
            <span className="mx-1">Claim {claimData.id}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Claim {claimData.id}</h1>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <ClockIcon className="h-3 w-3 mr-1" /> {claimData.status}
              </span>
              <button 
                onClick={toggleDocumentPanel}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <DocumentMagnifyingGlassIcon className="h-4 w-4 mr-1" />
                {showDocumentPanel ? "Hide Documents" : "Show Documents"}
              </button>
            </div>
          </div>
        </div>

        {/* Main tabs navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-6">
            <button 
              className={`pb-2 ${activeTab === "Claim Details" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Claim Details")}
            >
              Claim Details
            </button>
            <button 
              className={`pb-2 ${activeTab === "Documents" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Documents")}
            >
              Documents
            </button>
            <button 
              className={`pb-2 ${activeTab === "Timeline" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Timeline")}
            >
              Timeline
            </button>
            <button 
              className={`pb-2 ${activeTab === "Notes" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Notes")}
            >
              Notes
            </button>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Main content area */}
          <div className={`${showDocumentPanel ? 'w-3/5' : 'flex-1'}`}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Claim Summary Section */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Claim Summary")}>
                <div className="flex items-center">
                  <div className="mr-2 w-5 h-5 flex-shrink-0">
                    {expandedSections.includes("Claim Summary") ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                    )}
                  </div>
                  <h3 className="text-base font-medium">Claim Summary</h3>
                </div>
              </div>
              
              {expandedSections.includes("Claim Summary") && (
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Claim ID</p>
                      <p className="text-sm font-medium">{claimData.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Submission Date</p>
                      <p className="text-sm">{new Date(claimData.submissionDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Status</p>
                      <p className="text-sm">{claimData.status}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Total Amount</p>
                      <p className="text-sm font-medium">${claimData.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Member Information Section */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Member Information")}>
                <div className="flex items-center">
                  <div className="mr-2 w-5 h-5 flex-shrink-0">
                    {expandedSections.includes("Member Information") ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                    )}
                  </div>
                  <h3 className="text-base font-medium">Member Information</h3>
                </div>
              </div>
              
              {expandedSections.includes("Member Information") && (
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Member Name Field with conflict handling */}
                    <div className={`${hasFieldConflicts("memberName") ? "bg-yellow-50 p-3 rounded-lg" : ""}`}>
                      <div className="flex items-center space-x-2">
                        {hasFieldConflicts("memberName") ? (
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                        <span className="uppercase text-xs font-medium text-gray-500">Member Name</span>
                      </div>
                      <div className="relative mt-2" onClick={() => handleFieldSelect("memberName")}>
                        <input
                          type="text"
                          value={getFieldValue("memberName", claimData.memberName)}
                          readOnly
                          className={`w-full p-2 pr-10 border ${selectedField === "memberName" ? "border-blue-500 ring-2 ring-blue-100" : hasFieldConflicts("memberName") ? "border-yellow-300" : "border-gray-300"} rounded-lg bg-white text-gray-900`}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          {hasFieldConflicts("memberName") && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                openConflictModal("memberName");
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                            </button>
                          )}
                          {resolvedFields.memberName && (
                            <>
                              {renderSourceIndicator(resolvedFields.memberName.source)}
                              <span className={`text-xs font-medium ${getConfidenceClass(resolvedFields.memberName.confidence)}`}>
                                {resolvedFields.memberName.confidence}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {hasFieldConflicts("memberName") && (
                        <p className="text-xs text-yellow-600 mt-1 flex items-center">
                          <ExclamationTriangleIcon className="h-3 w-3 mr-1" /> 
                          Multiple values found - click icon to resolve
                        </p>
                      )}
                    </div>
                    
                    {/* Member ID */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="uppercase text-xs font-medium text-gray-500">Member ID</span>
                      </div>
                      <div className="relative mt-2">
                        <input
                          type="text"
                          value={claimData.memberID}
                          readOnly
                          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">DB</span>
                          <span className="text-xs font-medium text-green-500">99%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Policy Number */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="uppercase text-xs font-medium text-gray-500">Policy Number</span>
                      </div>
                      <div className="relative mt-2">
                        <input
                          type="text"
                          value={claimData.policyNumber}
                          readOnly
                          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">DB</span>
                          <span className="text-xs font-medium text-green-500">99%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Provider Information Section */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Provider Information")}>
                <div className="flex items-center">
                  <div className="mr-2 w-5 h-5 flex-shrink-0">
                    {expandedSections.includes("Provider Information") ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                    )}
                  </div>
                  <h3 className="text-base font-medium">Provider Information</h3>
                </div>
              </div>
              
              {expandedSections.includes("Provider Information") && (
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="uppercase text-xs font-medium text-gray-500">Provider Name</span>
                      </div>
                      <div className="relative mt-2">
                        <input
                          type="text"
                          value={claimData.provider.name}
                          readOnly
                          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="uppercase text-xs font-medium text-gray-500">Provider ID</span>
                      </div>
                      <div className="relative mt-2">
                        <input
                          type="text"
                          value={claimData.provider.id}
                          readOnly
                          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="uppercase text-xs font-medium text-gray-500">Network Status</span>
                      </div>
                      <div className="relative mt-2">
                        <input
                          type="text"
                          value={claimData.provider.networkStatus}
                          readOnly
                          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Service Details Section */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Service Details")}>
                <div className="flex items-center">
                  <div className="mr-2 w-5 h-5 flex-shrink-0">
                    {expandedSections.includes("Service Details") ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                    )}
                  </div>
                  <h3 className="text-base font-medium">Service Details</h3>
                </div>
              </div>
              
              {expandedSections.includes("Service Details") && (
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Service Date Field with conflict handling */}
                    <div className={`${hasFieldConflicts("serviceDate") ? "bg-yellow-50 p-3 rounded-lg" : ""}`}>
                      <div className="flex items-center space-x-2">
                        {hasFieldConflicts("serviceDate") ? (
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                        <span className="uppercase text-xs font-medium text-gray-500">Service Date</span>
                      </div>
                      <div className="relative mt-2" onClick={() => handleFieldSelect("serviceDate")}>
                        <input
                          type="text"
                          value={getFieldValue("serviceDate", new Date(claimData.services[0].date).toLocaleDateString())}
                          readOnly
                          className={`w-full p-2 pr-10 border ${selectedField === "serviceDate" ? "border-blue-500 ring-2 ring-blue-100" : hasFieldConflicts("serviceDate") ? "border-yellow-300" : "border-gray-300"} rounded-lg bg-white text-gray-900`}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          {hasFieldConflicts("serviceDate") && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                openConflictModal("serviceDate");
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                            </button>
                          )}
                          {resolvedFields.serviceDate && (
                            <>
                              {renderSourceIndicator(resolvedFields.serviceDate.source)}
                              <span className={`text-xs font-medium ${getConfidenceClass(resolvedFields.serviceDate.confidence)}`}>
                                {resolvedFields.serviceDate.confidence}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {hasFieldConflicts("serviceDate") && (
                        <p className="text-xs text-yellow-600 mt-1 flex items-center">
                          <ExclamationTriangleIcon className="h-3 w-3 mr-1" /> 
                          Multiple values found - click icon to resolve
                        </p>
                      )}
                    </div>
                    
                    {/* Service details table */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Services</h4>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {claimData.services.map((service, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{service.code}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{service.description}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${service.amount.toFixed(2)}</td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50">
                              <td colSpan={2} className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">Total Amount:</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${claimData.totalAmount.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Diagnosis Section */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Diagnosis")}>
                <div className="flex items-center">
                  <div className="mr-2 w-5 h-5 flex-shrink-0">
                    {expandedSections.includes("Diagnosis") ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                    )}
                  </div>
                  <h3 className="text-base font-medium">Diagnosis</h3>
                </div>
              </div>
              
              {expandedSections.includes("Diagnosis") && (
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Diagnosis Code Field with conflict handling */}
                    <div className={`${hasFieldConflicts("diagnosisCode") ? "bg-yellow-50 p-3 rounded-lg" : ""}`}>
                      <div className="flex items-center space-x-2">
                        {hasFieldConflicts("diagnosisCode") ? (
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                        <span className="uppercase text-xs font-medium text-gray-500">Primary Diagnosis Code</span>
                      </div>
                      <div className="relative mt-2" onClick={() => handleFieldSelect("diagnosisCode")}>
                        <input
                          type="text"
                          value={getFieldValue("diagnosisCode", claimData.diagnosis[0].code)}
                          readOnly
                          className={`w-full p-2 pr-10 border ${selectedField === "diagnosisCode" ? "border-blue-500 ring-2 ring-blue-100" : hasFieldConflicts("diagnosisCode") ? "border-yellow-300" : "border-gray-300"} rounded-lg bg-white text-gray-900`}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          {hasFieldConflicts("diagnosisCode") && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                openConflictModal("diagnosisCode");
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                            </button>
                          )}
                          {resolvedFields.diagnosisCode && (
                            <>
                              {renderSourceIndicator(resolvedFields.diagnosisCode.source)}
                              <span className={`text-xs font-medium ${getConfidenceClass(resolvedFields.diagnosisCode.confidence)}`}>
                                {resolvedFields.diagnosisCode.confidence}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {hasFieldConflicts("diagnosisCode") && (
                        <p className="text-xs text-yellow-600 mt-1 flex items-center">
                          <ExclamationTriangleIcon className="h-3 w-3 mr-1" /> 
                          Multiple values found - click icon to resolve
                        </p>
                      )}
                    </div>
                    
                    {/* Diagnosis description */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="uppercase text-xs font-medium text-gray-500">Diagnosis Description</span>
                      </div>
                      <div className="relative mt-2">
                        <input
                          type="text"
                          value={claimData.diagnosis[0].description}
                          readOnly
                          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        />
                      </div>
                    </div>
                    
                    {/* Secondary diagnoses */}
                    {claimData.diagnosis.length > 1 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Secondary Diagnoses</h4>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {claimData.diagnosis.slice(1).map((diagnosis, idx) => (
                                <tr key={idx}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{diagnosis.code}</td>
                                  <td className="px-4 py-3 text-sm text-gray-500">{diagnosis.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Action buttons at bottom */}
              <div className="p-4 flex justify-end space-x-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md">
                  Request Additional Info
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md">
                  Complete Registration
                </button>
              </div>
            </div>
          </div>
          
          {/* Document panel */}
          {showDocumentPanel && (
            <div className="w-2/5 ml-4">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">Document View</h3>
                  <button 
                    onClick={toggleDocumentPanel}
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <ArrowUturnLeftIcon className="h-4 w-4 mr-1" />
                    Close
                  </button>
                </div>
                
                {selectedField && currentConflict && (
                  <div className="mb-4 border-b border-gray-200 pb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Field Sources</h4>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      {currentConflict.values.map((source: any, idx: number) => (
                        <div 
                          key={idx}
                          className={`flex items-center justify-between p-2 rounded ${source.confidence >= 90 ? "bg-green-50" : source.confidence >= 75 ? "bg-yellow-50" : "bg-red-50"}`}
                        >
                          <div className="flex items-center">
                            <div className="mr-2">
                              <input 
                                type="radio" 
                                name="selectedSource" 
                                checked={resolvedFields[currentConflict.field]?.value === source.value} 
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
                  <div className="flex-1 overflow-auto">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        {claimData.documents.find(d => d.id === selectedDocument)?.type} - {claimData.documents.find(d => d.id === selectedDocument)?.name}
                      </h3>
                      
                      {/* Document viewer with extraction highlights */}
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="mb-4 relative h-96 bg-white border border-gray-200 rounded">
                          {/* Mock document - in real app, this would be the actual document */}
                          <div className="p-4">
                            <div className="text-center mb-6">
                              <h4 className="text-lg font-bold">{claimData.documents.find(d => d.id === selectedDocument)?.name}</h4>
                              <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                            </div>
                            
                            {selectedDocument === "doc1" && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Patient Name:</p>
                                    <p className={`text-sm ${selectedField === "memberName" ? "bg-yellow-200 px-1" : ""}`}>
                                      John M. Smith
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Member ID:</p>
                                    <p className="text-sm">MEM-12345</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Service Date:</p>
                                    <p className={`text-sm ${selectedField === "serviceDate" ? "bg-yellow-200 px-1" : ""}`}>
                                      2025-03-10
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Diagnosis:</p>
                                    <p className={`text-sm ${selectedField === "diagnosisCode" ? "bg-yellow-200 px-1" : ""}`}>
                                      J45.901 - Asthma
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="mt-4">
                                  <p className="text-sm font-medium">Services:</p>
                                  <table className="w-full text-sm mt-1">
                                    <thead className="bg-gray-100">
                                      <tr>
                                        <th className="px-2 py-1 text-left">Code</th>
                                        <th className="px-2 py-1 text-left">Description</th>
                                        <th className="px-2 py-1 text-right">Amount</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="px-2 py-1">99213</td>
                                        <td className="px-2 py-1">Office visit</td>
                                        <td className="px-2 py-1 text-right">$125.00</td>
                                      </tr>
                                      <tr>
                                        <td className="px-2 py-1">85027</td>
                                        <td className="px-2 py-1">CBC</td>
                                        <td className="px-2 py-1 text-right">$35.50</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                            
                            {selectedDocument === "doc2" && (
                              <div className="space-y-4">
                                <div className="text-lg font-medium mb-2">Medical Report</div>
                                <p className="text-sm mb-4">Patient: John Smith was seen on March 10, 2025 for respiratory symptoms.</p>
                                
                                <div>
                                  <p className="text-sm font-medium">Assessment:</p>
                                  <p className="text-sm">
                                    Patient presents with wheezing, shortness of breath, and cough. 
                                    Lung examination shows scattered wheezes. Peak flow measurements reduced.
                                  </p>
                                  
                                  <p className="text-sm font-medium mt-4">Diagnosis:</p>
                                  <p className={`text-sm ${selectedField === "diagnosisCode" ? "bg-yellow-200 px-1" : ""}`}>
                                    J45.909 - Unspecified asthma, uncomplicated
                                  </p>
                                  <p className="text-sm">Secondary: R05 - Cough</p>
                                  
                                  <p className="text-sm font-medium mt-4">Treatment Plan:</p>
                                  <p className="text-sm">Prescribed albuterol inhaler for acute symptoms and advised to follow up in 2 weeks.</p>
                                </div>
                              </div>
                            )}
                            
                            {selectedDocument === "doc3" && (
                              <div className="space-y-4">
                                <div className="text-lg font-medium mb-2">Invoice</div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Patient:</p>
                                    <p className={`text-sm ${selectedField === "memberName" ? "bg-yellow-200 px-1" : ""}`}>
                                      J. Smith
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Date:</p>
                                    <p className={`text-sm ${selectedField === "serviceDate" ? "bg-yellow-200 px-1" : ""}`}>
                                      2025-03-11
                                    </p>
                                  </div>
                                </div>
                                
                                <table className="w-full text-sm mt-4">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="px-2 py-1 text-left">Service</th>
                                      <th className="px-2 py-1 text-left">Code</th>
                                      <th className="px-2 py-1 text-right">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="px-2 py-1">Office Visit (Level 4)</td>
                                      <td className="px-2 py-1">99213</td>
                                      <td className="px-2 py-1 text-right">$125.00</td>
                                    </tr>
                                    <tr>
                                      <td className="px-2 py-1">Complete Blood Count</td>
                                      <td className="px-2 py-1">85027</td>
                                      <td className="px-2 py-1 text-right">$35.50</td>
                                    </tr>
                                    <tr className="border-t">
                                      <td colSpan={2} className="px-2 py-1 font-medium">Total</td>
                                      <td className="px-2 py-1 text-right font-medium">$160.50</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Document list at bottom */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Documents</h4>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {claimData.documents.map((document) => (
                            <tr 
                              key={document.id} 
                              className={`hover:bg-gray-50 cursor-pointer ${selectedDocument === document.id ? 'bg-blue-50' : ''}`}
                              onClick={() => handleDocumentClick(document.id)}
                            >
                              <td className="px-4 py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <DocumentTextIcon className="h-4 w-4 text-blue-500 mr-2" />
                                  <div className="text-sm font-medium text-gray-900">{document.name}</div>
                                </div>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{document.type}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{document.lastEdited}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Conflict resolution modal */}
        {showConflictModal && currentConflict && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Resolve Field Conflict</h3>
                <button 
                  onClick={() => setShowConflictModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Multiple values were found for the <span className="font-medium">{currentConflict.field}</span> field. Please select the correct value:
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                {currentConflict.values.map((value: any, idx: number) => (
                  <div 
                    key={idx} 
                    className={`flex items-center border ${resolvedFields[currentConflict.field]?.value === value.value ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} rounded-lg p-3 hover:bg-gray-50 cursor-pointer`}
                    onClick={() => handleResolveConflict(value)}
                  >
                    <input 
                      type="radio" 
                      name="conflictResolution" 
                      checked={resolvedFields[currentConflict.field]?.value === value.value}
                      onChange={() => handleResolveConflict(value)}
                      className="h-4 w-4 text-blue-600 mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{value.value}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        {renderSourceIndicator(value.source)}
                        <span className="ml-1">{value.source}</span>
                        <span className={`ml-2 text-xs font-medium ${getConfidenceClass(value.confidence)}`}>
                          {value.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowConflictModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowConflictModal(false)}
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
