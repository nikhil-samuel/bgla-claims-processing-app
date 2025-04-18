"use client";

import AppLayout from "@/components/Layout/AppLayout";
import SectionCard from "@/components/ui/SectionCard";
import FormField from "@/components/ui/FormField";
import StatusTag from "@/components/ui/StatusTag";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowUturnLeftIcon, 
  PaperClipIcon, 
  CalendarIcon, 
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Define types for field recommendations
type Recommendation = {
  value: string;
  confidence: number;
};

// Define the allowed field name keys
type FieldName = 'policyHolder' | 'diagnosis';

// Define the type for the fieldRecommendations object
type FieldRecommendations = {
  [key in FieldName]: Recommendation[];
};

// Field recommendations with confidence
const fieldRecommendations: FieldRecommendations = {
  "policyHolder": [
    { value: "John Smith", confidence: 93 },
    { value: "Jon Smith", confidence: 85 },
    { value: "J. Smith", confidence: 72 }
  ],
  "diagnosis": [
    { value: "Acute Bronchitis", confidence: 97 },
    { value: "Upper Respiratory Infection", confidence: 68 },
    { value: "Common Cold", confidence: 54 }
  ],
};

export default function NewClaim() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Policy & Member");
  const [expandedSections, setExpandedSections] = useState<string[]>(["Policy & Member"]);
  const [showDocumentPanel, setShowDocumentPanel] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    claimType: "",
    policyNumber: "THB9876543",
    policyHolderName: fieldRecommendations.policyHolder[0].value,
    idNumber: "1-1022-33445-67-8",
    dateOfService: "",
    providerName: "",
    totalAmount: "",
    description: "",
    diagnosis: fieldRecommendations.diagnosis[0].value,
    isIllness: "yes",
    isAccident: "yes",
    accidentDate: "",
    accidentLocation: "",
    symptoms: "",
    acceptTerms: false,
  });
  
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleFieldClick = (fieldName: string) => {
    setActiveField(fieldName);
    setShowDocumentPanel(true);
    setSelectedDocument("doc1"); // Default to first document
  };

  const closeDocumentPanel = () => {
    setShowDocumentPanel(false);
    setSelectedDocument(null);
    setActiveField(null);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Auto-expand the section related to the tab
    if (!expandedSections.includes(tab)) {
      setExpandedSections([...expandedSections, tab]);
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the form data to your backend here
    console.log({ formData, files });
    
    // Navigate to the success page
    router.push("/claims/submission-successful");
  };

  // Type guard to check if fieldName is a valid key in fieldRecommendations
  const isValidFieldName = (name: string): name is FieldName => {
    return name === 'policyHolder' || name === 'diagnosis';
  };

  // Component for displaying field recommendations
  const FieldRecommendations = ({ fieldName }: { fieldName: string }) => {
    // Only proceed if fieldName is a valid key in fieldRecommendations
    if (!isValidFieldName(fieldName)) return null;
    
    return (
      <div className="mt-1 text-xs">
        {fieldRecommendations[fieldName].map((rec, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-1 rounded-md mb-1 ${index === 0 ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 cursor-pointer'}`}
          >
            <div className="flex items-center">
              {index === 0 && <CheckIcon className="h-3 w-3 text-blue-500 mr-1" />}
              <span>{rec.value}</span>
            </div>
            <div className="font-medium text-gray-500">{rec.confidence}%</div>
          </div>
        ))}
      </div>
    );
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Policy & Member":
        return (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Policy & Member")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Policy & Member") ? (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Policy & Member</h3>
              </div>
            </div>
            
            {expandedSections.includes("Policy & Member") && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">POLICY NUMBER</span>
                  </div>
                  <div className="relative">
                    <input
                      id="policyNumber"
                      name="policyNumber"
                      type="text"
                      value={formData.policyNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                      readOnly
                    />
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <XMarkIcon className="h-5 w-5 text-red-500" />
                      <span className="uppercase text-xs font-medium text-gray-500">POLICY HOLDER NAME</span>
                    </div>
                    <div className="relative mt-2" onClick={() => handleFieldClick("policyHolder")}>
                      <input
                        id="policyHolderName"
                        name="policyHolderName"
                        type="text"
                        value={formData.policyHolderName}
                        onChange={handleInputChange}
                        className="w-full p-2 pr-10 border border-red-300 rounded-lg bg-white text-gray-900"
                      />
                    </div>
                    <FieldRecommendations fieldName="policyHolder" />
                    <p className="text-xs text-red-500 mt-1">Conflicting info from different sources</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">ID / PASSPORT NUMBER:</span>
                  </div>
                  <div className="relative">
                    <input
                      id="idNumber"
                      name="idNumber"
                      type="text"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">HAS OTHER INSURANCE</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      type="button" 
                      className="bg-primary text-white px-4 py-2 rounded font-medium"
                    >
                      Yes
                    </button>
                    <button 
                      type="button" 
                      className="bg-gray-200 text-neutral-secondary px-4 py-2 rounded font-medium"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-4 border-t border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Additional Member Information")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Additional Member Information") ? (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
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
                      className="bg-primary text-white px-4 py-2 rounded font-medium"
                    >
                      Male
                    </button>
                    <button 
                      type="button" 
                      className="bg-gray-200 text-neutral-secondary px-4 py-2 rounded font-medium"
                    >
                      Female
                    </button>
                    <button 
                      type="button" 
                      className="bg-gray-200 text-neutral-secondary px-4 py-2 rounded font-medium"
                    >
                      Other
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">AGE</span>
                  </div>
                  <div className="relative">
                    <input
                      id="age"
                      name="age"
                      type="text"
                      value="54"
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        );
      
      case "Claim":
        return (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Claim Details")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Claim Details") ? (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Claim Details</h3>
              </div>
            </div>
            
            {expandedSections.includes("Claim Details") && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">CLAIM TYPE</span>
                  </div>
                  <div className="relative">
                    <select
                      id="claimType"
                      name="claimType"
                      value={formData.claimType}
                      onChange={handleInputChange}
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                      required
                    >
                      <option value="">Select a claim type</option>
                      <option value="OPD Claim">OPD Claim</option>
                      <option value="IPD Claim">IPD Claim</option>
                      <option value="Dental Claim">Dental Claim</option>
                      <option value="Vision Claim">Vision Claim</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">ILLNESS</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      type="button" 
                      className="bg-primary text-white px-4 py-2 rounded font-medium"
                    >
                      Yes
                    </button>
                    <button 
                      type="button" 
                      className="bg-gray-200 text-neutral-secondary px-4 py-2 rounded font-medium"
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
                      className="bg-primary text-white px-4 py-2 rounded font-medium"
                    >
                      Yes
                    </button>
                    <button 
                      type="button" 
                      className="bg-gray-200 text-neutral-secondary px-4 py-2 rounded font-medium"
                    >
                      No
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">SERVICE DATE</span>
                  </div>
                  <div className="relative">
                    <input
                      id="dateOfService"
                      name="dateOfService"
                      type="text"
                      value={formData.dateOfService || "02/03/2023"}
                      onChange={handleInputChange}
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">ACCIDENT DATE</span>
                  </div>
                  <div className="relative">
                    <input
                      id="accidentDate"
                      name="accidentDate"
                      type="text"
                      value={formData.accidentDate || "02/03/2023"}
                      onChange={handleInputChange}
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <XMarkIcon className="h-5 w-5 text-red-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">ACCIDENT LOCATION</span>
                  </div>
                  <div className="relative">
                    <input
                      id="accidentLocation"
                      name="accidentLocation"
                      type="text"
                      value={formData.accidentLocation || "Home"}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-red-300 rounded-lg bg-white text-gray-900"
                      placeholder="Enter accident location"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        );
        
      case "Medical & Provider":
        return (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Medical Information")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Medical Information") ? (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Medical Information</h3>
              </div>
            </div>
            
            {expandedSections.includes("Medical Information") && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">DIAGNOSIS</span>
                  </div>
                  <div className="relative" onClick={() => handleFieldClick("diagnosis")}>
                    <input
                      id="diagnosis"
                      name="diagnosis"
                      type="text"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  <FieldRecommendations fieldName="diagnosis" />
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">UPLOAD DOCUMENTS</span>
                  </div>
                  <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {files.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-neutral mb-2">Uploaded Files</h3>
                <ul className="divide-y divide-gray-200 rounded border border-gray-200">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 w-0 flex-1 truncate">{file.name}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="font-medium text-error hover:text-error"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        );
        
      case "Reimbursement":
        return (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => toggleSection("Reimbursement Information")}>
              <div className="flex items-center">
                <div className="mr-2 w-5 h-5 flex-shrink-0">
                  {expandedSections.includes("Reimbursement Information") ? (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ArrowPathIcon className="h-5 w-5 text-gray-500 transform -rotate-90" />
                  )}
                </div>
                <h3 className="text-base font-medium">Reimbursement Information</h3>
              </div>
            </div>
            
            {expandedSections.includes("Reimbursement Information") && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="uppercase text-xs font-medium text-gray-500">TOTAL AMOUNT</span>
                  </div>
                  <div className="relative">
                    <input
                      id="totalAmount"
                      name="totalAmount"
                      type="text"
                      value={formData.totalAmount || "15,000 THB"}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                      placeholder="Enter amount"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">PAYMENT METHOD</span>
                  </div>
                  <div className="relative">
                    <select
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900"
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
                      value="Bangkok Bank"
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="uppercase text-xs font-medium text-gray-500">ACCOUNT NUMBER</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value="123-4-56789-0"
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        );
      
      case "Review":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-6">Review Your Claim</h2>
            <p className="mb-6 text-neutral-secondary">
              Please review the information below before submitting your claim.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-neutral-secondary mb-2">Policy & Member</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-neutral-secondary">Policy Number:</span>
                      <p className="text-sm font-medium">{formData.policyNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-secondary">Policy Holder:</span>
                      <p className="text-sm font-medium">{formData.policyHolderName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-secondary">ID Number:</span>
                      <p className="text-sm font-medium">{formData.idNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-secondary mb-2">Claim Details</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-neutral-secondary">Claim Type:</span>
                      <p className="text-sm font-medium">{formData.claimType || "OPD Claim"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-secondary">Service Date:</span>
                      <p className="text-sm font-medium">{formData.dateOfService || "02/03/2023"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-secondary">Documents:</span>
                      <p className="text-sm font-medium">{files.length} file(s) uploaded</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-neutral-secondary mb-2">Uploaded Documents</h4>
                  <ul className="text-sm">
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-gray-500 flex items-center">
                        <DocumentTextIcon className="h-4 w-4 mr-1 text-primary" />
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="font-medium text-neutral">
                    I confirm that all information provided is accurate and complete
                  </label>
                  <p className="text-neutral-secondary">
                    By submitting this claim, I certify that the information provided is true and accurate to the best of my knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "Documents":
        return (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Documents</h3>
              <div className="flex space-x-2">
                <button className="btn-primary flex items-center">
                  <span>Upload Document</span>
                </button>
                <button className="btn-secondary flex items-center">
                  <span>Filter</span>
                </button>
              </div>
            </div>
            
            {files.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {files.map((file, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {file.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-6 border border-gray-200 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
                <p className="text-gray-700 mb-1">Click or drag documents to this area to upload</p>
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
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral">Submit New Claim</h1>
          <p className="text-neutral-secondary">Please provide the details for your insurance claim</p>
        </div>
        <Link href="/claims" className="btn-secondary flex items-center">
          <ArrowUturnLeftIcon className="mr-1 h-4 w-4" />
          Back to Claims
        </Link>
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
          <button 
            className={`pb-2 ${activeTab === "Review" ? "text-blue-500 border-b-2 border-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => handleTabClick("Review")}
          >
            Review
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-1 justify-center">
          {/* Main content area with 60% width */}
          <div className={`w-3/5 ${showDocumentPanel ? 'mr-4' : ''}`}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {renderTabContent()}
            </div>
          </div>
          
          {/* Document panel - shown when a field or document is selected */}
          {showDocumentPanel && (
            <div className="w-2/5 bg-white border border-gray-200 rounded-lg shadow-sm p-4 transition-all duration-300 ease-in-out transform">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={closeDocumentPanel}
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <span className="text-sm font-medium">Document Evidence</span>
                <div></div> {/* Empty div for flex alignment */}
              </div>
              
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Document Upload Preview
                  </h3>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    {/* Document preview */}
                    <div className="mb-4">
                      <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                        Document preview would be here
                      </div>
                    </div>
                    
                    {/* Highlighted field */}
                    {activeField && (
                      <div className="bg-blue-100 p-2 text-gray-700 rounded flex items-center mt-4">
                        <span className="font-medium mr-2">{activeField === "policyHolder" ? "Member Name" : 
                                          activeField === "diagnosis" ? "Diagnosis" : 
                                          activeField}</span>
                        <span className="bg-white px-2 py-1 rounded">
                          {activeField === "policyHolder" ? fieldRecommendations.policyHolder[0].value : 
                            activeField === "diagnosis" ? fieldRecommendations.diagnosis[0].value : 
                            "Field Value"}
                        </span>
                      </div>
                    )}
                    
                    {activeField && (
                      <div className="mt-4 p-2 bg-yellow-50 rounded-md">
                        <p className="text-xs text-gray-600 font-medium">AI Extraction:</p>
                        <div className="text-xs text-gray-600 mt-1">
                          <p>Found {activeField === "policyHolder" ? "member name" : 
                                    activeField === "diagnosis" ? "diagnosis code and description" : 
                                    "field value"} in upload document with {activeField === "policyHolder" ? "93%" : 
                                                                            activeField === "diagnosis" ? "97%" : 
                                                                            "high"} confidence.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="w-3/5 flex justify-between">
            <Link href="/claims" className="btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary"
            >
              Submit Claim
            </button>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}