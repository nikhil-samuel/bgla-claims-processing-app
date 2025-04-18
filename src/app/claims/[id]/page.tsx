"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useI18n } from "@/lib/i18n/i18n-context";
import IcdCodeHighlighter from "@/components/claims/IcdCodeHighlighter";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  ExclamationTriangleIcon
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

// Sample text for document display with ICD codes embedded
const sampleDocumentText = `
DISCHARGE SUMMARY

Patient: Somchai Jaidee
DOB: 15/05/1982
Admission Date: 28/03/2025
Discharge Date: 05/04/2025

DIAGNOSIS:
Primary: Type 2 diabetes mellitus without complications (E11.9)
Secondary: Essential hypertension (I10), Hypercholesterolemia (E78.0)

CLINICAL COURSE:
Patient was admitted with complaints of increased thirst, frequent urination, and fatigue for 2 weeks. Laboratory studies revealed elevated blood glucose levels consistent with type 2 diabetes mellitus (E11.9). Patient was also found to have elevated blood pressure readings consistent with essential hypertension (I10). 

During hospitalization, patient was started on oral hypoglycemic agents and antihypertensive medication. Dietary consultation was provided. Patient responded well to treatment with improved blood glucose levels and stabilized blood pressure.

PROCEDURES:
- None

MEDICATIONS ON DISCHARGE:
1. Metformin 500mg twice daily
2. Lisinopril 10mg once daily
3. Atorvastatin 20mg once daily for hypercholesterolemia (E78.0)

FOLLOW-UP:
Patient to follow up with primary care physician in 1 week and endocrinology in 2 weeks.

RECOMMENDATIONS:
Diet low in sodium and carbohydrates, regular blood glucose monitoring, daily blood pressure checks, and regular physical activity as tolerated.

ATTENDING PHYSICIAN:
Dr. Michael Chen
`;

// Sample text for operation note with ICD and CPT codes
const sampleOperationNote = `
OPERATION NOTE

Patient: Chen Wei
DOB: 03/11/1975
Date of Surgery: 01/04/2025

PREOPERATIVE DIAGNOSIS:
Tear of medial meniscus of knee (M23.2)

POSTOPERATIVE DIAGNOSIS:
Same as preoperative diagnosis

PROCEDURE PERFORMED:
Arthroscopic partial medial meniscectomy, right knee (CPT: 29881)

SURGEON:
Dr. Sarah Johnson

ANESTHESIA:
General

DESCRIPTION OF PROCEDURE:
After obtaining informed consent, the patient was brought to the operating room and placed in supine position. Following general anesthesia, the right lower extremity was prepped and draped in the usual sterile fashion. Standard anterolateral and anteromedial portals were established. Diagnostic arthroscopy revealed a complex tear of the posterior horn of the medial meniscus (M23.2). 

The torn, unstable portion of the meniscus was carefully removed using basket forceps and a motorized shaver, preserving as much of the stable meniscal rim as possible. The knee was thoroughly irrigated, and the portals were closed with nylon sutures. 

The patient tolerated the procedure well and was transferred to the recovery room in stable condition.

ESTIMATED BLOOD LOSS:
Minimal

COMPLICATIONS:
None
`;

