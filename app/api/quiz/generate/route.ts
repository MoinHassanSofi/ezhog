import { NextResponse } from 'next/server';
import { validateQuizRequest, validateAndSanitizeQuestions } from '@/lib/quiz-service';
import { generateQuizFromGemini } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    // 1. Server-side Input Validation
    const validation = validateQuizRequest(body);
    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error || 'Invalid request input.',
        },
        { status: 400 }
      );
    }

    const { topic, difficulty, numQuestions } = validation.data;

    // 2. Fetch AI questions from Gemini API
    const rawQuestions = await generateQuizFromGemini(
      topic,
      difficulty,
      numQuestions
    );

    // 3. Server-side Post-Validation (Assures 4 options, valid correctAnswer, and count)
    const questions = validateAndSanitizeQuestions(rawQuestions, numQuestions);

    // 4. Return HTTP 200 OK Response
    return NextResponse.json({
      success: true,
      topic,
      difficulty,
      numQuestions,
      questions,
    });
  } catch (error: any) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error while generating quiz.',
      },
      { status: 500 }
    );
  }
}
