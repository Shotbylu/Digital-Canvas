# Digital Canvas

A portfolio website built with Next.js.

## AI portfolio assistant

The assistant uses Google's Gemini API through Genkit. Configure the server-side `GEMINI_API_KEY` environment variable using a key from [Google AI Studio](https://aistudio.google.com/apikey).

In Vercel, add `GEMINI_API_KEY` under **Project Settings → Environment Variables** for Production and Preview, then redeploy. For local development, add it to `.env.local`. Do not commit API keys to the repository.

The assistant returns curated fallback responses when the key is missing or the Gemini service is unavailable.
