"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { Panel, PageHeader, StatusBadge, RiskBadge, SlaTimer } from "@/components/ui";
import { applications, currentUser } from "@/lib/mock-data";
import type { ApprovalStatus } from "@/lib/types";

const filters: { value: ApprovalStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "under_review", label: "Under Review" },
  { value: "inspection_scheduled", label: "Inspection Scheduled" },
  { value: "query_raised", label: "Query Raised" },
  { value: "approved", label: "Approved" },
];

export default function ApplicationsPage() {
  const [filter, setFilter] = useState<ApprovalStatus | "all">("all");
  const shown = filter === "all" ? applications : applications.filter((a) => a.status === filter);

  return (
    <AppShell name={currentUser.companyName ?? currentUser.username} role="Entrepreneur">
      <PageHeader
        title="My Applications"
        description="Every approval application you've submitted, with live status and SLA timers."
        action={
          <Link href="/checklist" className="rounded bg-indigo-600 text-white text-sm font-semibold px-4 py-2 hover:bg-indigo-700">
            + New Application
          </Link>
        }
      />

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`shrink-0 rounded px-3 py-1.5 text-xs font-medium border ${
              filter === f.value
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "border-line text-ink/60 hover:bg-cloud"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Panel>
        <div className="overflow-x-auto -mx-5 -mb-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-ink/40 uppercase tracking-wide border-b border-line">
                <th className="px-5 py-2.5 font-medium">Application</th>
                <th className="px-5 py-2.5 font-medium">Department</th>
                <th className="px-5 py-2.5 font-medium">Status</th>
                <th className="px-5 py-2.5 font-medium">Risk</th>
                <th className="px-5 py-2.5 font-medium">Submitted</th>
                <th className="px-5 py-2.5 font-medium">SLA</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((app) => (
                <tr key={app.id} className="border-b border-line last:border-0 hover:bg-cloud/60">
                  <td className="px-5 py-3">
                    <Link href={`/applications/${app.id}`} className="font-medium text-indigo-700 hover:underline">
                      {app.applicationCode}
                    </Link>
                    <p className="text-xs text-ink/50">{app.approvalType}</p>
                  </td>
                  <td className="px-5 py-3 text-ink/70">{app.department}</td>
                  <td className="px-5 py-3"><StatusBadge status={app.status} /></td>
                  <td className="px-5 py-3"><RiskBadge risk={app.riskScore} /></td>
                  <td className="px-5 py-3 text-ink/60">
                    {new Date(app.submittedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    {app.status === "approved" ? <span className="text-xs text-ink/40">—</span> : <SlaTimer deadline={app.slaDeadline} />}
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-sm text-ink/40">
                    No applications match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
