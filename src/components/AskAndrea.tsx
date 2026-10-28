import { useEffect, useRef, useState, type FormEvent } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export const SUGGESTED = [
  "How do you recover an at-risk account?",
  "What results have you delivered?",
  "What roles are you open to?",
  "Tell me about your experience at Sphera.",
];

export function AskAndrea({ seed }: { seed: { q: string; n: number } | null }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += dec.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: text }]);
      }
      if (!text.trim()) throw new Error("No answer came back. Please try again.");
    } catch (e) {
      const msg = e instanceof Error && e.message ? e.message : "Something went wrong.";
      setMessages([...next, { role: "assistant", content: `[error] ${msg}` }]);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (seed) ask(seed.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed?.n]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <div className="border border-[color:var(--ink)] bg-[color:var(--surface)]">
      <div className="flex items-center justify-between border-b border-[color:var(--hairline)] px-4 py-2.5">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
          ask-andrea · knowledge agent
        </span>
        <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
          <span className={`h-1.5 w-1.5 rounded-full ${busy ? "bg-[color:var(--accent-ink)] animate-pulse" : "bg-emerald-500"}`} />
          {busy ? "thinking" : "online"}
        </span>
      </div>

      <div ref={logRef} className="max-h-[420px] min-h-[180px] overflow-y-auto px-4 py-5 space-y-5">
        {messages.length === 0 && (
          <p className="font-mono text-[0.8rem] leading-relaxed text-[color:var(--muted-ink)]">
            &gt; Ask anything about Andrea's experience, method, results or availability.
            Answers are AI-generated from her verified track record.
          </p>
        )}
        {messages.map((m, i) => {
          const isErr = m.content.includes("[error]");
          return (
            <div key={i} className="grid grid-cols-[72px_1fr] gap-3">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] pt-1 text-[color:var(--muted-ink)]">
                {m.role === "user" ? "You" : "Agent"}
              </span>
              <p
                className={`whitespace-pre-wrap leading-relaxed ${
                  m.role === "user"
                    ? "font-mono text-[0.85rem] text-[color:var(--ink)]"
                    : isErr
                      ? "text-sm text-destructive"
                      : "text-[0.95rem] text-[color:var(--secondary-ink)]"
                }`}
              >
                {m.content.replace("[error] ", "").replace(/\*\*/g, "") || <span className="animate-pulse">▍</span>}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 px-4 pb-3">
        {SUGGESTED.map((q) => (
          <button
            key={q}
            type="button"
            disabled={busy}
            onClick={() => ask(q)}
            className="font-mono text-[0.68rem] tracking-[0.04em] px-2.5 py-1.5 border border-[color:var(--hairline)] text-[color:var(--ink)] hover:border-[color:var(--accent-ink)] hover:text-[color:var(--accent-ink)] transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex border-t border-[color:var(--ink)]">
        <span className="font-mono px-4 py-3 text-[color:var(--accent-ink)]">&gt;_</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question…"
          aria-label="Ask a question about Andrea"
          maxLength={500}
          className="flex-1 bg-transparent py-3 font-mono text-sm text-[color:var(--ink)] placeholder:text-[color:var(--muted-ink)] outline-none"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="px-5 font-mono text-xs uppercase tracking-[0.16em] bg-[color:var(--ink)] text-[color:var(--surface)] hover:bg-[color:var(--accent-ink)] transition-colors disabled:opacity-40"
        >
          Ask
        </button>
      </form>
    </div>
  );
}
