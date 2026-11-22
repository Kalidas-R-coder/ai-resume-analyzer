import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Navbar from "~/components/Navbar";

export const meta = () =>
    ([{title: 'ResumeIQ | Resume Review'}, {name: 'Description', content: 'Detailed overview of your resume'}])

const Resume = () => {
    const { id } = useParams();
    const {auth, isLoading, fs, kv} = usePuterStore();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading]);


    useEffect(()  => {
        const loadResume = async() => {
            const resume = await kv.get(`resume${id}`);

            if(!resume) return ;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob)  return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback : data.feedback});
        }

        loadResume();
    }, [id, kv, fs]);
  return (
      <main className="bg-[#0a0e1a] min-h-screen">
        <Navbar />
        
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-6">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111C32] border border-[#26334D] text-sm font-medium text-[#F8FAFC] hover:border-[#8B5CF6]/50 hover:text-[#8B5CF6] transition-all duration-300 cursor-pointer w-fit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Homepage
            </Link>
            <h2 className="text-xl md:text-2xl font-bold text-[#F8FAFC]">
              <span className="text-gradient">Resume Review</span>
            </h2>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          {/* Loading state – single centered indicator */}
          {!(imageUrl && resumeUrl && feedback) ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6 text-center min-h-[50vh]">
              {/* Animated spinner with glow */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-2xl" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <svg className="w-20 h-20 sm:w-24 sm:h-24 animate-spin" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#26334D" strokeWidth="6" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#resume-spinner-grad)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="resume-spinner-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Loading Resume Review
              </h2>
              <p className="mt-4 text-[#94A3B8] max-w-md leading-relaxed">
                Preparing your resume analysis and feedback...
              </p>
            </div>
          ) : (
            /* Two-column layout: PDF preview + Score panel */
            <div className="flex flex-col lg:flex-row xl:gap-10 gap-8 items-start">
              {/* PDF Preview - Left column */}
              <section className="w-full lg:w-5/12 xl:w-1/2 lg:sticky lg:top-6">
                <div className="animate-in fade-in duration-1000 rounded-2xl overflow-hidden bg-[#111C32] border border-[#26334D]">
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={imageUrl}
                      className="w-full max-w-full h-auto object-contain max-h-[50vh] sm:max-h-none"
                      title="resume" alt="resume"
                    />
                  </a>
                </div>
              </section>

              {/* Score Panel - Right column */}
              <section className="w-full lg:w-7/12 xl:w-1/2">
                <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                  <Summary feedback={feedback} />
                  <ATS score={feedback.ATS?.score || 0} suggestions={feedback.ATS?.tips || []} />
                  <Details feedback={feedback} />
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
  );
};

export default Resume;