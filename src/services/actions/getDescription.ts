'use server';

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function getDescription(title: string) {
  const { text, finishReason, usage } = await generateText({
    model:  google('gemini-1.5-flash-latest'),
    system: 'Generate a short description based solely on the provided title. Do not ask any questions or request additional information. Simply provide a description of what the task could involve.',
    prompt: title,
  });

  return { text, finishReason, usage };
}