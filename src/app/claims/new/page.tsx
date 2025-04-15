"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NewClaim() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    claimType: "",
    policyNumber: "",
    patientName: "",
    dateOfService: "",
    providerName: "",
    totalAmount: "",
    description: "",
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
          <h1 className="text-2xl font-bold text-gray-900">Submit New Claim</h1>
          <p className="text-gray-600">Please provide the details for your insurance claim</p>
        </div>
        <Link href="/claims" className="btn-secondary flex items-center">
          <ArrowUturnLeftIcon className="mr-1 h-4 w-4" />
          Back to Claims
        </Link>
      </div>

      <div className="card mb-6">
        <div className="w-full py-4">
          <div className="flex w-full items-center">
            <div className={`flex-1 border-t-4 ${currentStep >= 1 ? "border-bgla-blue" : "border-gray-200"}`}></div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${currentStep >= 1 ? "bg-bgla-blue text-white" : "bg-gray-200 text-gray-700"}`}>
              1
            </div>
            <div className={`flex-1 border-t-4 ${currentStep >= 2 ? "border-bgla-blue" : "border-gray-200"}`}></div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${currentStep >= 2 ? "bg-bgla-blue text-white" : "bg-gray-200 text-gray-700"}`}>
              2
            </div>
            <div className={`flex-1 border-t-4 ${currentStep >= 3 ? "border-bgla-blue" : "border-gray-200"}`}></div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${currentStep >= 3 ? "bg-bgla-blue text-white" : "bg-gray-200 text-gray-700"}`}>
              3
            </div>
            <div className={`flex-1 border-t-4 ${currentStep >= 3 ? "border-bgla-blue" : "border-gray-200"}`}></div>
          </div>
          <div className="mt-2 flex w-full justify-between text-xs">
            <div className={`w-10 text-center ${currentStep >= 1 ? "text-bgla-blue" : "text-gray-500"}`}>Claim Info</div>
            <div className={`w-16 text-center ${currentStep >= 2 ? "text-bgla-blue" : "text-gray-500"}`}>Documents</div>
            <div className={`w-16 text-center ${currentStep >= 3 ? "text-bgla-blue" : "text-gray-500"}`}>Review</div>
          </div>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Claim Information */}
          {currentStep === 1 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Claim Information</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="claimType" className="form-label">Claim Type*</label>
                  <select
                    id="claimType"
                    name="claimType"
                    value={formData.claimType}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a claim type</option>
                    <option value="Medical">Medical</option>
                    <option value="Dental">Dental</option>
                    <option value="Vision">Vision</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Physical Therapy">Physical Therapy</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="policyNumber" className="form-label">Policy Number*</label>
                  <input
                    id="policyNumber"
                    name="policyNumber"
                    type="text"
                    value={formData.policyNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., BGLA-12345678"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="patientName" className="form-label">Patient Name*</label>
                  <input
                    id="patientName"
                    name="patientName"
                    type="text"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Full name of the patient"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dateOfService" className="form-label">Date of Service*</label>
                  <input
                    id="dateOfService"
                    name="dateOfService"
                    type="date"
                    value={formData.dateOfService}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="providerName" className="form-label">Provider Name*</label>
                  <input
                    id="providerName"
                    name="providerName"
                    type="text"
                    value={formData.providerName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Name of healthcare provider"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="totalAmount" className="form-label">Total Amount*</label>
                  <input
                    id="totalAmount"
                    name="totalAmount"
                    type="text"
                    value={formData.totalAmount}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., 1250.00"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-input"
                    placeholder="Provide additional details about your claim"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Next: Upload Documents
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Document Upload */}
          {currentStep === 2 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Upload Supporting Documents</h2>
              <p className="mb-6 text-gray-600">
                Please upload any relevant documents to support your claim (receipts, bills, medical reports, etc.).
              </p>

              <div className="mb-6">
                <label className="form-label">Documents</label>
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
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-bgla-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-bgla-blue focus-within:ring-offset-2 hover:text-bgla-light-blue"
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

              {files.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-700">Uploaded Files</h3>
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
                            className="font-medium text-red-600 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
            </div>
          )}

          {/* Step 3: Review and Submit */}
          {currentStep === 3 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Review Your Claim</h2>
              <p className="mb-6 text-gray-600">
                Please review the information below before submitting your claim.
              </p>

              <div className="mb-6 rounded-md border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-3 text-lg font-medium text-gray-900">Claim Details</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Claim Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.claimType || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Policy Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.policyNumber || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Patient Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.patientName || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date of Service</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.dateOfService || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Provider Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.providerName || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData.totalAmount ? `$${formData.totalAmount}` : "Not specified"}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formData.description || "No description provided"}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Uploaded Documents</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {files.length > 0 ? (
                        <ul className="list-inside list-disc">
                          {files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      ) : (
                        "No documents uploaded"
                      )}
                    </dd>
                  </div>
                </dl>
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
                      className="h-4 w-4 rounded border-gray-300 text-bgla-blue focus:ring-bgla-blue"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                      I confirm that all information provided is accurate and complete
                    </label>
                    <p className="text-gray-500">
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
          )}
        </form>
      </div>
    </AppLayout>
  );
}
