'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroQuizForm } from '@/components/HeroQuizForm';
import { StatCounters } from '@/components/StatCounters';
import { QuizTypesGrid } from '@/components/QuizTypesGrid';
import { HowItWorks } from '@/components/HowItWorks';
import { InputTypesSection } from '@/components/InputTypesSection';
import { Testimonials } from '@/components/Testimonials';
import { FAQSection } from '@/components/FAQSection';
import { CtaBanner } from '@/components/CtaBanner';
import { RelatedQuizzes } from '@/components/RelatedQuizzes';
import { Footer } from '@/components/Footer';
import { Question, QuizRequest } from '@/types/quiz';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [activeQuizInfo, setActiveQuizInfo] = useState<{
    topic: string;
    difficulty: string;
    numQuestions: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerateQuiz = async (params: QuizRequest) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || 'An unexpected error occurred while generating the quiz.'
        );
      }

      setQuestions(data.questions);
      setActiveQuizInfo({
        topic: data.topic || params.topic,
        difficulty: data.difficulty || params.difficulty,
        numQuestions: data.numQuestions || params.numQuestions,
      });

      // Smooth scroll to results panel
      setTimeout(() => {
        const questionsElem = document.getElementById('questions-panel');
        if (questionsElem) {
          questionsElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Quiz Generation Error:', err);
      setErrorMessage(
        err.message || 'Failed to generate quiz. Please check your network and API key.'
      );
      setQuestions(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header / Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Two-Column Hero Section & Form */}
        <HeroQuizForm
          onGenerateQuiz={handleGenerateQuiz}
          isLoading={isLoading}
          questions={questions}
          activeQuizInfo={activeQuizInfo}
        />

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start space-x-3 shadow-xs">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Generation Error</h4>
                <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Banner */}
        <StatCounters />

        {/* Quiz Types (The Ultimate AI Question Generator) */}
        <QuizTypesGrid />

        {/* How It Works */}
        <HowItWorks />

        {/* Support for Multiple Input Types */}
        <InputTypesSection />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Ready to Create Quizzes CTA */}
        <CtaBanner />

        {/* Related Quizzes */}
        <RelatedQuizzes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
