"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    // In a real app, you would authenticate against a backend
    // For this prototype, we'll simulate successful login
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="form-label">Email Address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          placeholder="you@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="••••••••"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 text-bgla-blue focus:ring-bgla-light-blue border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <a href="#" className="text-sm text-bgla-blue hover:underline">
          Forgot password?
        </a>
      </div>
      
      <div>
        <button type="submit" className="btn-primary w-full">
          Sign In
        </button>
      </div>
    </form>
  );
}
