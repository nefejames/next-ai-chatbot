import Textarea from "react-textarea-autosize";
import Button from "@/components/Button";

export default function ChatInput({ input, setInput, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 flex justify-center dark:from-background"
    >
      <div className="w-full max-w-2xl items-center px-6">
        <div className="relative flex w-full flex-col items-start gap-2">
          <div className="relative flex w-full items-center">
            <textarea
              name="message"
              rows={1}
              maxLength={200} // Optional: limit the number of characters
              placeholder="Try asking me something!"
              spellCheck={false}
              value={input}
              className="min-h-16 w-full resize-none rounded-[28px] border border-input bg-muted pb-1 pl-4 pr-10 pt-3 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nvidia focus-visible:ring-offset-0"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  if (input.trim().length > 0) {
                    handleSubmit(e);
                  }
                }
              }}
            />
            <Button disabled={input.length === 0} />
          </div>
        </div>
        <p className="p-2 text-center text-xs text-zinc-400">
          Inspired by {""}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-all duration-150 ease-linear md:hover:text-nvidia"
            href="https://github.com/lakshaybhushan/nextjs-nvidia-chatbot"
          >
            lakshaybhushan
          </a>
        </p>
      </div>
    </form>
  );
}
