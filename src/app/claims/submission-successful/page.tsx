"use client";

import AppLayout from "@/components/Layout/AppLayout";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubmissionSuccessful() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="card max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500">
            <CheckCircleIcon className="h-10 w-10" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Claim Submitted Successfully!</h1>
          <p className="mt-2 text-gray-600">
            Your claim has been submitted and is now being processed. You will receive notifications as it progresses.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Claim ID: <span className="font-medium">CL-2025-1235</span>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            You will be redirected to the dashboard in {countdown} seconds.
          </p>
          <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Link href="/dashboard" className="btn-primary text-center">
              Go to Dashboard
            </Link>
            <Link href="/claims" className="btn-secondary text-center">
              View All Claims
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
