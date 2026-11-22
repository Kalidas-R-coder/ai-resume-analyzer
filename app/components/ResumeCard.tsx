import {Link} from "react-router";
import ScoreCircle from "./ScoreCircle";
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
            className="group block bg-[#111C32] border border-[#26334D] rounded-2xl overflow-hidden hover:border-[#8B5CF6]/50 hover:shadow-[0_0_24px_rgba(139,92,246,0.2)] transition-all duration-300 cursor-pointer"
        >
            {/* Header */}
            <div className="p-4 sm:p-5 pb-0">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                        {companyName && (
                            <h2 className="text-[#F8FAFC] font-semibold text-base leading-snug group-hover:text-[#8B5CF6] transition-colors duration-300 line-clamp-2">
                                {companyName}
                            </h2>
                        )}
                        {jobTitle && (
                            <h3 className="text-[#94A3B8] text-sm leading-snug line-clamp-2">
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
            </div>

            {/* Resume preview */}
            {resumeUrl && (
                <div className="p-3 sm:p-4">
                    <div className="rounded-xl overflow-hidden bg-[#182238] border border-[#26334D]">
                        <div className="overflow-hidden">
                            <img
                                src={resumeUrl}
                                alt={`Resume for ${companyName || 'position'}`}
                                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            )}
        </Link>
    );
};

export default ResumeCard;