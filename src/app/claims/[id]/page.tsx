"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

// Import our new components
import MultiSourceField from "@/components/claims/MultiSourceField";
import DocumentPanel from "@/components/claims/DocumentPanel";
import ConflictResolutionModal from "@/components/claims/ConflictResolutionModal";

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
    ],
    policyNumber: [
      { value: "THB9876543", source: "Database", confidence: 98, documentId: null }
    ]
  }
};

export default function ClaimDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("Policy & Member");
  const [showDocumentPanel, setShowDocumentPanel] = useState(true); // Always show document panel by default
  const [selectedDocument, setSelectedDocument] = useState<string | null>("doc1"); // Default to first document
  const [expandedSections, setExpandedSections] = useState<string[]>(["Policy & Member"]);
  const [selectedField, setSelectedField] = useState<string | null>("policyHolderName"); // Track which field is selected
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
  };
  
  const handleFieldSelect = (fieldName: string) => {
    setSelectedField(fieldName);
    
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
  
  const handleResolveConflict = (selectedSource: any) => {
    // In a real app, this would update the state or send to API
    console.log("Selected source:", selectedSource);
    // Close the modal after resolution
    setShowConflictModal(false);
  };
  
  // Get active field sources for the document panel
  const getActiveFieldSources = () => {
    if (!selectedField || !claimDetails.fieldSources[selectedField]) {
      return [];
    }
    return claimDetails.fieldSources[selectedField];
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
                        <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">DB</span>
                        <span className="text-xs font-medium text-green-500">98%</span>
                      </div>
                    </div>
                    
                    <MultiSourceField
                      fieldName="policyHolderName"
                      label="POLICY HOLDER NAME"
                      value={claimDetails.patientName}
                      sources={claimDetails.fieldSources.policyHolderName}
                      isSelected={selectedField === "policyHolderName"}
                      onSelect={() => handleFieldSelect("policyHolderName")}
                      onShowConflictModal={toggleConflictModal}
                    />
                    
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
                        <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">DB</span>
                        <span className="text-xs font-medium text-green-500">98%</span>
                      </div>
                    </div>
                    
                    <MultiSourceField
                      fieldName="diagnosisCode"
                      label="DIAGNOSIS CODE"
                      value={claimDetails.fieldSources.diagnosisCode[0].value}
                      sources={claimDetails.fieldSources.diagnosisCode}
                      isSelected={selectedField === "diagnosisCode"}
                      onSelect={() => handleFieldSelect("diagnosisCode")}
                      onShowConflictModal={toggleConflictModal}
                    />
                    
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
                        value="AIA Thailand"
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
          
          {/* Document panel - using our new component */}
          {showDocumentPanel && (
            <div className="w-2/5 ml-4">
              <DocumentPanel
                selectedDocument={selectedDocument}
                selectedField={selectedField}
                documents={claimDetails.documents}
                fieldSources={getActiveFieldSources()}
                onClose={closeDocumentPanel}
                onDocumentClick={handleDocumentClick}
              />
            </div>
          )}
        </div>
        
        {/* Conflict resolution modal - using our new component */}
        {showConflictModal && selectedField && claimDetails.fieldSources[selectedField] && (
          <ConflictResolutionModal
            fieldName={selectedField}
            sources={claimDetails.fieldSources[selectedField]}
            onClose={toggleConflictModal}
            onResolve={handleResolveConflict}
          />
        )}
      </div>
    </AppLayout>
  );
}
