'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is Quiz Generator?',
    answer:
      'Quiz Generator is an AI-powered tool that automatically creates various types of quizzes and assessments from your content. Simply upload text, documents, videos, or paste a URL, and our AI will generate relevant questions instantly.',
  },
  {
    question: 'Do I need technical skills to use it?',
    answer:
      'Not at all! Our quiz generator is designed to be user-friendly and intuitive. Simply upload your content, select your preferences, and let our AI do the rest. No technical knowledge required.',
  },
  {
    question: 'Can I customize the quizzes?',
    answer:
      'Yes! You can customize various aspects including question count, difficulty level, question types (MCQ, True/False, Fill-in-blanks), and output language. You can also edit generated questions before finalizing.',
  },
  {
    question: 'Is it mobile-friendly?',
    answer:
      'Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers.',
  },
  {
    question: 'Can I track quiz results?',
    answer:
      'Yes, you can track student performance, view detailed analytics, and export results for further analysis.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-orange-50 text-[#FF7F23] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252538] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#585863]">
            Find answers to common questions about our AI-powered quiz generator.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl bg-white shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4.5 text-left font-semibold text-[#252538] flex items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#585863] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#FF7F23]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4.5 pt-1 text-xs sm:text-sm text-[#585863] leading-relaxed border-t border-gray-50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
