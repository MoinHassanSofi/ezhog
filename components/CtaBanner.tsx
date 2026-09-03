import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-16 bg-[#FFF8F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-orange-100 relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100/70 text-[#FF7F23] rounded-full text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant AI Generation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252538] mb-3">
            Ready to Create Generate quizzes?
          </h2>
          <p className="text-base sm:text-lg text-[#585863] max-w-xl mx-auto mb-8">
            Get started today and effortlessly create engaging quizzes in minutes.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#FF7F23] hover:bg-[#E86507] text-white font-bold text-base transition-all shadow-md shadow-orange-500/20 cursor-pointer"
          >
            <span>Start for free</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
