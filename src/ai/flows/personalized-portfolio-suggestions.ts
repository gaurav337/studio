'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized portfolio content suggestions.
 *
 * The flow takes user background information and the 'Cosmic Architect' theme as input
 * and provides suggestions for customizing portfolio content, such as skill descriptions and project summaries.
 *
 * @param {PersonalizedPortfolioSuggestionsInput} input - The input to the flow.
 * @returns {Promise<PersonalizedPortfolioSuggestionsOutput>} - A promise that resolves to the suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedPortfolioSuggestionsInputSchema = z.object({
  background: z
    .string()
    .describe(
      'A description of the user\u2019s background, including skills, experience, and projects.'
    ),
  theme: z
    .string()
    .describe(
      'The overall theme of the portfolio, which is \'Cosmic Architect.\
This theme blends the precision of code with the vast, awe-inspiring nature of the cosmos. '
    ),
});
export type PersonalizedPortfolioSuggestionsInput = z.infer<
  typeof PersonalizedPortfolioSuggestionsInputSchema
>;

const PersonalizedPortfolioSuggestionsOutputSchema = z.object({
  skillDescriptionSuggestions: z
    .array(z.string())
    .describe(
      'Suggestions for describing skills in a way that aligns with the Cosmic Architect theme.'
    ),
  projectSummarySuggestions: z
    .array(z.string())
    .describe(
      'Suggestions for summarizing projects in a way that aligns with the Cosmic Architect theme.'
    ),
});
export type PersonalizedPortfolioSuggestionsOutput = z.infer<
  typeof PersonalizedPortfolioSuggestionsOutputSchema
>;

export async function generatePortfolioSuggestions(
  input: PersonalizedPortfolioSuggestionsInput
): Promise<PersonalizedPortfolioSuggestionsOutput> {
  return personalizedPortfolioSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedPortfolioSuggestionsPrompt',
  input: {schema: PersonalizedPortfolioSuggestionsInputSchema},
  output: {schema: PersonalizedPortfolioSuggestionsOutputSchema},
  prompt: `You are a portfolio content strategist specializing in creating compelling narratives for software engineers.

  Given the user's background and the overall 'Cosmic Architect' theme, provide suggestions for customizing their portfolio content.

  Background: {{{background}}}
  Theme: {{{theme}}}

  Provide specific and actionable suggestions for skill descriptions and project summaries that align with the Cosmic Architect theme.

  Skill Description Suggestions:
  - Suggestion 1
  - Suggestion 2

  Project Summary Suggestions:
  - Suggestion 1
  - Suggestion 2`,
});

const personalizedPortfolioSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedPortfolioSuggestionsFlow',
    inputSchema: PersonalizedPortfolioSuggestionsInputSchema,
    outputSchema: PersonalizedPortfolioSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
