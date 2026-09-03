'use client';

import React, { useState } from 'react';
import { CheckCircle2, Sparkles, HelpCircle, ChevronUp } from 'lucide-react';
import { Question } from '@/types/quiz';

interface QuestionListDisplayProps {
  questions: Question[] | null;
  topic?: string;
  difficulty?: string;
  numQuestions?: number;
  isLoading?: boolean;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export const QuestionListDisplay: React.FC<QuestionListDisplayProps> = ({
  questions,
  topic,
  difficulty,
  numQuestions,
  isLoading,
}) => {
  // State for 'Show Answers' toggle (default OFF per instructions)
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  // State for per-question 'Show Explanation' accordion toggle
  const [openExplanations, setOpenExplanations] = useState<Record<number, boolean>>({});

  const toggleExplanation = (index: number) => {
    setOpenExplanations((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // If loading, show skeleton / processing state inside right panel
  if (isLoading) {
    return (
      <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 text-left min-h-[500px] flex flex-col justify-center items-center text-center">
        <div className="w-12 h-12 rounded-full bg-orange-100 text-[#FF7F23] flex items-center justify-center mb-4 animate-bounce">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#252538] mb-1 font-['Lexend','Plus_Jakarta_Sans',sans-serif]">Generating AI Quiz...</h3>
        <p className="text-sm text-[#585863] max-w-sm font-['Lexend','Plus_Jakarta_Sans',sans-serif]">
          Processing {topic ? `"${topic}"` : 'content'} to create {numQuestions || 5} multiple-choice questions.
        </p>
      </div>
    );
  }

  // Placeholder state before quiz is generated
  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xs rounded-[28px] sm:rounded-[32px] p-8 border border-orange-100/80 text-center min-h-[480px] flex flex-col items-center justify-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF7F23] flex items-center justify-center mb-4 border border-orange-200/60 shadow-2xs">
          <HelpCircle className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-[#252538] mb-1.5 font-['Lexend','Plus_Jakarta_Sans',sans-serif]">
          Generated Quiz Panel
        </h3>
        <p className="text-xs sm:text-sm text-[#585863] max-w-xs leading-relaxed font-['Lexend','Plus_Jakarta_Sans',sans-serif]">
          Enter a topic or paste content on the left, then click <span className="font-bold text-[#FF7F23]">Submit</span> to view your AI quiz questions here.
        </p>
      </div>
    );
  }

  const totalCount = questions.length;

  return (
    <div className="bg-[#FAF6F0]/60 rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 text-left flex flex-col h-full max-h-[680px]">
      {/* Quiz Panel Header: Title + Badges + Show Answers Toggle */}
      <div className="pb-4 border-b border-gray-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#252538] tracking-tight font-['Lexend','Plus_Jakarta_Sans',sans-serif]">
            Title: {topic || 'Generated'} Quiz
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="px-2.5 py-0.5 bg-orange-50 text-[#FF7F23] border border-orange-200/70 text-[11px] font-bold rounded-full uppercase">
              {difficulty || 'Medium'}
            </span>
            <span className="px-2.5 py-0.5 bg-gray-100 text-[#585863] text-[11px] font-bold rounded-full">
              {totalCount} Questions
            </span>
          </div>
        </div>

        {/* Show Answers Toggle */}
        <div className="flex items-center gap-2 pt-2 sm:pt-0">
          <span className="text-xs font-semibold text-[#585863] font-['Lexend','Plus_Jakarta_Sans',sans-serif]">Show Answers</span>
          <button
            type="button"
            role="switch"
            aria-checked={showAnswers}
            onClick={() => setShowAnswers(!showAnswers)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              showAnswers ? 'bg-[#FF7F23]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                showAnswers ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Independent Scrollable Questions List Area matching Target Screenshots */}
      <div className="overflow-y-auto flow-scroll pt-5 pr-1 space-y-6 flex-1 min-h-0">
        {questions.map((q, index) => (
          <div
            key={q.id || index}
            className="p-1 space-y-3 font-['Lexend','Plus_Jakarta_Sans',sans-serif]"
          >
            {/* Top Orange Gradient Counter Badge (e.g. 1/3, 2/3) matching Target Screenshot */}
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7F23] to-[#FFA86B] text-white font-bold text-xs shadow-2xs">
              {index + 1}/{totalCount}
            </div>

            {/* Question Text matching Target Screenshot font & size */}
            <h3 className="text-base sm:text-[18px] font-bold text-[#252538] leading-snug font-['Lexend','Plus_Jakarta_Sans',sans-serif]">
              {q.question}
            </h3>

            {/* Single White Card containing Options A, B, C, D matching Target Screenshot */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100/80 space-y-4">
              {q.options.map((opt, optIndex) => {
                const isCorrect = opt === q.correctAnswer;
                const highlightCorrect = showAnswers && isCorrect;

                return (
                  <div
                    key={optIndex}
                    className={`flex items-start gap-2 text-sm sm:text-base font-['Lexend','Plus_Jakarta_Sans',sans-serif] transition-all ${
                      highlightCorrect
                        ? 'text-emerald-700 font-semibold'
                        : 'text-[#252538]'
                    }`}
                  >
                    <span className="font-bold shrink-0 text-[#252538]">
                      {OPTION_LABELS[optIndex]}.
                    </span>
                    <span className="font-normal text-[#252538] flex-1 leading-snug">
                      {opt}
                    </span>
                    {highlightCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Identified Correct Answer Badge - Revealed when Show Answers is ON */}
            {showAnswers && (
              <div className="flex items-center text-xs font-semibold text-emerald-700 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                <span>Identified Correct Answer:</span>
                <span className="ml-1.5 px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md font-bold text-[11px]">
                  {q.correctAnswer}
                </span>
              </div>
            )}

            {/* Show Explanation Button & Accordion matching Target Screenshot 2 */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => toggleExplanation(index)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFEAD8] hover:bg-[#FFE0C4] text-[#FF7F23] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <ChevronUp
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openExplanations[index] ? 'rotate-0' : 'rotate-180'
                  }`}
                />
                <span>{openExplanations[index] ? 'Hide Explanation' : 'Show Explanation'}</span>
              </button>

              {openExplanations[index] && (
                <p className="text-xs sm:text-sm text-[#252538] font-normal leading-relaxed mt-2.5 pl-1 font-['Lexend','Plus_Jakarta_Sans',sans-serif]">
                  {q.explanation || `Shah Jahan commissioned the Taj Mahal in memory of his wife Mumtaz Mahal.`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
