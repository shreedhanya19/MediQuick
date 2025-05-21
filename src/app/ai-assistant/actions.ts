"use server";

import { aiHealthAssistant, type AiHealthAssistantInput, type AiHealthAssistantOutput } from "@/ai/flows/ai-health-assistant";

export async function getAIHealthAdviceAction(input: AiHealthAssistantInput): Promise<AiHealthAssistantOutput> {
  try {
    const result = await aiHealthAssistant(input);
    return result;
  } catch (error) {
    console.error("Error getting AI health advice:", error);
    // It's better to return a structured error or throw a specific error type
    // For now, returning a generic error message in the component is preferred.
    // Here, we re-throw or return a specific error structure.
    // For simplicity of client handling, return error in answer.
    return { answer: "Sorry, I couldn't process your request: " + (error instanceof Error ? error.message : "Unknown error") };
  }
}
