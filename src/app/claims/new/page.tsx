"use client";

import AppLayout from "@/components/Layout/AppLayout";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export default function NewClaimPage() {
  const [formData, setFormData] = useState({
    memberName: "",
    memberID: "",
    policyNumber: "",
    providerName: "",
    providerID: "",
    serviceDate: "",
    diagnosisCode: "",
    diagnosisDescription: "",
    serviceCode: "",
    serviceDescription: "",
    amount: ""
  });
  
  const [files, setFiles] = useState<File[]>([]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...fileArray]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    console.log("Files:", files);
    // In a real app, you would send this to your backend
    
    // Redirect to success page
    window.location.href = "/claims/submission-successful";
  };
  
  return (
    <AppLayout>
      <div className="py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/claims"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to Claims
            </Link>
            <h1 className="mt-2 text-2xl font-semibold text-gray-900">New Claim Submission</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {/* Member Information Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Member Information</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="memberName" className="block text-sm font-medium text-gray-700">
                      Member Name
                    </label>
                    <input
                      type="text"
                      id="memberName"
                      name="memberName"
                      value={formData.memberName}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="memberID" className="block text-sm font-medium text-gray-700">
                      Member ID
                    </label>
                    <input
                      type="text"
                      id="memberID"
                      name="memberID"
                      value={formData.memberID}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700">
                      Policy Number
                    </label>
                    <input
                      type="text"
                      id="policyNumber"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Provider Information Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Provider Information</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="providerName" className="block text-sm font-medium text-gray-700">
                      Provider Name
                    </label>
                    <input
                      type="text"
                      id="providerName"
                      name="providerName"
                      value={formData.providerName}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="providerID" className="block text-sm font-medium text-gray-700">
                      Provider ID
                    </label>
                    <input
                      type="text"
                      id="providerID"
                      name="providerID"
                      value={formData.providerID}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              {/* Service Information Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Service Information</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="serviceDate" className="block text-sm font-medium text-gray-700">
                      Service Date
                    </label>
                    <input
                      type="date"
                      id="serviceDate"
                      name="serviceDate"
                      value={formData.serviceDate}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Total Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="diagnosisCode" className="block text-sm font-medium text-gray-700">
                      Diagnosis Code (ICD-10)
                    </label>
                    <input
                      type="text"
                      id="diagnosisCode"
                      name="diagnosisCode"
                      value={formData.diagnosisCode}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., J45.909"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="diagnosisDescription" className="block text-sm font-medium text-gray-700">
                      Diagnosis Description
                    </label>
                    <input
                      type="text"
                      id="diagnosisDescription"
                      name="diagnosisDescription"
                      value={formData.diagnosisDescription}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., Unspecified asthma, uncomplicated"
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceCode" className="block text-sm font-medium text-gray-700">
                      Service Code (CPT)
                    </label>
                    <input
                      type="text"
                      id="serviceCode"
                      name="serviceCode"
                      value={formData.serviceCode}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., 99213"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700">
                      Service Description
                    </label>
                    <input
                      type="text"
                      id="serviceDescription"
                      name="serviceDescription"
                      value={formData.serviceDescription}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., Office visit, established patient"
                    />
                  </div>
                </div>
              </div>
              
              {/* Document Upload Section */}
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Supporting Documents</h3>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14v20c0 4.418 7.163 8 16 8 8.837 0 16-3.582 16-8V14"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14c0 4.418 7.163 8 16 8 8.837 0 16-3.582 16-8"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14c0-4.418 7.163-8 16-8 8.837 0 16 3.582 16 8"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileChange}
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
                
                {/* File list */}
                {files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files</h4>
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {files.map((file, index) => (
                        <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <DocumentTextIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
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
              </div>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Claim
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
