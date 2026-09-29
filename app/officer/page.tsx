"use client";

import AppShell from "@/components/AppShell";
import { Panel, PageHeader, StatusBadge, RiskBadge, SlaTimer, StatCard } from "@/components/ui";
import { applications, inspections, officerUser } from "@/lib/mock-data";
import { ClipboardList, TimerReset, AlertOctagon, TrendingUp, MapPin } from "lucide-react";

export default function OfficerDashboardPage() {
  const queue = applications.filter((a) => a.status !== "approved");
  const highRisk = queue.filter((a) => a.riskScore === "high").length;

  return (
    <AppShell name={officerUser.department + " Dept."} role="Officer" variant="officer">
      <PageHeader
        title={`${officerUser.department} Officer Dashboard`}
        description="Applications assigned to your department, clustered inspections, and processing metrics."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={ClipboardList} label="Assigned Applications" value={queue.length} tone="indigo" />
        <StatCard icon={TimerReset} label="Avg. Processing Time" value="18 days" tone="teal" />
        <StatCard icon={AlertOctagon} label="High Risk" value={highRisk} tone="alert" />
        <StatCard icon={TrendingUp} label="SLA Breaches (30d)" value={1} tone="saffron" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Panel title="Assigned Applications Queue" className="lg:col-span-2">
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink/40 uppercase tracking-wide border-b border-line">
                  <th className="px-5 py-2.5 font-medium">Application</th>
                  <th className="px-5 py-2.5 font-medium">Applicant</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 font-medium">Priority</th>
                  <th className="px-5 py-2.5 font-medium">SLA</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((app) => (
                  <tr key={app.id} className="border-b border-line last:border-0 hover:bg-cloud/60">
                    <td className="px-5 py-3">
                      <p className="font-medium text-ink">{app.applicationCode}</p>
                      <p className="text-xs text-ink/50">{app.approvalType}</p>
                    </td>
                    <td className="px-5 py-3 text-ink/70">ABC Industries</td>
                    <td className="px-5 py-3"><StatusBadge status={app.status} /></td>
                    <td className="px-5 py-3"><RiskBadge risk={app.riskScore} /></td>
                    <td className="px-5 py-3"><SlaTimer deadline={app.slaDeadline} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Cluster Inspection Planner">
          <p className="text-xs text-ink/50 mb-4">
            Grouping inspections at the same location reduces disruption to the applicant.
          </p>
          <ul className="space-y-4">
            {inspections.map((insp) => (
              <li key={insp.id} className="rounded border border-line p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-ink">{insp.department}</p>
                  <span className="text-xs text-ink/50">
                    {new Date(insp.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                  </span>
                </div>
                <p className="text-xs text-ink/50 flex items-center gap-1 mt-1">
                  <MapPin size={11} /> {insp.location}
                </p>
                {insp.clustered && (
                  <span className="inline-block mt-2 text-[10px] font-medium text-teal-700 bg-teal-50 rounded px-1.5 py-0.5">
                    Clustered with {insp.clusterWith?.join(", ")}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full rounded border border-indigo-600 text-indigo-700 text-sm font-medium py-2 hover:bg-indigo-50">
            + Schedule Inspection
          </button>
        </Panel>
      </div>
    </AppShell>
  );
}
