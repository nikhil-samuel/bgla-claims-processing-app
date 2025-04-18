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
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  UserIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

// Mock data for claim details
const claimDetails = {
  id: "#1234ABCTDE",
  patientName: "Somchai Jaidee",
  policyNumber: "THB9876543",
  idNumber: "1-1022-33445-67-8",
  hasOtherInsurance: "Yes",
  gender: "Male",
  planName: "Premium Health Plus",
  policyEffectiveDate: "01/01/2023",
  policyExpiryDate: "31/12/2023",
  dateOfBirth: "15/05/1980",
  
  // Claim details
  claimType: "Outpatient",
  dateOfService: "05/03/2023",
  accidentDate: "N/A",
  isIllness: true,
  isAccident: false,
  submissionDate: "10/03/2023",
  claimStatus: "Pending",
  
  // Medical & Provider details
  diagnosis: "Acute Bronchitis",
  diagnosisCode: "J20.9",
  providerName: "Bangkok General Hospital",
  providerType: "Hospital",
  doctorName: "Dr. Siriwan Panyarat",
  specialty: "General Medicine",
  
  // Reimbursement details
  totalAmount: "15,000 THB",
  coveredAmount: "12,500 THB",
  paymentMethod: "Bank Transfer",
  bankName: "Bangkok Bank",
  accountNumber: "123-4-56789-0",
  paymentStatus: "Pending",
  
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
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
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
    
    // Set default expanded sections based on the tab
    let newExpandedSections: string[] = [];
    
    switch(tab) {
      case "Policy & Member":
        newExpandedSections = ["Policy Information", "Member Information"];
        break;
      case "Claim":
        newExpandedSections = ["Claim Details", "Incident Information"];
        break;
      case "Medical & Provider":
        newExpandedSections = ["Diagnosis Information", "Provider Information"];
        break;
      case "Reimbursement":
        newExpandedSections = ["Payment Details", "Coverage Information"];
        break;
      case "Documents":
        // No sections for Documents tab
        break;
    }
    
    setExpandedSections(newExpandedSections);
  };

  const handleDocumentClick = (docId: string) => {
    setSelectedDocument(docId);
    setShowDocumentPanel(true);
  };

  const closeDocumentPanel = () => {
    setShowDocumentPanel(false);
    setSelectedDocument(null);
  };

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Policy & Member":
        return (
          <>
            {/* Policy Information Section */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Policy Information")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Policy Information") ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Policy Information</h3>
              </div>
            </div>
            
            {expandedSections.includes("Policy Information") && (
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
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">POLICY EFFECTIVE DATE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.policyEffectiveDate}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">POLICY EXPIRY DATE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.policyExpiryDate}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">PLAN NAME</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.planName}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
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
                    <span className="uppercase text-xs font-medium text-gray-500">DATE OF BIRTH</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.dateOfBirth}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  
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
                </div>
              </div>
            )}
          </>
        );
        
      case "Claim":
        return (
          <>
            {/* Claim Details Section */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Claim Details")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Claim Details") ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Claim Details</h3>
              </div>
            </div>
            
            {expandedSections.includes("Claim Details") && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">CLAIM TYPE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.claimType}
                      readOnly
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">CLAIM ID</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.id}
                      readOnly
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">CLAIM SUBMISSION DATE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.submissionDate}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">CLAIM STATUS</span>
                  </div>
                  <div className="relative">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {claimDetails.claimStatus}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Incident Information Section */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Incident Information")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Incident Information") ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Incident Information</h3>
              </div>
            </div>
            
            {expandedSections.includes("Incident Information") && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">DATE OF SERVICE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.dateOfService}
                      readOnly
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">ILLNESS</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      type="button"
                      className={`px-4 py-2 ${claimDetails.isIllness ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} font-medium rounded-md`}
                    >
                      Yes
                    </button>
                    <button 
                      type="button"
                      className={`px-4 py-2 ${!claimDetails.isIllness ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} font-medium rounded-md`}
                    >
                      No
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">ACCIDENT</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      type="button"
                      className={`px-4 py-2 ${claimDetails.isAccident ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} font-medium rounded-md`}
                    >
                      Yes
                    </button>
                    <button 
                      type="button"
                      className={`px-4 py-2 ${!claimDetails.isAccident ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'} font-medium rounded-md`}
                    >
                      No
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">ACCIDENT DATE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.accidentDate}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
          </>
        );
        
      case "Medical & Provider":
        return (
          <>
            {/* Diagnosis Information Section */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Diagnosis Information")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Diagnosis Information") ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Diagnosis Information</h3>
              </div>
            </div>
            
            {expandedSections.includes("Diagnosis Information") && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">DIAGNOSIS</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.diagnosis}
                      readOnly
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">DIAGNOSIS CODE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.diagnosisCode}
                      readOnly
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">SYMPTOMS DESCRIPTION</span>
                  </div>
                  <div className="relative">
                    <textarea
                      value="Patient presented with cough, sore throat, and low-grade fever for 3 days. Chest examination revealed bronchial breath sounds."
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 h-24"
                    />
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
                  <div className="flex items-center space-x-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-blue-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">PROVIDER NAME</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.providerName}
                      readOnly
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">PROVIDER TYPE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.providerType}
                      readOnly
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-5 w-5 text-blue-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">DOCTOR NAME</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.doctorName}
                      readOnly
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">SPECIALTY</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.specialty}
                      readOnly
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        );
        
      case "Reimbursement":
        return (
          <>
            {/* Payment Details Section */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Payment Details")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Payment Details") ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Payment Details</h3>
              </div>
            </div>
            
            {expandedSections.includes("Payment Details") && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">PAYMENT METHOD</span>
                  </div>
                  <div className="relative">
                    <select
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                      defaultValue={claimDetails.paymentMethod}
                      disabled
                    >
                      <option>Bank Transfer</option>
                      <option>Check</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">BANK NAME</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.bankName}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">ACCOUNT NUMBER</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.accountNumber}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-yellow-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">PAYMENT STATUS</span>
                  </div>
                  <div className="relative">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {claimDetails.paymentStatus}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Coverage Information Section */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Coverage Information")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Coverage Information") ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Coverage Information</h3>
              </div>
            </div>
            
            {expandedSections.includes("Coverage Information") && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">TOTAL AMOUNT</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.totalAmount}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">COVERED AMOUNT</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={claimDetails.coveredAmount}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">DEDUCTIBLE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value="1,000 THB"
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">CO-INSURANCE</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value="1,500 THB (10%)"
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        );
        
      case "Documents":
        return (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Documents</h3>
              <div className="flex space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium flex items-center">
                  <span>Request Documents</span>
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium flex items-center">
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
              
              <label
                htmlFor="document-upload"
                className="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Upload Files
                <input
                  id="document-upload"
                  name="document-upload"
                  type="file"
                  multiple
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        );
        
      default:
        return null;
    }
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

        <div className="flex flex-1 justify-center">
          {/* Main content area with 60% width */}
          <div className={`w-3/5 ${showDocumentPanel ? 'mr-4' : ''}`}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {renderTabContent()}
            </div>
          </div>
          
          {/* Document panel - shown when a document is selected */}
          {showDocumentPanel && (
            <div className="w-2/5 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
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
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium flex items-center">
                        <span>Request Documents</span>
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium flex items-center">
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