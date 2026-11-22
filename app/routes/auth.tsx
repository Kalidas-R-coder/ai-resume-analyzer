import React, {useEffect} from "react";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";

export const meta = () =>
   ([{title: 'ResumeIQ | Sign In'}, {name: 'Description', content: 'Sign in to analyze your resumes'}])

const Auth = () => {
  const {isLoading, auth} = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract and validate the ?next= query parameter
  const searchParams = new URLSearchParams(location.search);
  const nextParam = searchParams.get("next");
  // Only allow internal routes (start with /) to prevent open redirect vulnerabilities
  const next = (nextParam && nextParam.startsWith("/")) ? nextParam : "/";

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next, navigate]);
  return (
      <main className="bg-[#0a0e1a] min-h-screen flex items-center justify-center px-6">
        {/* Ambient glow effects */}
        <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl" />

        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-[#8B5CF6]"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className="text-2xl font-bold text-gradient">ResumeIQ</span>
            </div>
          </div>

          {/* Sign-in card */}
          <div className="rounded-2xl bg-[#111C32] border border-[#26334D] p-8 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Welcome to ResumeIQ
              </h2>
              <p className="text-[#94A3B8] leading-relaxed">
                Sign in to analyze your resumes, understand your strengths, and get actionable feedback for your next career opportunity.
              </p>
            </div>

            {/* Auth button */}
            {isLoading ? (
              <button className="w-full primary-gradient rounded-full px-6 py-3.5 text-sm font-medium text-white cursor-not-allowed opacity-80" disabled>
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round" />
                  </svg>
                  Signing you in...
                </span>
              </button>
            ) : auth.isAuthenticated ? (
              <button
                className="w-full rounded-full px-6 py-3.5 text-sm font-medium text-[#F8FAFC] bg-[#182238] border border-[#26334D] hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 transition-all duration-200 cursor-pointer"
                onClick={auth.signOut}
              >
                Log Out
              </button>
            ) : (
              <button
                className="w-full primary-gradient rounded-full px-6 py-3.5 text-sm font-medium text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                onClick={auth.signIn}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Sign In with Puter
                </span>
              </button>
            )}
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-[#94A3B8]/60">
            Powered by Puter.js — secure, private authentication.
          </p>
        </div>
      </main>
  );
};

export default Auth;