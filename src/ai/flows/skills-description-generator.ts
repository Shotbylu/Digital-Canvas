'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a bullet-point description of skills.
 *
 * The flow takes a list of skills as input and returns a string containing a bullet-point description of those skills.
 * - `generateSkillsDescription` - A function that generates the description of skills.
 * - `SkillsDescriptionInput` - The input type for the `generateSkillsDescription` function.
 * - `SkillsDescriptionOutput` - The output type for the `generateSkillsDescription` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillsDescriptionInputSchema = z.object({
  skills: z.array(z.string()).describe('A list of skills to describe.'),
});
export type SkillsDescriptionInput = z.infer<typeof SkillsDescriptionInputSchema>;

const SkillsDescriptionOutputSchema = z.object({
  description: z.string().describe('A bullet-point description of the skills.'),
});
export type SkillsDescriptionOutput = z.infer<typeof SkillsDescriptionOutputSchema>;

export async function generateSkillsDescription(input: SkillsDescriptionInput): Promise<SkillsDescriptionOutput> {
  return skillsDescriptionGeneratorFlow(input);
}

const skillsDescriptionPrompt = ai.definePrompt({
  name: 'skillsDescriptionPrompt',
  input: {schema: SkillsDescriptionInputSchema},
  output: {schema: SkillsDescriptionOutputSchema},
  prompt: `You are an expert resume writer. Please generate a bullet-point description of the following skills:\n\n{{#each skills}}- {{this}}\n{{/each}}\n\nThe description should be concise and highlight the key strengths of each skill.`,
});

const skillsDescriptionGeneratorFlow = ai.defineFlow(
  {
    name: 'skillsDescriptionGeneratorFlow',
    inputSchema: SkillsDescriptionInputSchema,
    outputSchema: SkillsDescriptionOutputSchema,
  },
  async input => {
    const {output} = await skillsDescriptionPrompt(input);
    return output!;
  }
);
