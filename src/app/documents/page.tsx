import AppLayout from "@/components/Layout/AppLayout";
import {
  DocumentTextIcon,
  PhotoIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Mock data for documents
const documents = [
  {
    id: "doc-1",
    name: "Medical_Bill_Hospital.pdf",
    type: "PDF",
    size: "1.2 MB",
    uploadDate: "April 10, 2025",
    relatedClaim: "CL-2025-1234",
    icon: DocumentTextIcon,
  },
  {
    id: "doc-2",
    name: "Doctor_Report.pdf",
    type: "PDF",
    size: "840 KB",
    uploadDate: "April 10, 2025",
    relatedClaim: "CL-2025-1234",
    icon: DocumentTextIcon,
  },
  {
    id: "doc-3",
    name: "Insurance_Form.pdf",
    type: "PDF",
    size: "550 KB",
    uploadDate: "April 10, 2025",
    relatedClaim: "CL-2025-1234",
    icon: DocumentTextIcon,
  },
  {
    id: "doc-4",
    name: "X-Ray_Image.jpg",
    type: "Image",
    size: "3.5 MB",
    uploadDate: "April 8, 2025",
    relatedClaim: "CL-2025-1233",
    icon: PhotoIcon,
  },
  {
    id: "doc-5",
    name: "Dental_Procedure_Bill.pdf",
    type: "PDF",
    size: "420 KB",
    uploadDate: "April 8, 2025",
    relatedClaim: "CL-2025-1233",
    icon: DocumentTextIcon,
  },
  {
    id: "doc-6",
    name: "Lab_Test_Results.pdf",
    type: "PDF",
    size: "920 KB",
    uploadDate: "April 5, 2025",
    relatedClaim: "CL-2025-1232",
    icon: DocumentTextIcon,
  },
  {
    id: "doc-7",
    name: "Prescription.jpg",
    type: "Image",
    size: "1.8 MB",
    uploadDate: "April 5, 2025",
    relatedClaim: "CL-2025-1232",
    icon: PhotoIcon,
  },
];

export default function Documents() {
  return (
    <AppLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage all your claim-related documents</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/documents/upload" className="btn-primary flex items-center">
            <PlusIcon className="mr-1 h-4 w-4" />
            Upload Document
          </Link>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="sm:flex sm:items-center px-4 py-5 sm:px-6">
          <div className="sm:flex-auto">
            <h2 className="text-base font-semibold leading-6 text-gray-900">All Documents</h2>
            <p className="mt-2 text-sm text-gray-700">
              A list of all documents you have uploaded for your insurance claims.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <div className="relative">
              <input
                type="text"
                className="form-input pr-10"
                placeholder="Search documents..."
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Size
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Date Uploaded
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Related Claim
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {documents.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                          <document.icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{document.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {document.type}
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {document.size}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {document.uploadDate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <Link href={`/claims/${document.relatedClaim}`} className="text-bgla-blue hover:underline">
                      {document.relatedClaim}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="text-bgla-blue hover:text-bgla-light-blue"
                        title="Download"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
