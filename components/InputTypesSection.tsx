import React from 'react';
import { FileText, Video, Link2, Presentation, Upload } from 'lucide-react';

const INPUT_FEATURES = [
  {
    icon: FileText,
    title: 'Text & Documents',
    description: 'Word docs, PDFs, text files, and more',
    iconBg: 'bg-blue-100 text-blue-600',
    isActive: true,
  },
  {
    icon: Video,
    title: 'Videos & Audio',
    description: 'MP4, YouTube links, audio transcriptions',
    iconBg: 'bg-red-100 text-red-500',
    isActive: false,
  },
  {
    icon: Link2,
    title: 'Website URLs',
    description: 'Any webpage content, articles, blogs',
    iconBg: 'bg-emerald-100 text-emerald-600',
    isActive: false,
  },
  {
    icon: Presentation,
    title: 'PPT Upload',
    description: 'PowerPoint presentations and slides',
    iconBg: 'bg-purple-100 text-purple-600',
    isActive: false,
  },
];

export const InputTypesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252538] mb-3">
            Support for Multiple Input Types
          </h2>
          <p className="text-base text-[#585863] max-w-2xl mx-auto">
            Upload any type of content and our AI will automatically process it to generate relevant quizzes and flashcards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 4 Feature Cards matching Target Screenshot */}
          <div className="lg:col-span-6 space-y-3.5">
            {INPUT_FEATURES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl transition-all duration-300 flex items-center space-x-4 ${
                    item.isActive
                      ? 'bg-white border border-gray-100 shadow-md shadow-gray-200/50'
                      : 'bg-white/60 border border-gray-100/70 hover:border-gray-200 hover:bg-white'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#252538]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#585863] mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Illustration Box matching Target Screenshot */}
          <div className="lg:col-span-6">
            <div className="bg-[#FFF4EC] rounded-3xl p-6 sm:p-8 border border-orange-100/80 shadow-2xs relative min-h-[380px] flex flex-col justify-between overflow-hidden">
              {/* Top-left Uploading Badge */}
              <div className="flex justify-start">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white text-[#FF7F23] shadow-2xs border border-orange-100">
                  <Upload className="w-3.5 h-3.5 text-[#FF7F23]" />
                  <span>Uploading...</span>
                </span>
              </div>

              {/* Central Vector Illustration matching Target Screenshot */}
              <div className="bg-white rounded-2xl p-6 my-4 shadow-xs border border-orange-100/50 flex flex-col items-center justify-center relative min-h-[190px]">
                {/* SVG Document & Quiz Vector Graphic */}
                <div className="flex items-center justify-center gap-6">
                  {/* Document Graphic */}
                  <div className="w-16 h-20 rounded-xl border-4 border-[#FF7F23] bg-orange-50/50 flex flex-col items-center justify-center space-y-1.5 shadow-2xs">
                    <div className="w-8 h-1.5 rounded-full bg-[#FF7F23]" />
                    <div className="w-10 h-1.5 rounded-full bg-[#FF7F23]/60" />
                    <div className="w-6 h-1.5 rounded-full bg-[#FF7F23]/40" />
                  </div>

                  {/* Arrow Graphic */}
                  <div className="text-[#FF7F23] text-2xl font-black">➔</div>

                  {/* Quiz Window Graphic */}
                  <div className="w-20 h-16 rounded-xl border-3 border-[#FF7F23] bg-white p-2 flex flex-col justify-between shadow-2xs">
                    <div className="flex items-center justify-between border-b border-orange-100 pb-1">
                      <div className="w-2 h-2 rounded-full bg-[#FF7F23]" />
                      <span className="text-[10px] font-bold text-[#FF7F23]">✨ ?</span>
                    </div>
                    <div className="space-y-1">
                      <div className="w-full h-1 bg-orange-200 rounded-full" />
                      <div className="w-3/4 h-1 bg-orange-200 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Bottom-right Processing Badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white text-gray-700 shadow-2xs border border-gray-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Processing</span>
                  </span>
                </div>
              </div>

              {/* Bottom Overlay Stats Bar matching Target Screenshot */}
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100/80 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-black text-[#FF7F23]">50+</div>
                  <div className="text-[11px] text-[#585863] font-semibold">File Types</div>
                </div>
                <div className="border-x border-gray-100">
                  <div className="text-lg font-black text-[#10B981]">99%</div>
                  <div className="text-[11px] text-[#585863] font-semibold">Accuracy</div>
                </div>
                <div>
                  <div className="text-lg font-black text-[#8B5CF6]">&lt;5min</div>
                  <div className="text-[11px] text-[#585863] font-semibold">Processing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
