"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, Send, ExternalLink } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Panel, PageHeader } from "@/components/ui";
import { currentUser } from "@/lib/mock-data";
import type { ChatMessage } from "@/lib/types";

const suggestions = [
  "What NOCs do I need for food processing in Pune?",
  "How long does MPCB Consent to Operate take?",
  "Am I eligible for the MSME Credit Linked Subsidy?",
  "What happens if I miss my Fire NOC renewal?",
];

// Mock RAG pipeline: retrieves from a fixed knowledge base and returns a grounded answer with citations.
function mockRagResponse(query: string): ChatMessage {
  const lower = query.toLowerCase();
  if (lower.includes("food processing") && lower.includes("pune")) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      confidence: 88,
      content:
        "For a food processing unit in Pune district, you'll typically need: Consent to Establish (Industries Dept), Consent to Operate (MPCB), a Fire NOC, a Factory License (Labour Dept, if employee count qualifies), and an FSSAI License. Since food processing involves effluent discharge, MPCB usually classifies it under the 'Orange' category, which adds a water-usage declaration to the standard checklist.",
      citations: [
        { source: "MAITRI Single Window Policy 2016", url: "https://maitri.maharashtra.gov.in", excerpt: "Approval requirements vary by sector, location, project size, and stage of operation." },
        { source: "MPCB Consent Guidelines", url: "https://mpcb.gov.in", excerpt: "Food processing units are typically classified under the Orange category for consent purposes." },
      ],
    };
  }
  if (lower.includes("mpcb") && lower.includes("consent to operate")) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      confidence: 81,
      content:
        "Consent to Operate from MPCB generally takes around 30 days from submission of a complete application, assuming your effluent treatment plan and water usage declaration are in order. Applications with missing documents restart the review clock once resubmitted, so pre-validating documents before submission is the biggest lever on this timeline.",
      citations: [
        { source: "MPCB Consent Processing SLAs", url: "https://mpcb.gov.in", excerpt: "Standard processing timelines are published per consent category." },
      ],
    };
  }
  if (lower.includes("credit linked") || lower.includes("subsidy")) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      confidence: 78,
      content:
        "The MSME Credit Linked Subsidy Scheme offers a 15% capital subsidy on institutional finance up to ₹1 crore for technology upgradation. Based on your profile, you meet most criteria, but your Udyam registration needs to be under 3 years old to qualify — worth double-checking your registration date before applying.",
      citations: [
        { source: "MSME e-Book — Scheme Guide", url: "https://www.mofpi.gov.in", excerpt: "Eligibility is based on investment, turnover, employment, and registration recency." },
      ],
    };
  }
  if (lower.includes("fire noc") || lower.includes("renewal")) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      confidence: 84,
      content:
        "Missing a Fire NOC renewal deadline can result in the NOC lapsing, which puts your unit out of compliance and can trigger inspection holds on other pending approvals. It won't auto-suspend operations, but repeated non-renewal is grounds for a penalty notice from the Fire Department. I'd recommend renewing at least 30 days before expiry to leave room for a re-inspection if needed.",
      citations: [
        { source: "Maharashtra Fire Prevention & Life Safety Measures Act", url: "https://mahafireservice.gov.in", excerpt: "NOC renewal timelines and penalty provisions are defined under the Act." },
      ],
    };
  }
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    confidence: 62,
    content:
      "I found some related guidance in the knowledge base, but I'm not fully confident this covers your specific case. I'd recommend checking the MAITRI portal directly or flagging this for an officer's review — I've noted this as a low-confidence answer.",
    citations: [
      { source: "MAITRI Portal — General Guidelines", url: "https://maitri.maharashtra.gov.in", excerpt: "General guidance for industrial approvals in Maharashtra." },
    ],
  };
}

function AssistantContent() {
  const params = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState(initialQ);
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQ) send(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, mockRagResponse(text)]);
      setThinking(false);
    }, 1000);
  }

  return (
    <AppShell name={currentUser.companyName ?? currentUser.username} role="Entrepreneur">
      <PageHeader
        title="AI Assistant"
        description="Ask about approvals, compliance, or schemes. Answers are grounded in official Maharashtra government sources with citations."
      />

      <Panel className="flex flex-col h-[calc(100vh-220px)]">
        <div className="flex-1 overflow-y-auto -mx-5 -mt-5 px-5 pt-5 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-10">
              <Sparkles className="mx-auto text-indigo-300" size={32} />
              <p className="text-sm text-ink/50 mt-3 mb-4">Try asking one of these:</p>
              <div className="flex flex-col items-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded px-3 py-2 max-w-md"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-lg rounded px-4 py-3 text-sm ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-cloud text-ink"}`}>
                <p className="leading-relaxed">{m.content}</p>
                {m.role === "assistant" && m.citations && (
                  <div className="mt-3 pt-3 border-t border-line/60 space-y-1.5">
                    {typeof m.confidence === "number" && (
                      <p className="text-[11px] text-ink/40 mb-1.5">Confidence: {m.confidence}%</p>
                    )}
                    {m.citations.map((c) => (
                      <a
                        key={c.source}
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-indigo-700 hover:underline"
                      >
                        <ExternalLink size={11} /> {c.source}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex justify-start">
              <div className="bg-cloud rounded px-4 py-3 text-sm text-ink/40">
                Retrieving relevant regulations…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 pt-4 mt-4 border-t border-line"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about approvals, compliance, or schemes…"
            className="flex-1 rounded border border-line px-3 py-2.5 text-sm focus:border-indigo-600"
          />
          <button type="submit" className="rounded bg-indigo-600 text-white px-4 py-2.5 hover:bg-indigo-700">
            <Send size={16} />
          </button>
        </form>
      </Panel>
    </AppShell>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={null}>
      <AssistantContent />
    </Suspense>
  );
}
