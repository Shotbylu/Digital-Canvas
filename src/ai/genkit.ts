import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// The Google GenAI plugin reads GEMINI_API_KEY from the server environment.
// Keep the key in Vercel's encrypted environment variables, never in source.
export const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-3.8-flash'),
});
