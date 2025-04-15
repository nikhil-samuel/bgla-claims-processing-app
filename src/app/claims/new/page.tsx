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
  ArrowPathIcon  
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NewClaim() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    claimType: "",
    policyNumber: "THB9876543",
    policyHolderName: "Somchai Jaidee",
    idNumber: "1-1022-33445-67-8",
    dateOfService: "",
    providerName: "",
    totalAmount: "",
    description: "",
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

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the form data to your backend here
    console.log({ formData, files });
    
    // Navigate to the success page
    router.push("/claims/submission-successful");
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

      <div className="card mb-6">
        <div className="w-full py-4">
          <div className="flex w-full items-center">
            <div className={`flex-1 border-t-4 ${currentStep >= 1 ? "border-primary" : "border-gray-200"}`}></div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${currentStep >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}>
              1
            </div>
            <div className={`flex-1 border-t-4 ${currentStep >= 2 ? "border-primary" : "border-gray-200"}`}></div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${currentStep >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}>
              2
            </div>
            <div className={`flex-1 border-t-4 ${currentStep >= 3 ? "border-primary" : "border-gray-200"}`}></div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${currentStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}>
              3
            </div>
            <div className={`flex-1 border-t-4 ${currentStep >= 3 ? "border-primary" : "border-gray-200"}`}></div>
          </div>
          <div className="mt-2 flex w-full justify-between text-xs">
            <div className={`w-20 text-center ${currentStep >= 1 ? "text-primary" : "text-neutral-secondary"}`}>Policy & Member</div>
            <div className={`w-20 text-center ${currentStep >= 2 ? "text-primary" : "text-neutral-secondary"}`}>Claim</div>
            <div className={`w-20 text-center ${currentStep >= 3 ? "text-primary" : "text-neutral-secondary"}`}>Review</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Policy & Member Information */}
        {currentStep === 1 && (
          <>
            <SectionCard title="Policy & Member">
              <div className="form-row">
                <FormField 
                  label="Policy Number" 
                  htmlFor="policyNumber" 
                  validationState="success"
                  required
                >
                  <div className="flex">
                    <input
                      id="policyNumber"
                      name="policyNumber"
                      type="text"
                      value={formData.policyNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      readOnly
                    />
                  </div>
                </FormField>
                
                <FormField 
                  label="Policy Holder Name" 
                  htmlFor="policyHolderName" 
                  validationState="error"
                  validationMessage="Conflicting info from different sources"
                  required
                >
                  <input
                    id="policyHolderName"
                    name="policyHolderName"
                    type="text"
                    value={formData.policyHolderName}
                    onChange={handleInputChange}
                    className="form-input border-error"
                    readOnly
                  />
                </FormField>
              </div>
              
              <div className="form-row">
                <FormField 
                  label="ID / Passport Number" 
                  htmlFor="idNumber" 
                  validationState="success"
                  required
                >
                  <input
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    readOnly
                  />
                </FormField>
                
                <FormField 
                  label="Has Other Insurance" 
                  htmlFor="hasOtherInsurance" 
                >
                  <div className="flex gap-2">
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
                </FormField>
              </div>
            </SectionCard>
            
            <SectionCard title="Additional Member Information">
              <div className="form-row">
                <FormField 
                  label="Gender" 
                  htmlFor="gender" 
                >
                  <div className="flex gap-2">
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
                </FormField>
                
                <FormField 
                  label="Age" 
                  htmlFor="age" 
                  validationState="success"
                >
                  <input
                    id="age"
                    name="age"
                    type="text"
                    value="54"
                    className="form-input"
                    readOnly
                  />
                </FormField>
              </div>
              
              <div className="form-row">
                <FormField 
                  label="Phone Number" 
                  htmlFor="phoneNumber" 
                  validationState="success"
                >
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value="+33 9 87 86 75 61"
                    className="form-input"
                    readOnly
                  />
                </FormField>
              </div>
            </SectionCard>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next: Claim Details
              </button>
            </div>
          </>
        )}

        {/* Step 2: Claim Details */}
        {currentStep === 2 && (
          <>
            <SectionCard title="Claim">
              <div className="form-row">
                <FormField 
                  label="Claim Type" 
                  htmlFor="claimType" 
                  validationState="success"
                  required
                >
                  <select
                    id="claimType"
                    name="claimType"
                    value={formData.claimType}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a claim type</option>
                    <option value="OPD Claim">OPD Claim</option>
                    <option value="IPD Claim">IPD Claim</option>
                    <option value="Dental Claim">Dental Claim</option>
                    <option value="Vision Claim">Vision Claim</option>
                  </select>
                </FormField>
                
                <FormField 
                  label="Illness" 
                  htmlFor="isIllness" 
                >
                  <div className="flex gap-2">
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
                </FormField>
              </div>
              
              <div className="form-row">
                <FormField 
                  label="Accident" 
                  htmlFor="isAccident" 
                  validationState="success"
                >
                  <div className="flex gap-2">
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
                </FormField>
              </div>
              
              <div className="form-row">
                <FormField 
                  label="Service Date" 
                  htmlFor="dateOfService" 
                  validationState="success"
                  required
                >
                  <div className="relative">
                    <input
                      id="dateOfService"
                      name="dateOfService"
                      type="text"
                      value="02/03/2023"
                      onChange={handleInputChange}
                      className="form-input pr-10"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </FormField>
                
                <FormField 
                  label="Accident Date" 
                  htmlFor="accidentDate" 
                  validationState="success"
                >
                  <div className="relative">
                    <input
                      id="accidentDate"
                      name="accidentDate"
                      type="text"
                      value="02/03/2023"
                      onChange={handleInputChange}
                      className="form-input pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </FormField>
              </div>
              
              <div className="form-row">
                <FormField 
                  label="Accident Location" 
                  htmlFor="accidentLocation" 
                  validationState="error"
                >
                  <input
                    id="accidentLocation"
                    name="accidentLocation"
                    type="text"
                    value={formData.accidentLocation}
                    onChange={handleInputChange}
                    className="form-input border-error"
                    placeholder="Enter accident location"
                  />
                </FormField>
                
                <FormField 
                  label="Police Report" 
                  htmlFor="policeReport" 
                >
                  <div className="flex gap-2">
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
                </FormField>
              </div>
            </SectionCard>
            
            <SectionCard title="Medical & Provider">
              <div className="form-row">
                <FormField 
                  label="Chief Complaint" 
                  htmlFor="chiefComplaint" 
                  validationState="success"
                >
                  <input
                    id="chiefComplaint"
                    name="chiefComplaint"
                    type="text"
                    value="Fever and sore throat"
                    className="form-input"
                  />
                </FormField>
              </div>
              
              <div className="form-row">
                <FormField 
                  label="Upload Documents" 
                  htmlFor="documents" 
                >
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
                </FormField>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4">
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
            </SectionCard>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next: Review Submission
              </button>
            </div>
          </>
        )}

        {/* Step 3: Review and Submit */}
        {currentStep === 3 && (
          <>
            <div className="section-card">
              <h2 className="text-xl font-semibold mb-6">Review Your Claim</h2>
              <p className="mb-6 text-neutral-secondary">
                Please review the information below before submitting your claim.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">Claim Summary</h3>
                  <StatusTag status="pending" icon={<ArrowPathIcon className="h-3 w-3" />}>
                    Draft
                  </StatusTag>
                </div>
                
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
                        <p className="text-sm font-medium">02/03/2023</p>
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
                        <li key={index} className="flex items-center gap-1">
                          <PaperClipIcon className="h-4 w-4 text-neutral-secondary" />
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

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!formData.acceptTerms}
                  className={`btn-primary ${!formData.acceptTerms ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  Submit Claim
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </AppLayout>
  );
}
