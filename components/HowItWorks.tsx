import React from 'react';

const STEPS = [
  {
    step: '1',
    title: 'Upload Your Content',
    description: 'Upload text, documents, videos, or paste a URL',
  },
  {
    step: '2',
    title: 'Select Quiz Type',
    description: 'Choose from MCQs, True/False, Fill-in-blanks, and more',
  },
  {
    step: '3',
    title: 'Generate & Export',
    description: 'Get your quiz instantly and export in multiple formats',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252538] mb-2">
          How It Works
        </h2>
        <p className="text-base text-[#585863] mb-12">
          Generate quizzes in 3 simple steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 border-l-[3.5px] border-l-[#FF7F23] shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#FF7F23] text-white font-extrabold text-lg flex items-center justify-center mb-5 shadow-sm">
                {s.step}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#252538] mb-2.5">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#585863] leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
