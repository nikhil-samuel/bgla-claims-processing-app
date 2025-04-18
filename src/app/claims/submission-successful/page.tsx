"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { useI18n } from "@/lib/i18n/i18n-context";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, DocumentTextIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SubmissionSuccessfulPage() {
  const { t } = useI18n();
  
  // Mock data for the newly created claim
  const newClaim = {
    id: "CL-2025-1235",
    submittedDate: new Date().toLocaleDateString(),
    expectedProcessingTime: "2-3 business days"
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Claim Submitted Successfully!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your claim has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 inline-block">
            <div className="text-left">
              <p className="text-sm text-gray-500 mb-1">Claim ID</p>
              <p className="text-xl font-medium text-gray-900 mb-4">{newClaim.id}</p>
              
              <p className="text-sm text-gray-500 mb-1">Submission Date</p>
              <p className="text-gray-900 mb-4">{newClaim.submittedDate}</p>
              
              <p className="text-sm text-gray-500 mb-1">Expected Processing Time</p>
              <p className="text-gray-900">{newClaim.expectedProcessingTime}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 flex">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 mr-3">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-blue-800">Track Your Claim</h3>
                <p className="text-sm text-blue-600">
                  You can check the status of your claim at any time from the dashboard.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 flex">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 mr-3">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-blue-800">Need Help?</h3>
                <p className="text-sm text-blue-600">
                  If you have any questions, please contact our support team.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild className="flex items-center justify-center">
              <Link href="/claims">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Claims
              </Link>
            </Button>
            
            <Button asChild className="flex items-center justify-center">
              <Link href={`/claims/${newClaim.id}`}>
                View Claim Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}