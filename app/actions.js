"use server";

import { createStreamableValue } from "ai/rsc";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { rateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

const nim = createOpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_NIM_API_KEY,
});

export async function continueConversation(messages) {
  const headersList = await headers(); // Await the headers() function
  const ip = headersList.get("x-forwarded-for") ?? "unknown";
  const isRateLimited = rateLimit(ip);

  if (isRateLimited) {
    console.log("Rate limited");
    throw new Error(`Rate Limit Exceeded for ${ip}`);
  }

  const result = await streamText({
    model: nim("google/gemma-2-9b-it"),
    messages,
    temperature: 0.8,
    topP: 0.7,
    maxTokens: 1024,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
