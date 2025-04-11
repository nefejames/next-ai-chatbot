import Button from "@/components/Button";

export default function ChatInput({
  input,
  setInput,
  handleSubmit,
  handleKeyDown,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 flex justify-center mb-5 px-6"
    >
      <div className="relative w-full max-w-2xl">
        <textarea
          placeholder="Ask me about anything!"
          value={input}
          className="min-h-16 w-full resize-none rounded-[28px] border border-input bg-muted pb-1 pl-4 pr-10 pt-3 text-sm shadow-sm ring-offset-background file:bg-transparent placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-nvidia focus-visible:ring-offset-0"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button disabled={input.length === 0} />
      </div>
    </form>
  );
}
