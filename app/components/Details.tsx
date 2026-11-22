import { cn } from "~/lib/utils";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionContent,
} from "~/components/Accordion";

type Tip = { type: "good" | "improve"; tip: string; explanation: string };

/* ────────────────────────── Helper Components ────────────────────────── */

const ScoreBadge = ({ score }: { score: number }) => {
    const isGood = score > 69;
    const isOkay = score > 39;

    const bgClass = isGood
        ? "bg-[#4ADE80]/15"
        : isOkay
            ? "bg-[#FBBF24]/15"
            : "bg-[#F87171]/15";

    const textClass = isGood
        ? "text-[#4ADE80]"
        : isOkay
            ? "text-[#FBBF24]"
            : "text-[#F87171]";

    const icon = isGood ? (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ) : isOkay ? (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
        </svg>
    ) : (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium flex-shrink-0",
                bgClass,
                textClass
            )}
        >
            {icon}
            {score}/100
        </span>
    );
};

const CategoryHeader = ({
    title,
    categoryScore,
}: {
    title: string;
    categoryScore: number;
}) => {
    return (
        <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#F8FAFC]">{title}</p>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

const CategoryContent = ({ tips }: { tips: Tip[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {/* Tips list */}
            <div className="flex flex-col gap-3">
                {tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                        {tip.type === "good" ? (
                            <svg className="w-5 h-5 text-[#4ADE80] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-[#FBBF24] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
                            </svg>
                        )}
                        <span className="text-sm text-[#F8FAFC] leading-relaxed">{tip.tip}</span>
                    </div>
                ))}
            </div>

            {/* Explanation boxes */}
            <div className="flex flex-col gap-2">
                {tips.map((tip, i) => (
                    <div
                        key={i}
                        className={cn(
                            "rounded-lg p-3 text-sm border",
                            tip.type === "good"
                                ? "bg-[#4ADE80]/5 border-[#4ADE80]/20 text-[#4ADE80]"
                                : "bg-[#FBBF24]/5 border-[#FBBF24]/20 text-[#FBBF24]"
                        )}
                    >
                        {tip.explanation}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ────────────────────────── Main Component ────────────────────────── */

const Details = ({ feedback }: { feedback: Feedback }) => {
    const categories = [
        { id: "tone-style", title: "Tone & Style", data: feedback.toneAndStyle },
        { id: "content", title: "Content", data: feedback.content },
        { id: "structure", title: "Structure", data: feedback.structure },
        { id: "skills", title: "Skills", data: feedback.skills },
    ];

    return (
        <div className="rounded-2xl bg-[#111C32] border border-[#26334D] w-full p-6">
            <div className="mb-5">
                <h2 className="text-xl font-bold text-[#F8FAFC]">Detailed Feedback</h2>
                <p className="text-sm text-[#94A3B8] mt-1">
                    In-depth analysis of each category with actionable suggestions.
                </p>
            </div>
            <Accordion>
                {categories.map(({ id, title, data }) => (
                    <AccordionItem key={id} id={id}>
                        <AccordionHeader itemId={id}>
                            <CategoryHeader title={title} categoryScore={data.score} />
                        </AccordionHeader>
                        <AccordionContent itemId={id}>
                            <CategoryContent tips={data.tips} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default Details;