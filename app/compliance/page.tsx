"use client";

import AppShell from "@/components/AppShell";
import { Panel, PageHeader, ComplianceBadge } from "@/components/ui";
import { complianceItems, inspections, currentUser } from "@/lib/mock-data";
import { CalendarDays, FileText } from "lucide-react";

export default function CompliancePage() {
  const sorted = [...complianceItems].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  return (
    <AppShell name={currentUser.companyName ?? currentUser.username} role="Entrepreneur">
      <PageHeader
        title="Compliance Calendar"
        description="Every regulatory deadline for your unit, in one timeline — renewals, filings, and inspections."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {sorted.map((item) => (
            <Panel key={item.id}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center h-14 w-14 rounded bg-cloud shrink-0">
                  <span className="text-[10px] font-medium text-ink/50 uppercase">
                    {new Date(item.deadline).toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                  <span className="text-lg font-heading font-bold text-ink leading-none">
                    {new Date(item.deadline).getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="text-xs text-ink/50 capitalize">{item.regulationType} regulation</p>
                    </div>
                    <ComplianceBadge status={item.status} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.documentsRequired.map((doc) => (
                      <span key={doc} className="inline-flex items-center gap-1 text-xs bg-cloud text-ink/70 rounded px-2 py-1">
                        <FileText size={11} /> {doc}
                      </span>
                    ))}
                  </div>
                  {item.status !== "compliant" && (
                    <button className="mt-3 text-xs font-medium text-indigo-600 hover:underline">
                      Upload evidence →
                    </button>
                  )}
                </div>
              </div>
            </Panel>
          ))}
        </div>

        <div className="space-y-6">
          <Panel title="Scheduled Inspections">
            <ul className="space-y-4">
              {inspections.map((insp) => (
                <li key={insp.id} className="flex gap-3">
                  <div className="h-9 w-9 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <CalendarDays size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{insp.department}</p>
                    <p className="text-xs text-ink/50">
                      {new Date(insp.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} · {insp.time}
                    </p>
                    <p className="text-xs text-ink/40 mt-0.5">{insp.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Legend">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal-600" /> Compliant</li>
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-saffron-600" /> Due soon (within 30 days)</li>
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-alert-600" /> Overdue</li>
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-600" /> Pending / no action yet</li>
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
