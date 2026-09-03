import { DifficultyLevel, QuestionCount, Question, QuizRequest } from '@/types/quiz';

/**
 * Validates request payload sent to POST /api/quiz/generate
 */
export function validateQuizRequest(body: any): {
  isValid: boolean;
  error?: string;
  data?: QuizRequest;
} {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'Invalid JSON request payload.' };
  }

  const { topic, difficulty, numQuestions } = body;

  // 1. Validate topic: non-empty string between 2 and 100 characters
  if (typeof topic !== 'string' || !topic.trim()) {
    return { isValid: false, error: 'Topic is required.' };
  }
  const trimmedTopic = topic.trim();
  if (trimmedTopic.length < 2 || trimmedTopic.length > 100) {
    return {
      isValid: false,
      error: 'Topic must be a string between 2 and 100 characters in length.',
    };
  }

  // 2. Validate difficulty: Easy, Medium, or Hard
  const validDifficulties: DifficultyLevel[] = ['Easy', 'Medium', 'Hard'];
  if (!validDifficulties.includes(difficulty)) {
    return {
      isValid: false,
      error: 'Difficulty must be one of: "Easy", "Medium", or "Hard".',
    };
  }

  // 3. Validate numQuestions: 5 or 10
  const validCounts: QuestionCount[] = [5, 10];
  if (!validCounts.includes(numQuestions)) {
    return {
      isValid: false,
      error: 'Number of questions must be either 5 or 10.',
    };
  }

  return {
    isValid: true,
    data: {
      topic: trimmedTopic,
      difficulty,
      numQuestions,
    },
  };
}

/**
 * Strictly post-validates the response returned from Gemini API
 */
export function validateAndSanitizeQuestions(
  rawQuestions: any[],
  requestedCount: QuestionCount
): Question[] {
  if (!Array.isArray(rawQuestions)) {
    throw new Error('AI response is not a valid JSON array.');
  }

  if (rawQuestions.length !== requestedCount) {
    throw new Error(
      `AI response contained ${rawQuestions.length} questions, but ${requestedCount} were requested.`
    );
  }

  const sanitizedQuestions: Question[] = [];

  for (let i = 0; i < rawQuestions.length; i++) {
    const q = rawQuestions[i];

    if (!q || typeof q !== 'object') {
      throw new Error(`Question #${i + 1} is invalid or null.`);
    }

    // Validate question text
    if (typeof q.question !== 'string' || !q.question.trim()) {
      throw new Error(`Question #${i + 1} is missing valid question text.`);
    }

    // Validate options: must be array of exactly 4 strings
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(
        `Question #${i + 1} does not contain exactly 4 option choices.`
      );
    }

    const options = q.options.map((opt: any) => String(opt).trim());
    if (options.some((opt: string) => !opt)) {
      throw new Error(`Question #${i + 1} contains empty option strings.`);
    }

    // Validate correct answer
    let correctAnswer = q.correctAnswer;

    // Handle case where AI returns option index (0..3) instead of string
    if (typeof correctAnswer === 'number' && correctAnswer >= 0 && correctAnswer < 4) {
      correctAnswer = options[correctAnswer];
    } else if (typeof correctAnswer === 'string') {
      correctAnswer = correctAnswer.trim();
    }

    // Assert that correctAnswer matches one of the 4 options
    if (!options.includes(correctAnswer)) {
      throw new Error(
        `Question #${i + 1} correct answer "${correctAnswer}" does not match any of the 4 options: [${options.join(', ')}].`
      );
    }

    sanitizedQuestions.push({
      id: typeof q.id === 'number' ? q.id : i + 1,
      question: q.question.trim(),
      options: options as [string, string, string, string],
      correctAnswer: correctAnswer,
      explanation: typeof q.explanation === 'string' && q.explanation.trim()
        ? q.explanation.trim()
        : `The correct answer is "${correctAnswer}".`,
    });
  }

  return sanitizedQuestions;
}
