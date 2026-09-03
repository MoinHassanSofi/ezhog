export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type QuestionCount = 5 | 10;

export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
  explanation?: string;
}

export interface QuizRequest {
  topic: string;
  difficulty: DifficultyLevel;
  numQuestions: QuestionCount;
}

export interface QuizResponse {
  success: boolean;
  topic?: string;
  difficulty?: DifficultyLevel;
  numQuestions?: QuestionCount;
  questions?: Question[];
  error?: string;
}
