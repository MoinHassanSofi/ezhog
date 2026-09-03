import React from 'react';

const STATS = [
  {
    number: '2.5M+',
    label: 'MCQ Generated',
    color: 'text-orange-500',
  },
  {
    number: '1.5M+',
    label: 'True/False Generated',
    color: 'text-blue-600',
  },
  {
    number: '300K+',
    label: 'Hours Saved',
    color: 'text-emerald-500',
  },
  {
    number: '150K+',
    label: 'Trusted Users',
    color: 'text-purple-600',
  },
];

export const StatCounters: React.FC = () => {
  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight ${stat.color} mb-1`}>
                {stat.number}
              </span>
              <span className="text-sm font-semibold text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
