"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUturnLeftIcon,
  DocumentTextIcon,
  ClockIcon,
  PaperClipIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

// Mock data for claim details
const claimDetails = {
  id: "CL-2025-1234",
  type: "Medical",
  patientName: "John Smith",
  submittedDate: "April 10, 2025",
  status: "In Progress",
  statusColor: "bg-amber-100 text-amber-800",
  policyNumber: "BGLA-9876543",
  provider: "City Hospital",
  serviceDate: "April 5, 2025",
  amount: "$1,250.00",
  description: "Emergency room visit due to high fever and difficulty breathing.",
  documents: [
    { name: "Medical_Bill.pdf", size: "1.2 MB", date: "April 10, 2025" },
    { name: "Doctor_Report.pdf", size: "840 KB", date: "April 10, 2025" },
    { name: "Insurance_Form.pdf", size: "550 KB", date: "April 10, 2025" },
  ],
  timeline: [
    {
      date: "April 10, 2025",
      time: "09:45 AM",
      title: "Claim Submitted",
      description: "Claim was submitted successfully with all required documents.",
      icon: DocumentTextIcon,
      iconBg: "bg-bgla-blue",
    },
    {
      date: "April 10, 2025",
      time: "02:30 PM",
      title: "Claim Under Review",
      description: "Your claim is currently being reviewed by our claims department.",
      icon: ClockIcon,
      iconBg: "bg-amber-500",
    },
  ],
  comments: [
    {
      author: "System",
      date: "April 10, 2025",
      time: "09:45 AM",
      content: "Claim has been submitted successfully. Our team will review your documents shortly.",
    },
    {
      author: "Sarah Johnson (Claims Specialist)",
      date: "April 10, 2025",
      time: "02:30 PM",
      content: "We are currently reviewing your claim. We will notify you once the review is complete.",
    },
  ],
};

export default function ClaimDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("details");
  const claimId = params.id;

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Claim {claimId}</h1>
            <span
              className={`ml-3 px-2.5 py-0.5 inline-flex text-sm leading-5 font-semibold rounded-full ${claimDetails.statusColor}`}
            >
              {claimDetails.status}
            </span>
          </div>
          <p className="text-gray-600">Submitted on {claimDetails.submittedDate}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/claims" className="btn-secondary flex items-center">
            <ArrowUturnLeftIcon className="mr-1 h-4 w-4" />
            Back to Claims
          </Link>
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
        <nav className="flex divide-x divide-gray-200">
          <button
            className={`group flex flex-1 items-center py-4 px-6 text-center text-sm font-medium ${
              activeTab === "details"
                ? "bg-white text-bgla-blue"
                : "text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("details")}
          >
            <DocumentTextIcon
              className={`mr-2 h-5 w-5 ${
                activeTab === "details" ? "text-bgla-blue" : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            Details
          </button>
          <button
            className={`group flex flex-1 items-center py-4 px-6 text-center text-sm font-medium ${
              activeTab === "documents"
                ? "bg-white text-bgla-blue"
                : "text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("documents")}
          >
            <PaperClipIcon
              className={`mr-2 h-5 w-5 ${
                activeTab === "documents" ? "text-bgla-blue" : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            Documents
          </button>
          <button
            className={`group flex flex-1 items-center py-4 px-6 text-center text-sm font-medium ${
              activeTab === "timeline"
                ? "bg-white text-bgla-blue"
                : "text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("timeline")}
          >
            <ClockIcon
              className={`mr-2 h-5 w-5 ${
                activeTab === "timeline" ? "text-bgla-blue" : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            Timeline
          </button>
          <button
            className={`group flex flex-1 items-center py-4 px-6 text-center text-sm font-medium ${
              activeTab === "messages"
                ? "bg-white text-bgla-blue"
                : "text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            <ChatBubbleLeftRightIcon
              className={`mr-2 h-5 w-5 ${
                activeTab === "messages" ? "text-bgla-blue" : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            Messages
          </button>
        </nav>

        <div className="p-6">
          {/* Details Tab */}
          {activeTab === "details" && (
            <div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">Claim Type</div>
                  <div className="mt-1 text-sm text-gray-900">{claimDetails.type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Patient Name</div>
                  <div className="mt-1 text-sm text-gray-900">{claimDetails.patientName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Policy Number</div>
                  <div className="mt-1 text-sm text-gray-900">{claimDetails.policyNumber}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Provider</div>
                  <div className="mt-1 text-sm text-gray-900">{claimDetails.provider}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Date of Service</div>
                  <div className="mt-1 text-sm text-gray-900">{claimDetails.serviceDate}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Amount</div>
                  <div className="mt-1 text-sm text-gray-900">{claimDetails.amount}</div>
                </div>
                <div className="sm:col-span-3">
                  <div className="text-sm font-medium text-gray-500">Description</div>
                  <div className="mt-1 text-sm text-gray-900">{claimDetails.description}</div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Action Required</h3>
                </div>
                <div className="mt-2 rounded-md bg-amber-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon className="h-5 w-5 text-amber-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">Additional Information Needed</h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <p>Please provide the following additional information to process your claim:</p>
                        <ul className="mt-1 list-disc pl-5">
                          <li>Itemized receipt from the provider</li>
                          <li>Prescription information if applicable</li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            type="button"
                            className="rounded-md bg-amber-50 px-2 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-amber-50"
                          >
                            Upload Documents
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900">Claim Documents</h3>
                <button
                  type="button"
                  className="text-sm font-medium text-bgla-blue hover:text-bgla-light-blue"
                >
                  Upload New
                </button>
              </div>
              <ul className="mt-4 divide-y divide-gray-200">
                {claimDetails.documents.map((doc, index) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                          <DocumentTextIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {doc.size} · Uploaded on {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-bgla-blue focus:ring-offset-2"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="ml-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-bgla-blue focus:ring-offset-2"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Claim Timeline</h3>
              <div className="mt-4 flow-root">
                <ul className="-mb-8">
                  {claimDetails.timeline.map((event, index) => (
                    <li key={index}>
                      <div className="relative pb-8">
                        {index !== claimDetails.timeline.length - 1 ? (
                          <span
                            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${event.iconBg} ring-8 ring-white`}
                            >
                              <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{event.title}</p>
                              <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                              <time dateTime={event.date}>{event.date}</time>
                              <div>{event.time}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900">Communication</h3>
              </div>
              <div className="mt-4 space-y-6">
                {claimDetails.comments.map((comment, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-4">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{comment.author}</h4>
                      <p className="text-xs text-gray-500">
                        {comment.date} at {comment.time}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <label htmlFor="message" className="sr-only">
                  Add a message
                </label>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-bgla-blue focus:ring-bgla-blue sm:text-sm"
                    placeholder="Add a message or question about your claim..."
                  />
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-transparent bg-bgla-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-bgla-light-blue focus:outline-none focus:ring-2 focus:ring-bgla-blue focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
