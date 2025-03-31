"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaRobot } from "react-icons/fa6";
import ChatInput from "./ChatInput";
import { readStreamableValue } from "ai/rsc";
import { FaUserAstronaut } from "react-icons/fa6";
import { continueConversation } from "../app/actions";
import { toast } from "sonner";
import remarkGfm from "remark-gfm";
import { MemoizedReactMarkdown } from "./Markdown";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim().length === 0) return;

    const newMessages = [...messages, { content: input, role: "user" }];

    setMessages(newMessages);
    setInput("");

    try {
      const result = await continueConversation(newMessages);

      for await (const content of readStreamableValue(result)) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: content,
          },
        ]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="stretch mx-auto w-full max-w-2xl px-4 pb-[8rem] pt-[2rem] md:px-0">
      {messages.map((m, i) => (
        <div key={i} className="mb-4 flex items-start p-2">
          <div
            className={cn(
              "flex size-8 shrink-0 select-none items-center justify-center rounded-lg",
              m.role === "user"
                ? "border bg-background"
                : "border border-[#628f10] bg-nvidia text-primary-foreground"
            )}
          >
            {m.role === "user" ? <FaUserAstronaut /> : <FaRobot />}
          </div>
          <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
            <MemoizedReactMarkdown remarkPlugins={[remarkGfm]}>
              {m.content}
            </MemoizedReactMarkdown>
          </div>
        </div>
      ))}

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
