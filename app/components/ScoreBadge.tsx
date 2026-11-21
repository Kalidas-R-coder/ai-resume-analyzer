const ScoreBadge = ({ score }: { score: number }) => {
  const { bgColor, textColor, label } =
    score > 70
      ? { bgColor: "bg-green-100", textColor: "text-green-700", label: "Strong" }
      : score > 49
        ? { bgColor: "bg-yellow-100", textColor: "text-yellow-700", label: "Good Start" }
        : { bgColor: "bg-red-100", textColor: "text-red-700", label: "Needs Work" };

  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1 ${bgColor} ${textColor} text-sm font-medium`}>
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;