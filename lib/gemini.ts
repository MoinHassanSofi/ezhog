import { DifficultyLevel, QuestionCount, Question } from '@/types/quiz';

// Primary supported Gemini model
const GEMINI_MODEL = 'gemini-3.6-flash';

/**
 * Helper to pause execution for a specified number of milliseconds
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Helper function to retrieve configured Gemini API keys (supports comma-separated keys for rate-limit rotation)
 */
function getApiKeys(): string[] {
  const rawKeyString = process.env.GEMINI_API_KEY || '';
  const keys = rawKeyString
    .split(',')
    .map((k) => k.trim())
    .filter((k) => k && k !== 'YOUR_GEMINI_API_KEY_HERE');

  return keys;
}

/**
 * Calls the Google Gemini API to generate structured multiple-choice quiz questions.
 * Supports free key rotation & automatic backoff retry to prevent rate limit errors.
 */
export async function generateQuizFromGemini(
  topic: string,
  difficulty: DifficultyLevel,
  numQuestions: QuestionCount
): Promise<Question[]> {
  const apiKeys = getApiKeys();

  if (apiKeys.length === 0) {
    throw new Error(
      'Gemini API key is not configured in server environment (.env.local). Please add a valid GEMINI_API_KEY.'
    );
  }

  const promptText = `Generate a multiple-choice quiz about the topic "${topic}" at a "${difficulty}" difficulty level with exactly ${numQuestions} questions. 
Requirements:
1. Generate exactly ${numQuestions} factual, high-quality questions specifically about "${topic}".
2. Every question must have an array of EXACTLY 4 distinct option choices.
3. Every question must have a "correctAnswer" field whose value is an EXACT match to one of the 4 option strings.
4. Every question must have an "explanation" field providing a concise, 1-sentence factual explanation of why the correct answer is right.
5. Do NOT include generic text or placeholders.`;

  const payload = {
    contents: [
      {
        parts: [{ text: promptText }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      response_mime_type: 'application/json',
      response_schema: {
        type: 'ARRAY',
        description: `Array of exactly ${numQuestions} multiple-choice questions`,
        items: {
          type: 'OBJECT',
          properties: {
            id: { type: 'INTEGER' },
            question: { type: 'STRING' },
            options: {
              type: 'ARRAY',
              items: { type: 'STRING' },
              description: 'Array of exactly 4 option strings',
              minItems: 4,
              maxItems: 4,
            },
            correctAnswer: {
              type: 'STRING',
              description: 'Exact string match to one of the options',
            },
            explanation: {
              type: 'STRING',
              description: 'Concise explanation of the correct answer',
            },
          },
          required: ['id', 'question', 'options', 'correctAnswer', 'explanation'],
        },
      },
    },
  };

  let lastErrorMessage = '';

  // Try each configured API key, and retry automatically on HTTP 429
  for (let keyIdx = 0; keyIdx < apiKeys.length; keyIdx++) {
    const currentApiKey = apiKeys[keyIdx];

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(
          `[Gemini API] Issuing request (Key #${keyIdx + 1}/${apiKeys.length}, Attempt ${attempt}) to ${GEMINI_MODEL}...`
        );

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${currentApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!rawContent) {
            throw new Error(`Gemini API model ${GEMINI_MODEL} returned an empty content response.`);
          }

          const parsedQuestions = JSON.parse(rawContent);
          console.log(
            `[Gemini API] Successfully generated ${parsedQuestions.length} questions from ${GEMINI_MODEL}.`
          );
          return parsedQuestions;
        }

        const errorData = await response.json().catch(() => ({}));
        const rawMsg = errorData?.error?.message || `HTTP ${response.status} ${response.statusText}`;

        // If rate limited (HTTP 429), pause & retry or try next API key
        if (response.status === 429 || rawMsg.toLowerCase().includes('quota exceeded')) {
          console.warn(
            `[Gemini API] Key #${keyIdx + 1} hit rate limit (HTTP 429). Attempt ${attempt}/3.`
          );
          lastErrorMessage = 'Gemini API Free Tier rate limit reached (20 req/min).';

          // If we have more keys available, switch immediately to next key
          if (keyIdx < apiKeys.length - 1) {
            console.log(`[Gemini API] Switching immediately to Key #${keyIdx + 2}...`);
            break;
          }

          // Otherwise wait 4s and retry
          if (attempt < 3) {
            console.log(`[Gemini API] Retrying in 4 seconds...`);
            await sleep(4000);
            continue;
          }
        } else {
          lastErrorMessage = `Gemini API error (${GEMINI_MODEL}): ${rawMsg}`;
          break;
        }
      } catch (err: unknown) {
        lastErrorMessage = err instanceof Error ? err.message : String(err);
        if (attempt < 3) {
          await sleep(2000);
        }
      }
    }
  }

  throw new Error(
    `${lastErrorMessage} Please wait 15-20 seconds before clicking Submit again, or add a secondary free GEMINI_API_KEY in .env.local.`
  );
}
