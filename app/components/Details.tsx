import React from "react";
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
        ? "bg-green-100"
        : isOkay
            ? "bg-yellow-100"
            : "bg-red-100";

    const textClass = isGood
        ? "text-green-700"
        : isOkay
            ? "text-yellow-700"
            : "text-red-700";

    const icon = isGood ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ) : isOkay ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
        </svg>
    ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium",
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
        <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-gray-800">{title}</p>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

const CategoryContent = ({ tips }: { tips: Tip[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {/* Two-column grid for tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                        {tip.type === "good" ? (
                            <img
                                src="/icons/check.svg"
                                alt="Check"
                                className="w-5 h-5 mt-0.5 flex-shrink-0"
                            />
                        ) : (
                            <img
                                src="/icons/warning.svg"
                                alt="Warning"
                                className="w-5 h-5 mt-0.5 flex-shrink-0"
                            />
                        )}
                        <span className="text-sm text-gray-700">{tip.tip}</span>
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
                                ? "bg-green-50 border-green-200 text-green-800"
                                : "bg-orange-50 border-orange-200 text-orange-800"
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
        <div className="rounded-2xl shadow-md w-full bg-white p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Feedback</h2>
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