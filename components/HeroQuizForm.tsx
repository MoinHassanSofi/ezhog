'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Plus, ChevronDown } from 'lucide-react';
import { DifficultyLevel, QuestionCount, Question, QuizRequest } from '@/types/quiz';
import { QuestionListDisplay } from '@/components/QuestionListDisplay';

interface HeroQuizFormProps {
  onGenerateQuiz: (params: QuizRequest) => void;
  isLoading: boolean;
  questions?: Question[] | null;
  activeQuizInfo?: {
    topic: string;
    difficulty: string;
    numQuestions: number;
  } | null;
}

// Exact rotating sequence specified by user: PDFs -> images -> videos -> audio -> text -> PDFs
const ANIMATED_WORDS = ['PDFs', 'images', 'videos', 'audio', 'text'];

// Rotating placeholder sequence matching target site
const ROTATING_PLACEHOLDERS = [
  'Enter your content here...',
  'Paste a website URL...',
  'Drop a topic to generate questions...',
  'Paste a YouTube video link or text excerpt...',
];

// Sample quick pills
const SAMPLE_TOPICS = [
  'General Knowledge Quiz',
  'Science & Technology Quiz',
  'Personality & Fun Quiz',
];

export const HeroQuizForm: React.FC<HeroQuizFormProps> = ({
  onGenerateQuiz,
  isLoading,
  questions,
  activeQuizInfo,
}) => {
  const [topic, setTopic] = useState<string>('');
  const [questionType, setQuestionType] = useState<string>('MCQ');
  const [mcqOptionCount, setMcqOptionCount] = useState<string>('4');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');
  const [numQuestions, setNumQuestions] = useState<QuestionCount>(5);
  const [outputLanguage, setOutputLanguage] = useState<string>('Auto');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Animated heading word
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  // Animated input placeholder
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);

  // 1. Cycle animated hero heading word (PDFs -> images -> videos -> audio -> text -> PDFs)
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % ANIMATED_WORDS.length);
        setFadeState('in');
      }, 200);
    }, 2400);

    return () => clearInterval(wordInterval);
  }, []);

  // 2. Cycle input placeholder
  useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % ROTATING_PLACEHOLDERS.length);
    }, 3200);

    return () => clearInterval(placeholderInterval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setErrorMsg('Please enter a topic or paste a URL/content.');
      return;
    }
    setErrorMsg(null);
    onGenerateQuiz({
      topic: topic.trim(),
      difficulty,
      numQuestions,
    });
  };

  const handleSelectSample = (sample: string) => {
    setTopic(sample.replace(' Quiz', ''));
    setErrorMsg(null);
  };

  const hasActiveResults = isLoading || (questions && questions.length > 0);

  // Form inner JSX to avoid duplication
  const renderFormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Input Pill Box with Animated Flowing Border & Orange + Sign */}
      <div>
        <div className="rounded-full p-[2px] flowing-border">
          <div className="relative flex items-center rounded-full bg-white px-4 py-2.5 shadow-2xs">
            <Plus className="w-5 h-5 text-[#FF7F23] shrink-0 mr-3 stroke-[3]" />
            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
              className="w-full py-1 text-[#252538] placeholder-gray-400 bg-transparent focus:outline-none text-sm sm:text-base font-normal"
            />
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-xs font-semibold mt-2 pl-4">
            {errorMsg}
          </p>
        )}
      </div>

      {/* 2-Row Control Layout matching target screenshot */}
      <div className="space-y-5 pt-1">
        {/* Row 1: Question Type (MCQ) | MCQ Option Count (4) | Difficulty Level (Medium) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Question Type */}
          <div>
            <label className="block text-xs font-semibold text-[#252538] mb-1.5">
              Question Type
            </label>
            <div className="relative">
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#252538] focus:outline-none focus:border-[#FF7F23] cursor-pointer appearance-none pr-7"
              >
                <option value="MCQ">MCQ</option>
                <option value="True/False">True/False</option>
                <option value="Fill-in-the-Blanks">Fill-in-the-Blanks</option>
                <option value="Open-Ended">Open-Ended</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* MCQ Option Count */}
          <div>
            <label className="block text-xs font-semibold text-[#252538] mb-1.5">
              MCQ Option Count
            </label>
            <div className="relative">
              <select
                value={mcqOptionCount}
                onChange={(e) => setMcqOptionCount(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#252538] focus:outline-none focus:border-[#FF7F23] cursor-pointer appearance-none pr-7"
              >
                <option value="4">4</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-xs font-semibold text-[#252538] mb-1.5">
              Difficulty Level
            </label>
            <div className="relative">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#252538] focus:outline-none focus:border-[#FF7F23] cursor-pointer appearance-none pr-7"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: Question Count (5 / 10) | Output Language (Auto) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Question Count (Assignment strictly requires choices 5 and 10) */}
          <div>
            <label className="block text-xs font-semibold text-[#252538] mb-1.5">
              Question Count
            </label>
            <div className="relative">
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value) as QuestionCount)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#252538] focus:outline-none focus:border-[#FF7F23] cursor-pointer appearance-none pr-7"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Output Language */}
          <div>
            <label className="block text-xs font-semibold text-[#252538] mb-1.5">
              Output Language
            </label>
            <div className="relative">
              <select
                value={outputLanguage}
                onChange={(e) => setOutputLanguage(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#252538] focus:outline-none focus:border-[#FF7F23] cursor-pointer appearance-none pr-7"
              >
                <option value="Auto">Auto</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Pill Button matching Target Screenshot */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-6 rounded-full bg-[#FF7F23] hover:bg-[#E86507] disabled:bg-orange-300 text-white font-extrabold text-base transition-all shadow-md shadow-orange-500/20 flex items-center justify-center cursor-pointer mt-5"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-white mr-2" />
            <span>Generating AI Quiz...</span>
          </>
        ) : (
          <span>Submit</span>
        )}
      </button>
    </form>
  );

  return (
    <section className="relative pt-10 pb-20 bg-[#FDF6ED] border-b border-orange-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Announcement Pill Badge - Default Peach/Orange outline -> Solid Vibrant Orange with White text on Hover */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFEAD8] text-[#C45500] border border-[#FF7F23]/50 hover:bg-[#FF7F23] hover:text-white hover:border-[#FF7F23] rounded-full text-xs sm:text-sm font-bold mb-6 transition-all duration-200 cursor-pointer select-none shadow-2xs hover:shadow-md hover:shadow-orange-500/20">
          <span className="text-sm">🎉</span>
          <span>New: AI-Powered Quiz Generation</span>
        </div>

        {/* Main Heading matching target screenshot */}
        <h1 className="text-4xl sm:text-[56px] font-[800] text-[#252538] tracking-tight mb-4 leading-[1.12] text-center">
          {/* Line 1: Completely static */}
          <div className="block">
            Free AI Quiz Generator
          </div>

          {/* Line 2: 'from ' is completely frozen in place, word container is text-left fixed width */}
          <div className="flex items-center justify-center mt-1">
            <span className="shrink-0 font-[800] text-[#252538]">from&nbsp;</span>
            <span className="relative inline-block text-[#FF7F23] font-[800] text-left w-[3.5em] sm:w-[3.8em] shrink-0 overflow-visible">
              <span
                className={`inline-block transition-all duration-300 transform ${fadeState === 'in'
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 -translate-y-1 scale-95'
                  }`}
              >
                {ANIMATED_WORDS[wordIndex]}
              </span>
            </span>
          </div>
        </h1>

        {/* Subtitle matching target screenshot */}
        <p className="text-base sm:text-[17px] text-[#585863] max-w-[640px] mx-auto mb-10 leading-[1.6]">
          Upload text, Word docs, PDFs, images, audio, video — or just paste a website URL — all processed in 1-click.
        </p>

        {/* CONDITIONAL LAYOUT: Single Centered Card initially (Screenshot 2), 2-Column Grid when active (Screenshot 1) */}
        {!hasActiveResults ? (
          /* INITIAL LANDING STATE: Single Centered Form Card (Screenshot 2) */
          <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/90 text-left max-w-[760px] mx-auto">
            {renderFormContent()}

            {/* Quick sample pills matching target page */}
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs font-semibold text-[#8B8B97] mb-2.5 uppercase tracking-wider">
                OR, TRY AI GENERATE SAMPLE
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {SAMPLE_TOPICS.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50/60 hover:bg-orange-100 text-[#FF7F23] font-medium text-xs transition-colors cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* GENERATED / ACTIVE STATE: 2-Column Side-by-Side Layout (Screenshot 1) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left max-w-7xl mx-auto">
            {/* Left Column: Generator Card Controls */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/90 text-left">
                {renderFormContent()}

                <div className="mt-5 pt-4 border-t border-gray-100/80 text-center">
                  <p className="text-[11px] font-semibold text-[#585863] mb-2.5 uppercase tracking-wider">
                    OR, TRY AI GENERATE SAMPLE
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {SAMPLE_TOPICS.map((sample) => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => handleSelectSample(sample)}
                        className="px-3.5 py-1.5 rounded-full border border-[#FF7F23] bg-white hover:bg-[#FF7F23] text-[#252538] hover:text-white font-bold text-xs transition-all duration-200 cursor-pointer shadow-none"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Quiz Results Panel */}
            <div className="lg:col-span-7 w-full min-h-[480px]">
              <QuestionListDisplay
                questions={questions || null}
                topic={activeQuizInfo?.topic}
                difficulty={activeQuizInfo?.difficulty}
                numQuestions={activeQuizInfo?.numQuestions}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
