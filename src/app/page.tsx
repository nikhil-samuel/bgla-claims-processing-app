import Link from "next/link";
import { SignInForm } from "@/components/SignInForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-bgla-blue mb-2">BGLA Claims</h1>
          <p className="text-gray-600">Sign in to access your claims dashboard</p>
        </div>
        
        <SignInForm />
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            New user?{" "}
            <Link href="/register" className="text-bgla-blue hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
