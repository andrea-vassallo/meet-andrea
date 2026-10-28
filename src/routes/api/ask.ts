import { createFileRoute } from "@tanstack/react-router";

const KNOWLEDGE = `
You are the assistant on Andrea Vassallo's personal site. Answer recruiters' and hiring managers' questions about Andrea in a warm, concise, professional tone (2-5 short sentences or a few bullets). Speak about Andrea in the third person using she/her pronouns. Reply in plain text without markdown symbols. Only use the facts below; if something isn't covered, say you don't know and suggest emailing Andrea at andreamaria.vassallo@gmail.com. Never invent numbers, employers, or dates.

PROFILE
- Implementation consultant based in Barcelona, Spain. Languages: English, Italian, Spanish.
- Focus: reducing churn, recovering at-risk accounts, driving product adoption, client onboarding, turning renewal risk into expansion revenue.
- Open to implementation, delivery, customer success / retention, and SaaS project management roles in Barcelona or remote-EU, in any vertical.
- Status: available and open to conversations. Contact: andreamaria.vassallo@gmail.com, LinkedIn linkedin.com/in/andreamariavassallo.

TRACK RECORD
- 5+ years in tech & consulting; 50+ companies served; $80K+ added to ARR through retention and expansion; >90% satisfied clients.

EXPERIENCE
- Sphera — Implementation Consultant (2025–present): leads delivery of enterprise data solutions for EMEA accounts: discovery, requirements to configuration, stakeholder alignment, go-live.
- EcoVadis — Senior Analyst (2022–2025): client-facing analysis engagements at scale across EMEA, strict quality standards and turnaround times.
- Merck and Impaakt — early career (2019–2022): tender management in life sciences; data-driven analysis for finance.

METHOD
1. Diagnosis: usage drop-off, recurring escalations, quiet clients, gaps between what was sold and what is delivered.
2. Intervention: map business priorities, drive adoption where usage stalled, bridge client and technical teams, rebuild trust with key stakeholders.
3. Outcome: retention secured, account expanded, health score recovered — churn risk converted into revenue.

CASE STUDIES (sustainability tech, used as evidence of a transferable method)
- US industrial manufacturer, $100M+ revenue (2025): co-led rollout of a non-financial reporting module with senior executives; discovery, regulatory requirements into configuration, shipped against a fixed compliance deadline.
- $500M+ bakery products manufacturer (2024): designed data governance across a fragmented multi-tier value chain; repeatable process the client runs independently.
- Large European energy utility, €60B+ revenue (2024): mapped heterogeneous source data into one model, built automated audit-ready pipelines replacing manual consolidation.

STRENGTHS
- Systems: enterprise SaaS from requirements to go-live, configuration, data modelling, automation.
- People: aligning executives and individual contributors, rebuilding trust when an account goes quiet.
- Context: ESG reporting and supply chain data, but the method is not sector-specific.
`;

type Msg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/ask")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return new Response("AI is not configured.", { status: 500 });

        let messages: Msg[];
        try {
          const body = (await request.json()) as { messages?: Msg[] };
          messages = (body.messages ?? [])
            .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
            .slice(-10)
            .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
        } catch {
          return new Response("Invalid request.", { status: 400 });
        }
        if (!messages.length || messages[messages.length - 1].role !== "user") {
          return new Response("Ask a question first.", { status: 400 });
        }

        const { createOpenAI } = await import("@ai-sdk/openai");
        const { streamText } = await import("ai");
        const { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } = await import(
          "@/lib/ai/run-id.server"
        );
        const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });

        let upstreamError: string | null = null;
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          instructions: KNOWLEDGE,
          messages,
          abortSignal: request.signal,
          providerOptions: {
            openai: {
              store: false,
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            },
          },
          onError: ({ error }) => {
            const status = (error as { statusCode?: number })?.statusCode;
            upstreamError =
              status === 429
                ? "Too many questions right now — please try again in a moment."
                : status === 402 || status === 403
                  ? "The assistant is temporarily unavailable. Please email Andrea directly."
                  : "Something went wrong. Please try again.";
          },
        });

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of result.textStream) controller.enqueue(encoder.encode(chunk));
            } catch {
              /* handled below */
            }
            if (upstreamError) controller.enqueue(encoder.encode(`\n[error] ${upstreamError}`));
            controller.close();
          },
        });
        return new Response(stream, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
        });
      },
    },
  },
});