export default function ClaimDetails({ params }: { params: { id: string } }) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("Policy & Member");
  const [showDocumentPanel, setShowDocumentPanel] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(["Policy & Member"]);
  const [fieldsWithConfidence, setFieldsWithConfidence] = useState<Record<string, {value: string, confidence: number}>>({
    "policyNumber": { value: claimDetails.policyNumber, confidence: 0.96 },
    "patientName": { value: claimDetails.patientName, confidence: 0.75 },
    "idNumber": { value: claimDetails.idNumber, confidence: 0.93 },
    "hasOtherInsurance": { value: "Yes", confidence: 0.88 },
    "gender": { value: "Male", confidence: 0.97 },
  });
  const [documentText, setDocumentText] = useState("");
  const [selectedIcdCode, setSelectedIcdCode] = useState<{code: string, description: string} | null>(null);
  
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
    
    // Set different sample text based on document type
    if (docId === "doc5") { // Discharge Summary
      setDocumentText(sampleDocumentText);
    } else if (docId === "doc4") { // Operation Note
      setDocumentText(sampleOperationNote);
    } else {
      setDocumentText(`Sample content for document ${docId}`);
    }
  };

  const closeDocumentPanel = () => {
    setShowDocumentPanel(false);
    setSelectedDocument(null);
    setSelectedIcdCode(null);
  };

  const handleIcdCodeSelected = (code: string, description: string) => {
    setSelectedIcdCode({ code, description });
  };

  const getFieldIcon = (fieldName: string) => {
    const confidence = fieldsWithConfidence[fieldName]?.confidence || 0;
    
    if (confidence > 0.9) {
      return <CheckCircleIcon className="h-5 w-5 text-success" />;
    } else if (confidence > 0.8) {
      return <InformationCircleIcon className="h-5 w-5 text-warning" />;
    } else {
      return <XCircleIcon className="h-5 w-5 text-error" />;
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
              {t("claim.policy")}
            </button>
            <button 
              className={`pb-2 ${activeTab === "Claim" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Claim")}
            >
              {t("claim.details")}
            </button>
            <button 
              className={`pb-2 ${activeTab === "Medical & Provider" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Medical & Provider")}
            >
              {t("claim.medical")}
            </button>
            <button 
              className={`pb-2 ${activeTab === "Reimbursement" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Reimbursement")}
            >
              {t("claim.reimbursement")}
            </button>
            <button 
              className={`pb-2 ${activeTab === "Documents" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabClick("Documents")}
            >
              {t("claim.documents")}
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
                  <h3 className="text-base font-medium">{t("claim.policy")}</h3>
                </div>
              </div>
              
              {expandedSections.includes("Policy & Member") && (
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      {getFieldIcon("policyNumber")}
                      <span className="uppercase text-xs font-medium text-gray-500">{t("form.policyNumber")}</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                        {Math.round(fieldsWithConfidence.policyNumber.confidence * 100)}% confident
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={fieldsWithConfidence.policyNumber.value}
                        readOnly
                        className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                      />
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        {getFieldIcon("patientName")}
                        <span className="uppercase text-xs font-medium text-gray-500">{t("form.policyHolder")}</span>
                        <span className="text-xs bg-white px-2 py-0.5 rounded text-red-600">
                          {Math.round(fieldsWithConfidence.patientName.confidence * 100)}% confident
                        </span>
                      </div>
                      <div className="relative mt-2">
                        <input
                          type="text"
                          value={fieldsWithConfidence.patientName.value}
                          readOnly
                          className="w-full p-2 pr-10 border border-red-300 rounded-lg bg-white text-gray-900"
                        />
                        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-red-500 mt-1">{t("error.conflict")}</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" className="flex gap-1 items-center">
                          <MagnifyingGlassIcon className="h-3 w-3" />
                          Find in Documents
                        </Button>
                        <Button size="sm" variant="outline" className="flex gap-1 items-center text-success">
                          <CheckCircleIcon className="h-3 w-3" />
                          Mark as Correct
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getFieldIcon("idNumber")}
                      <span className="uppercase text-xs font-medium text-gray-500">{t("form.idNumber")}</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={fieldsWithConfidence.idNumber.value}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="uppercase text-xs font-medium text-gray-500">{t("form.policyEffective")}</span>
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
                      <span className="uppercase text-xs font-medium text-gray-500">{t("form.planName")}</span>
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
                      {getFieldIcon("hasOtherInsurance")}
                      <span className="uppercase text-xs font-medium text-gray-500">{t("form.otherInsurance")}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md"
                      >
                        {t("form.yes")}
                      </button>
                      <button 
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-500 font-medium rounded-md"
                      >
                        {t("form.no")}
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="uppercase text-xs font-medium text-gray-500">{t("form.otherCompany")}</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Company name"
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="uppercase text-xs font-medium text-gray-500">{t("form.otherPolicy")}</span>
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
                  <h3 className="text-base font-medium">{t("claim.additionalInfo")}</h3>
                </div>
              </div>
              
              {expandedSections.includes("Additional Member Information") && (
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      {getFieldIcon("gender")}
                      <span className="uppercase text-xs font-medium text-gray-500">{t("form.gender")}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md"
                      >
                        {t("form.male")}
                      </button>
                      <button 
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-500 font-medium rounded-md"
                      >
                        {t("form.female")}
                      </button>
                      <button 
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-500 font-medium rounded-md"
                      >
                        {t("form.other")}
                      </button>
                    </div>
                    
                    {/* Add more additional member fields here */}
                  </div>
                </div>
              )}
              
              {/* Add Medical & Provider Section */}
              {activeTab === "Medical & Provider" && (
                <>
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Medical & Provider")}>
                    <div className="flex items-center">
                      <div className="mr-2 w-5 h-5 flex-shrink-0">
                        {expandedSections.includes("Medical & Provider") ? (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                        )}
                      </div>
                      <h3 className="text-base font-medium">{t("claim.medical")}</h3>
                    </div>
                  </div>
                  
                  {expandedSections.includes("Medical & Provider") && (
                    <div className="p-4">
                      <div className="space-y-4">
                        {selectedIcdCode ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">Selected Diagnosis</h4>
                                <div className="mt-2">
                                  <div className="text-sm font-semibold">{selectedIcdCode.code}</div>
                                  <div className="text-sm text-gray-600">{selectedIcdCode.description}</div>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedIcdCode(null)}
                                className="text-gray-500"
                              >
                                Change
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center mb-4 justify-between">
                            <div className="flex items-center">
                              <ExclamationTriangleIcon className="h-5 w-5 text-warning mr-2" />
                              <span className="text-sm text-gray-800">No diagnosis code selected yet</span>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTabClick("Documents")}
                              className="text-primary flex items-center gap-1"
                            >
                              <DocumentTextIcon className="h-4 w-4" />
                              Find in Documents
                            </Button>
                          </div>
                        )}
                        
                        {/* Provider Information */}
                        <div className="mt-6">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="uppercase text-xs font-medium text-gray-500">Provider</span>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              value="City Hospital"
                              readOnly
                              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="uppercase text-xs font-medium text-gray-500">Doctor</span>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            value="Dr. Michael Chen"
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                          />
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="uppercase text-xs font-medium text-gray-500">Start Date</span>
                            </div>
                            <div className="relative">
                              <input
                                type="text"
                                value="28/03/2025"
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                              />
                              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="uppercase text-xs font-medium text-gray-500">End Date</span>
                            </div>
                            <div className="relative">
                              <input
                                type="text"
                                value="05/04/2025"
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                              />
                              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
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
                  {t("action.back")}
                </button>
              </div>
              
              {selectedDocument && (
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {claimDetails.documents.find(d => d.id === selectedDocument)?.name || "Document"}
                    </h3>
                    
                    {/* ICD Code Highlighter */}
                    <IcdCodeHighlighter 
                      documentText={documentText} 
                      onCodeSelected={handleIcdCodeSelected}
                    />
                    
                    {selectedIcdCode && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                            <span className="font-medium text-sm">Diagnosis code selected</span>
                          </div>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="text-success border-success hover:bg-success/10"
                          >
                            Apply to Claim
                          </Button>
                        </div>
                        <div className="mt-2 pl-7">
                          <p className="text-sm"><span className="font-medium">{selectedIcdCode.code}:</span> {selectedIcdCode.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === "Documents" && !selectedDocument && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">{t("documents.title")}</h3>
                    <div className="flex space-x-2">
                      <button className="btn-primary flex items-center">
                        <span>{t("documents.request")}</span>
                      </button>
                      <button className="btn-secondary flex items-center">
                        <span>{t("documents.filter")}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("documents.name")}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("documents.uploadedBy")}
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t("documents.lastEdited")}
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
                    <p className="text-gray-700 mb-1">{t("documents.upload")}</p>
                    <p className="text-gray-500 text-sm">{t("documents.uploadHint")}</p>
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