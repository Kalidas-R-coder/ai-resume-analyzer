import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeIQ | Home" },
    { name: "description", content: "Analyze your resumes with AI-powered feedback" },
  ];
}

export default function Home() {
  const {auth, kv} = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

    useEffect(() => {
        const loadResumes = async () => {
            setLoadingResumes(true);

            const resumes = (await kv.list('resume', true)) as KVItem[];
            const parsedResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))
            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        }
        loadResumes();
    }, []);


  return <main>
    <Navbar/>
    <section className="main-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          Your Career Journey, Smarter with{' '}
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            ResumeIQ
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Analyze your resumes, understand your strengths, and get actionable feedback to stand out in your next opportunity.
        </p>
      </div>
        {loadingResumes && (
            <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6 text-center">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-2xl" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 animate-spin" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#26334D" strokeWidth="6" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#home-spinner-grad)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="home-spinner-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-[#F8FAFC]">
                Loading Your Resumes
              </h2>
              <p className="mt-3 text-[#94A3B8] max-w-sm leading-relaxed">
                Fetching your analyzed resumes and feedback...
              </p>
            </div>
        )}

    {!loadingResumes && resumes.length > 0 && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
            Your Resumes
          </h2>
          <p className="mt-2 text-[#94A3B8]">
            Track and manage your analyzed resumes in one place. ({resumes.length} {resumes.length === 1 ? 'resume' : 'resumes'})
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (<ResumeCard key={resume.id} resume={resume} />))}
        </div>
      </div>
    )}

        {!loadingResumes && resumes?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6 text-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl" />
                    <div className="relative rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-[#26334D] w-20 h-20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="mt-8 text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                    No resumes yet
                </h2>

                {/* Description */}
                <p className="mt-4 text-[#94A3B8] max-w-md leading-relaxed">
                    Your next career opportunity starts with a stronger resume. Upload your first resume to get AI-powered feedback.
                </p>

                {/* Upload button */}
                <Link
                    to="/upload"
                    className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-base hover:opacity-90 transition-opacity duration-300"
                >
                    Upload Your First Resume
                </Link>
            </div>
        )}
    </section>
  </main>;
}
