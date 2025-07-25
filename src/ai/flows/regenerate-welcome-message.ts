'use server';
/**
 * @fileOverview A welcome message regeneration AI agent.
 *
 * - regenerateWelcomeMessage - A function that handles the welcome message regeneration process.
 * - RegenerateWelcomeMessageInput - The input type for the regenerateWelcomeMessage function.
 * - RegenerateWelcomeMessageOutput - The return type for the regenerateWelcomeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RegenerateWelcomeMessageInputSchema = z.object({
  currentMessage: z
    .string()
    .describe('The current welcome message to be regenerated.'),
});
export type RegenerateWelcomeMessageInput = z.infer<
  typeof RegenerateWelcomeMessageInputSchema
>;

const RegenerateWelcomeMessageOutputSchema = z.object({
  newMessage: z.string().describe('The newly generated welcome message.'),
});
export type RegenerateWelcomeMessageOutput = z.infer<
  typeof RegenerateWelcomeMessageOutputSchema
>;

export async function regenerateWelcomeMessage(
  input: RegenerateWelcomeMessageInput
): Promise<RegenerateWelcomeMessageOutput> {
  return regenerateWelcomeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regenerateWelcomeMessagePrompt',
  input: {schema: RegenerateWelcomeMessageInputSchema},
  output: {schema: RegenerateWelcomeMessageOutputSchema},
  prompt: `You are a creative AI assistant tasked with regenerating welcome messages for a web application.

The user has requested a new welcome message to replace the current one. The goal is to provide a fresh and engaging message that is different from the original but still relevant to a general audience.

Current Message: {{{currentMessage}}}

Generate a new welcome message:`,
});

const regenerateWelcomeMessageFlow = ai.defineFlow(
  {
    name: 'regenerateWelcomeMessageFlow',
    inputSchema: RegenerateWelcomeMessageInputSchema,
    outputSchema: RegenerateWelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
