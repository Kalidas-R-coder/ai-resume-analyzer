import { cn } from "~/lib/utils";

const ATS = ({
               score,
               suggestions,
             }: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  const scoreColor =
    score > 69 ? "text-[#4ADE80]" : score > 49 ? "text-[#FBBF24]" : "text-[#F87171]";
  const scoreBg =
    score > 69 ? "bg-[#4ADE80]/10" : score > 49 ? "bg-[#FBBF24]/10" : "bg-[#F87171]/10";
  const scoreBorder =
    score > 69 ? "border-[#4ADE80]/20" : score > 49 ? "border-[#FBBF24]/20" : "border-[#F87171]/20";

  return (
      <div className="rounded-2xl bg-[#111C32] border border-[#26334D] w-full p-4 sm:p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${scoreBg} border ${scoreBorder} flex items-center justify-center`}>
            {score > 69 ? (
              <svg className="w-6 h-6 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : score > 49 ? (
              <svg className="w-6 h-6 text-[#FBBF24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-[#F87171]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-xl font-semibold text-[#F8FAFC]">ATS Score</p>
            <p className={`text-2xl font-bold ${scoreColor}`}>{score}/100</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-[#F8FAFC]">
            How well does your resume pass through Applicant Tracking Systems?
          </p>
          <p className="text-sm text-[#94A3B8]">
            Your resume was scanned like an employer would. Here's how it performed:
          </p>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col gap-3">
          {suggestions.map((suggestion, index) => (
              <div className="flex items-start gap-3" key={index}>
                {suggestion.type === "good" ? (
                  <svg className="w-5 h-5 text-[#4ADE80] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-[#FBBF24] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
                  </svg>
                )}
                <p className="text-sm text-[#F8FAFC] leading-relaxed">{suggestion.tip}</p>
              </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-sm text-[#94A3B8] pt-1 border-t border-[#26334D]">
          Want a better score? Improve your resume by applying the suggestions listed above.
        </p>
      </div>
  );
};

export default ATS;