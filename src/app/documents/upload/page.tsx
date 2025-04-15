"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function UploadDocument() {
  const router = useRouter();
  const [documentType, setDocumentType] = useState("");
  const [relatedClaim, setRelatedClaim] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
    
    // Simulate uploading
    setIsUploading(true);
    
    // In a real app, you would upload the files to your backend here
    setTimeout(() => {
      setIsUploading(false);
      router.push("/documents");
    }, 2000);
  };

  // Mock data for claims
  const claims = [
    { id: "CL-2025-1234", description: "Medical - City Hospital (April 5, 2025)" },
    { id: "CL-2025-1233", description: "Dental - Smile Dental Clinic (April 8, 2025)" },
    { id: "CL-2025-1232", description: "Vision - Clear Vision Center (April 5, 2025)" },
  ];

  return (
    <AppLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Documents</h1>
          <p className="text-gray-600">Upload supporting documents for your insurance claims</p>
        </div>
        <Link href="/documents" className="btn-secondary flex items-center">
          <ArrowUturnLeftIcon className="mr-1 h-4 w-4" />
          Back to Documents
        </Link>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="documentType" className="form-label">Document Type*</label>
              <select
                id="documentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select document type</option>
                <option value="Medical Bill">Medical Bill</option>
                <option value="Invoice">Invoice</option>
                <option value="Receipt">Receipt</option>
                <option value="Prescription">Prescription</option>
                <option value="Lab Result">Lab Result</option>
                <option value="Medical Report">Medical Report</option>
                <option value="Insurance Form">Insurance Form</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="relatedClaim" className="form-label">Related Claim</label>
              <select
                id="relatedClaim"
                value={relatedClaim}
                onChange={(e) => setRelatedClaim(e.target.value)}
                className="form-input"
              >
                <option value="">Select a claim (optional)</option>
                {claims.map((claim) => (
                  <option key={claim.id} value={claim.id}>
                    {claim.id} - {claim.description}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Associate this document with an existing claim.
              </p>
            </div>

            <div>
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="form-input"
                placeholder="Provide a brief description of the document(s)"
              ></textarea>
            </div>

            <div>
              <label className="form-label">Upload Files*</label>
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
                        required={files.length === 0}
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
              <div>
                <h3 className="form-label">Selected Files</h3>
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

            <div className="flex items-center">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-bgla-blue focus:ring-bgla-blue"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I confirm that these documents are authentic
                </label>
                <p className="text-gray-500">
                  By uploading these documents, I certify that they are authentic and relate to the claim specified.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Link href="/documents" className="btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isUploading || files.length === 0}
                className={`btn-primary ${
                  (isUploading || files.length === 0) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUploading ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
