import { AgentRequest } from "@/app/types/api";
import { NextResponse } from "next/server";
import { createAgent } from "../agent/create-agent";
import { Message, generateId, generateText } from "ai";
import { freshEntropy } from '../orbitport/utils'

export type OmiResponse = { response?: string; error?: string };

/**
 * Handles incoming POST requests to interact with the AgentKit-powered AI agent.
 * This function processes user messages and streams responses from the agent.
 *
 * @function POST
 * @param {Request & { json: () => Promise<any> }} req - The incoming request object containing the user message.
 * @returns {Promise<NextResponse<any>>} JSON response containing the AI-generated reply or an error message.
 *
 * @description Sends a single message to the agent and returns the agents' final response.
 *
 * @example
 * const response = await fetch("/api/agent", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ userMessage: input }),
 * });
 */
export async function POST(
  req: Request & { json: () => Promise<AgentRequest> },
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<NextResponse<any>> {
  try {
    // 1️. Extract user message from the request body
    const { segments } = await req.json();

    // 2. Get the agent
    const agent = await createAgent();

    // 2.1 Get entropy
    const entropy = await freshEntropy();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userMessage = segments.map((s: any) => s.text).join(" ");

    // 3.Start streaming the agent's response
    const message: Message = { id: generateId(), role: "user", content: userMessage };
    const { text } = await generateText({
      ...agent,
      messages: [message],
      seed: entropy.seed,
      temperature: 0
    });

    // 4. Add the agent's response to the messages
    // messages.push({ id: generateId(), role: "assistant", content: text, });

    // 5️. Return the final response
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process message" });
  }
}
