import React from 'react';
import { ChevronRight } from 'lucide-react';

const RELATED_TAGS = [
  'Text to Quiz',
  'PDF to Quiz',
  'URL to Quiz',
  'Video to Quiz',
  'YouTube to Quiz',
  'Image to Quiz',
  'Audio to Quiz',
  'Keyword to Quiz',
  'News to Quiz',
  'Matching Quiz',
];

export const RelatedQuizzes: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 ez-card-shadow">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-8">
            Explore Related Quiz
          </h3>

          <div className="flex flex-wrap gap-4">
            {RELATED_TAGS.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                className="px-6 py-3 rounded-full bg-[#FFF0E6] hover:bg-[#FFE3D1] text-slate-800 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{tag}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
