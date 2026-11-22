import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({title, score} : {title :string, score: number}) => {
  const scoreColor = score > 70 ? 'text-[#4ADE80]' : score > 49 ? 'text-[#FBBF24]' : 'text-[#F87171]';
  return (
    <div className="rounded-xl bg-[#182238] border border-[#26334D] p-4 hover:border-[#8B5CF6]/30 transition-all duration-300">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <p className="text-base font-medium text-[#F8FAFC]">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-lg font-semibold text-[#F8FAFC] flex-shrink-0">
          <span className={scoreColor}>{score}</span><span className="text-[#94A3B8]">/100</span>
        </p>
      </div>
    </div>
  )
}

const Summary = ({feedback} : {feedback: Feedback}) => {
  return (
    <div className="rounded-2xl bg-[#111C32] border border-[#26334D] w-full overflow-hidden">
      <div className="flex items-center p-6 gap-6">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-[#F8FAFC]">Your Resume Score</h2>
          <p className="text-sm text-[#94A3B8]">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-3">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
}

export default Summary;