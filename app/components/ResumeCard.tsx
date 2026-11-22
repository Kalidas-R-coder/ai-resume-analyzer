import {Link} from "react-router";
import ScoreCircle from "./ScoreCircle";
import Navbar from "~/components/Navbar";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({resume : {id, companyName, jobTitle, feedback, imagePath}} : {resume : Resume}) => {
    const [resumeUrl, setResumeUrl] = useState('');
    const {fs} = usePuterStore();
    useEffect(() => {
        const loadResume = async() => {
            const blob = await fs.read(imagePath);
            if(!blob)   return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);

        }
        loadResume();
    }, [imagePath]);

    return (
        <Link
            to={`/resume/${id}`}
            className="group block bg-[#111C32] border border-[#26334D] rounded-2xl p-5 hover:border-[#8B5CF6]/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 cursor-pointer"
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex flex-col gap-1 min-w-0">
                    {companyName && (
                        <h2 className="text-[#F8FAFC] font-semibold text-base truncate group-hover:text-[#8B5CF6] transition-colors duration-300">
                            {companyName}
                        </h2>
                    )}
                    {jobTitle && (
                        <h3 className="text-[#94A3B8] text-sm truncate">
                            {jobTitle}
                        </h3>
                    )}
                    {!companyName && !jobTitle && (
                        <h2 className="text-[#F8FAFC] font-semibold text-base">
                            Resume
                        </h2>
                    )}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            {/* Resume preview */}
            {resumeUrl && (
                <div className="rounded-xl overflow-hidden bg-[#182238] border border-[#26334D]">
                    <img
                        src={resumeUrl}
                        alt="resume"
                        className="w-full h-[260px] sm:h-[280px] object-cover object-top"
                    />
                </div>
            )}
        </Link>
    );
};

export default ResumeCard;