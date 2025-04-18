"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/Layout/AppLayout";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ArrowUturnLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NewClaimPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    policyNumber: "THB9876543",
    policyHolder: "Somchai Jaidee",
    idNumber: "1-1022-33445-67-8",
    claimType: "medical",
    diagnosisCode: "",
    diagnosisDescription: "",
    providerName: "",
    startDate: "",
    endDate: "",
    amount: "",
    documents: [] as File[],
    notes: ""
  });

  // Total number of steps in the form
  const totalSteps = 3;

  // Function to handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newFiles]
      }));
    }
  };

  // Function to handle step navigation
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form
      router.push("/claims/submission-successful");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep > index + 1
                    ? "bg-primary text-white"
                    : currentStep === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`w-12 h-1 ${
                    currentStep > index + 1 ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-medium">
            {currentStep === 1 ? t("claim.policy") : null}
            {currentStep === 2 ? t("claim.medical") : null}
            {currentStep === 3 ? t("claim.reimbursement") : null}
          </span>
          <span className="text-sm text-gray-500">
            {t("claims.step")} {currentStep} {t("claims.of")} {totalSteps}
          </span>
        </div>
      </div>
    );
  };

  // Render the current step form
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">{t("claim.policy")}</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form.policyNumber")}
                </label>
                <input
                  type="text"
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="policyHolder" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form.policyHolder")}
                </label>
                <input
                  type="text"
                  id="policyHolder"
                  name="policyHolder"
                  value={formData.policyHolder}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form.idNumber")}
                </label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="claimType" className="block text-sm font-medium text-gray-700 mb-1">
                  Claim Type
                </label>
                <select
                  id="claimType"
                  name="claimType"
                  value={formData.claimType}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="medical">Medical</option>
                  <option value="dental">Dental</option>
                  <option value="vision">Vision</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">{t("claim.medical")}</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="diagnosisCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis Code (ICD)
                </label>
                <input
                  type="text"
                  id="diagnosisCode"
                  name="diagnosisCode"
                  value={formData.diagnosisCode}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="diagnosisDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis Description
                </label>
                <input
                  type="text"
                  id="diagnosisDescription"
                  name="diagnosisDescription"
                  value={formData.diagnosisDescription}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="providerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Provider Name
                </label>
                <input
                  type="text"
                  id="providerName"
                  name="providerName"
                  value={formData.providerName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">{t("claim.reimbursement")}</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="form-input pl-8"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("documents.title")}
                </label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      {t("documents.upload")}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {t("documents.uploadHint")}
                    </p>
                    <input
                      id="documents"
                      name="documents"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById("documents")?.click()}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Select files
                    </button>
                  </div>
                </div>
                
                {formData.documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Selected files:</p>
                    <ul className="mt-1 space-y-1">
                      {formData.documents.map((file, index) => (
                        <li key={index} className="text-sm text-gray-500">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="form-input"
                ></textarea>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral">{t("dashboard.action.newClaim")}</h1>
            <p className="text-neutral-secondary">
              Please complete the form below to submit a new claim
            </p>
          </div>
          <Link href="/claims" className="flex items-center text-neutral-secondary hover:text-neutral">
            <ArrowUturnLeftIcon className="h-4 w-4 mr-1" />
            Back to Claims
          </Link>
        </div>
      </div>
      
      {renderStepIndicator()}
      
      <form className="space-y-6">
        {renderStepContent()}
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={currentStep === 1 ? "invisible" : ""}
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={handleNextStep}
            className="flex items-center"
          >
            {currentStep === totalSteps ? "Submit Claim" : "Next"}
            {currentStep !== totalSteps && <ChevronRightIcon className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </AppLayout>
  );
}