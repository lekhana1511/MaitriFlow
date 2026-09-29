"use client";

import { notFound } from "next/navigation";
import { FileText, Send } from "lucide-react";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import { Panel, PageHeader, StatusBadge, RiskBadge, SlaTimer } from "@/components/ui";
import { applications, currentUser } from "@/lib/mock-data";

const stages = ["Submitted", "Department Review", "Inspection", "Approval"];

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const app = applications.find((a) => a.id === params.id);
  const [reply, setReply] = useState("");

  if (!app) return notFound();

  return (
    <AppShell name={currentUser.companyName ?? currentUser.username} role="Entrepreneur">
      <PageHeader
        title={`${app.applicationCode} — ${app.approvalType}`}
        description={`${app.department} Department · ${app.industrySector}`}
        action={<StatusBadge status={app.status} />}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Panel title="Timeline">
            <div className="flex items-center">
              {stages.map((stage, i) => (
                <div key={stage} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                        i < app.currentStage
                          ? "bg-teal-600 border-teal-600 text-white"
                          : i === app.currentStage
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-white border-line text-ink/30"
                      }`}
                    >
                      {i < app.currentStage ? "✓" : i + 1}
                    </div>
                    <span className="text-[11px] text-ink/60 mt-2 text-center max-w-[90px]">{stage}</span>
                  </div>
                  {i < stages.length - 1 && (
                    <div className={`h-0.5 flex-1 -mt-5 ${i < app.currentStage ? "bg-teal-600" : "bg-line"}`} />
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Documents">
            <ul className="divide-y divide-line">
              {app.documents.map((doc) => (
                <li key={doc.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-ink/40" />
                    <div>
                      <p className="text-sm font-medium text-ink">{doc.name}</p>
                      <p className="text-xs text-ink/50">
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium rounded px-2 py-0.5 ${doc.validated ? "bg-teal-100 text-teal-700" : "bg-alert-100 text-alert-700"}`}>
                    {doc.validated ? "Validated" : "Needs attention"}
                  </span>
                </li>
              ))}
              {app.documents.length === 0 && (
                <p className="text-sm text-ink/40 py-4 text-center">No documents attached.</p>
              )}
            </ul>
          </Panel>

          {app.queryThread && app.queryThread.length > 0 && (
            <Panel title="Query Thread">
              <div className="space-y-3 mb-4">
                {app.queryThread.map((q) => (
                  <div key={q.id} className={`flex ${q.from === "applicant" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-sm rounded px-3 py-2 text-sm ${
                        q.from === "applicant" ? "bg-indigo-600 text-white" : "bg-cloud text-ink"
                      }`}
                    >
                      <p>{q.message}</p>
                      <p className={`text-[10px] mt-1 ${q.from === "applicant" ? "text-indigo-100" : "text-ink/40"}`}>
                        {new Date(q.timestamp).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Respond to the department's query…"
                  className="flex-1 rounded border border-line px-3 py-2 text-sm focus:border-indigo-600"
                />
                <button className="rounded bg-indigo-600 text-white px-3 py-2 hover:bg-indigo-700">
                  <Send size={16} />
                </button>
              </form>
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <Panel title="Summary">
            <dl className="text-sm space-y-3">
              <div className="flex justify-between">
                <dt className="text-ink/50">Risk score</dt>
                <dd><RiskBadge risk={app.riskScore} /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">SLA</dt>
                <dd>{app.status === "approved" ? <span className="text-ink/40">Completed</span> : <SlaTimer deadline={app.slaDeadline} />}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Submitted</dt>
                <dd className="text-ink/80">
                  {new Date(app.submittedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Deadline</dt>
                <dd className="text-ink/80">
                  {new Date(app.slaDeadline).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </dd>
              </div>
            </dl>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
