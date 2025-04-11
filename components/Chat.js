"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { continueConversation } from "@/lib/actions";
import { readStreamableValue } from "ai/rsc";
import { FaRobot } from "react-icons/fa6";
import { FaUserAstronaut } from "react-icons/fa6";
import remarkGfm from "remark-gfm";
import ChatInput from "./ChatInput";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const remarkPlugins = [remarkGfm];

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

        console.log(messages);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing // Check if text is still being composed
    ) {
      e.preventDefault();
      if (input.trim().length > 0) {
        handleSubmit(e);
      }
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
            <ReactMarkdown remarkPlugins={remarkPlugins}>
              {m.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}
