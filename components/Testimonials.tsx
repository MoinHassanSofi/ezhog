import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    quote:
      '"The Quiz Generator has completely simplified our training process. I can create interactive quizzes in minutes, and my team loves the engaging format."',
    name: 'Emily Thompson',
    title: 'Innovative Tech',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    quote:
      '"I\'ve tried several quiz tools before, but this one is by far the easiest to use. It\'s intuitive, fast, and lets me customize every detail."',
    name: 'Michael Brown',
    title: 'Global Solutions',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  {
    quote:
      '"This tool saves me hours of work every week. My students find the quizzes fun and interactive, and I love how professional they look."',
    name: 'Lisa Chen',
    title: 'Creative Studios',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          What Ours Customer Are Saying About Us
        </h2>
        <p className="text-base text-slate-600 max-w-2xl mx-auto mb-12">
          See what our customers are saying about us - real stories and reviews that show how our tools make their work easier and more successful.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between text-left"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {rev.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-500">{rev.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
