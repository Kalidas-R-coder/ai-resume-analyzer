import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
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


  return <main className="bg-[#0a0e1a]">
    <Navbar/>
    <section className="main-section">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
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
            <div className = "flex flex-col items-center justify-center">
                <img src="/images/resume-scan-2.gif" className = "w-[200px]" />
            </div>
        )}

    {!loadingResumes && resumes.length > 0 && (<div className = "resumes-section">
      {resumes.map((resume) => (<ResumeCard key={resume.id} resume={resume} />))}
    </div>)}

        {!loadingResumes && resumes?.length === 0 && (
            <div className = "flex flex-col items-center justify-center mt-10 gap-4">
                <Link to="/upload" className = "primary-button w-fit text-xl font-semibold">
                    Upload Resume
                </Link>
            </div>
        )}
    </section>
  </main>;
}
