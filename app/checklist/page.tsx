"use client";

import { useState } from "react";
import { ClipboardCheck, Download, FileText } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Panel, PageHeader } from "@/components/ui";
import { checklistDatabase, currentUser } from "@/lib/mock-data";
import type { ChecklistRequirement } from "@/lib/types";

const sectors = [
  { value: "food_processing", label: "Food Processing" },
  { value: "small_manufacturing", label: "Small Manufacturing" },
];
const districts = ["Pune", "Nashik", "Nagpur", "Thane", "Aurangabad"];
const sizes = ["Micro", "Small", "Medium"];
const stages = ["New Unit", "Expansion", "Renewal"];

export default function ChecklistPage() {
  const [sector, setSector] = useState("food_processing");
  const [district, setDistrict] = useState("Pune");
  const [size, setSize] = useState("Small");
  const [stage, setStage] = useState("New Unit");
  const [result, setResult] = useState<ChecklistRequirement[] | null>(null);

  function generate(e: React.FormEvent) {
    e.preventDefault();
    // In production: GET /approvals/requirements?sector=&location=&size=&stage=
    setResult(checklistDatabase[sector] ?? []);
  }

  return (
    <AppShell name={currentUser.companyName ?? currentUser.username} role="Entrepreneur">
      <PageHeader
        title="Smart Approvals Checklist"
        description="Tell us about your unit and we'll generate the exact approvals, documents, and timelines you need."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <Panel title="Your industry details" className="lg:col-span-1 h-fit">
          <form onSubmit={generate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full rounded border border-line px-3 py-2 text-sm focus:border-indigo-600"
              >
                {sectors.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full rounded border border-line px-3 py-2 text-sm focus:border-indigo-600"
              >
                {districts.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Unit size</label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded border px-2 py-2 text-xs font-medium ${
                      size === s ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-line text-ink/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Stage</label>
              <div className="grid grid-cols-1 gap-2">
                {stages.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setStage(s)}
                    className={`rounded border px-3 py-2 text-sm font-medium text-left ${
                      stage === s ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-line text-ink/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded bg-indigo-600 text-white text-sm font-semibold py-2.5 hover:bg-indigo-700"
            >
              <ClipboardCheck size={16} /> Generate Checklist
            </button>
          </form>
        </Panel>

        <div className="lg:col-span-2">
          {!result && (
            <Panel>
              <div className="text-center py-12">
                <ClipboardCheck className="mx-auto text-ink/20" size={40} />
                <p className="text-sm text-ink/50 mt-3">
                  Fill in your industry details and generate a checklist to see required approvals here.
                </p>
              </div>
            </Panel>
          )}
          {result && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-ink/60">
                  <span className="font-semibold text-ink">{result.length} approvals</span> required for a {size.toLowerCase()} {sector.replace("_", " ")} unit in {district} ({stage.toLowerCase()})
                </p>
                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline">
                  <Download size={14} /> Download as PDF
                </button>
              </div>
              {result.map((req, i) => (
                <Panel key={req.approvalType}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 text-sm font-semibold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-ink text-sm">{req.approvalType}</p>
                        <p className="text-xs text-ink/50">{req.department} Department</p>
                        <p className="text-sm text-ink/70 mt-2 max-w-md">{req.description}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {req.requiredDocuments.map((doc) => (
                            <span key={doc} className="inline-flex items-center gap-1 text-xs bg-cloud text-ink/70 rounded px-2 py-1">
                              <FileText size={11} /> {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-ink/50 bg-cloud rounded px-2 py-1">
                      ~{req.estimatedSlaDays} days
                    </span>
                  </div>
                </Panel>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
