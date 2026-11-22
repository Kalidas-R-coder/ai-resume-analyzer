const ScoreBadge = ({ score }: { score: number }) => {
  const { bgColor, textColor, label } =
    score > 70
      ? { bgColor: "bg-[#4ADE80]/15", textColor: "text-[#4ADE80]", label: "Strong" }
      : score > 49
        ? { bgColor: "bg-[#FBBF24]/15", textColor: "text-[#FBBF24]", label: "Good Start" }
        : { bgColor: "bg-[#F87171]/15", textColor: "text-[#F87171]", label: "Needs Work" };

  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 ${bgColor} ${textColor} text-xs font-medium`}>
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;