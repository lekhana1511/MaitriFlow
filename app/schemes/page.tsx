"use client";

import AppShell from "@/components/AppShell";
import { Panel, PageHeader } from "@/components/ui";
import { schemes, currentUser } from "@/lib/mock-data";
import { ExternalLink } from "lucide-react";

function confidenceTone(score: number) {
  if (score >= 75) return { bar: "bg-teal-600", text: "text-teal-700" };
  if (score >= 50) return { bar: "bg-saffron-600", text: "text-saffron-700" };
  return { bar: "bg-alert-600", text: "text-alert-700" };
}

export default function SchemesPage() {
  const sorted = [...schemes].sort((a, b) => b.confidenceScore - a.confidenceScore);

  return (
    <AppShell name={currentUser.companyName ?? currentUser.username} role="Entrepreneur">
      <PageHeader
        title="Incentives & Schemes"
        description="Government schemes matched to your industry profile, ranked by how well you meet the eligibility criteria."
      />

      <div className="space-y-4">
        {sorted.map((s) => {
          const tone = confidenceTone(s.confidenceScore);
          return (
            <Panel key={s.id}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-indigo-700 bg-indigo-50 rounded px-2 py-0.5">
                      {s.category}
                    </span>
                  </div>
                  <p className="font-heading font-semibold text-ink mt-2">{s.name}</p>
                  <p className="text-sm text-ink/60 mt-1 max-w-xl">{s.description}</p>
                  <p className="text-sm text-ink/80 mt-2"><span className="font-medium">Benefit: </span>{s.benefits}</p>
                  {s.missingCriteria.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-ink/50 mb-1">To fully qualify, you still need:</p>
                      <ul className="text-xs text-alert-700 space-y-0.5">
                        {s.missingCriteria.map((c) => <li key={c}>• {c}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="md:w-48 shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-ink/50">Match confidence</span>
                    <span className={`text-sm font-bold ${tone.text}`}>{s.confidenceScore}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-line overflow-hidden">
                    <div className={`h-full ${tone.bar}`} style={{ width: `${s.confidenceScore}%` }} />
                  </div>
                  <a
                    href={s.applicationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded bg-indigo-600 text-white text-sm font-medium px-3 py-2 hover:bg-indigo-700"
                  >
                    Apply Now <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </AppShell>
  );
}
