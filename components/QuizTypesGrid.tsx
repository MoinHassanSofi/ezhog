import React from 'react';
import { BookOpen, CheckSquare, FileText, Share2 } from 'lucide-react';

const QUIZ_TYPES = [
  {
    icon: BookOpen,
    title: 'Multiple Choice Questions',
    description:
      'Generate MCQs with single or multiple correct answers instantly',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
  },
  {
    icon: CheckSquare,
    title: 'True/False Questions',
    description:
      'Create engaging true/false assessments from any content',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    icon: FileText,
    title: 'Fill-in-the-Blanks',
    description:
      'Generate cloze tests and fill-in-the-blank questions',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
  },
  {
    icon: Share2,
    title: 'Class set Google Forms, print, or PDF',
    description:
      'Export to Google Forms, print-ready PDFs, or share directly with students.',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
  },
];

export const QuizTypesGrid: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          The Ultimate AI Question Generator
        </h2>
        <p className="text-base text-slate-600 max-w-3xl mx-auto mb-12">
          Generate various kinds of assessments like MCQs, True/False Questions, Fill-in-the-blanks, Higher-Order Questions, and Bloom's taxonomy quizzes in one click.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUIZ_TYPES.map((type, idx) => {
            const Icon = type.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${type.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {type.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
