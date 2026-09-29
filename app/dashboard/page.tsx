"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileStack,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  Flame,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { Panel, PageHeader, StatCard, StatusBadge, ComplianceBadge, SlaTimer } from "@/components/ui";
import { applications, complianceItems, schemes, inspections, currentUser } from "@/lib/mock-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const trend = [
  { month: "Apr", applications: 2 },
  { month: "May", applications: 3 },
  { month: "Jun", applications: 4 },
  { month: "Jul", applications: 6 },
  { month: "Aug", applications: 7 },
  { month: "Sep", applications: 9 },
];

const byDepartment = [
  { name: "Industries", value: 2, color: "#1B3A6B" },
  { name: "MPCB", value: 1, color: "#E08E29" },
  { name: "Fire", value: 1, color: "#1F8A70" },
  { name: "Labour", value: 1, color: "#C84B31" },
];

const stages = ["Submitted", "Department Review", "Inspection", "Approval"];

export default function DashboardPage() {
  const [question, setQuestion] = useState("");

  const total = applications.length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const underProcess = applications.filter((a) =>
    ["under_review", "inspection_scheduled"].includes(a.status)
  ).length;
  const pendingQueries = applications.filter((a) => a.status === "query_raised").length;

  const focusApp = applications.find((a) => a.status === "under_review") ?? applications[0];

  return (
    <AppShell name={currentUser.companyName ?? currentUser.username} role="Entrepreneur">
      <PageHeader
        title="Dashboard"
        description="Everything about your approvals, compliance, and eligible schemes in one place."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FileStack} label="Total Applications" value={total} tone="indigo" href="/applications" />
        <StatCard icon={CheckCircle2} label="Approved" value={approved} tone="teal" href="/applications" />
        <StatCard icon={Clock} label="Under Process" value={underProcess} tone="saffron" href="/applications" />
        <StatCard icon={AlertTriangle} label="Pending Queries" value={pendingQueries} tone="alert" href="/applications" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Application status stepper */}
        <Panel
          title="Application Status"
          action={
            <Link href={`/applications/${focusApp.id}`} className="text-xs font-medium text-indigo-600 hover:underline">
              View timeline →
            </Link>
          }
          className="lg:col-span-2"
        >
          <p className="text-xs text-ink/50 mb-4">
            {focusApp.applicationCode} · {focusApp.approvalType}
          </p>
          <div className="flex items-center">
            {stages.map((stage, i) => (
              <div key={stage} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                      i < focusApp.currentStage
                        ? "bg-teal-600 border-teal-600 text-white"
                        : i === focusApp.currentStage
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-white border-line text-ink/30"
                    }`}
                  >
                    {i < focusApp.currentStage ? "✓" : i + 1}
                  </div>
                  <span className="text-[11px] text-ink/60 mt-2 text-center max-w-[80px]">{stage}</span>
                </div>
                {i < stages.length - 1 && (
                  <div className={`h-0.5 flex-1 -mt-5 ${i < focusApp.currentStage ? "bg-teal-600" : "bg-line"}`} />
                )}
              </div>
            ))}
          </div>
        </Panel>

        {/* Upcoming inspections */}
        <Panel title="Upcoming Inspections" action={<Link href="/compliance" className="text-xs font-medium text-indigo-600 hover:underline">View all →</Link>}>
          <ul className="space-y-3">
            {inspections.map((insp) => (
              <li key={insp.id} className="flex gap-3">
                <div className="h-9 w-9 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  {insp.department === "Fire Department" ? <Flame size={16} /> : <Building2 size={16} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{insp.department} Inspection</p>
                  <p className="text-xs text-ink/50">
                    {new Date(insp.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} · {insp.time}
                  </p>
                  {insp.clustered && (
                    <span className="inline-block mt-1 text-[10px] font-medium text-teal-700 bg-teal-50 rounded px-1.5 py-0.5">
                      Clustered with {insp.clusterWith?.join(", ")}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* AI assistant quick input */}
      <Panel className="mb-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-3"
        >
          <div className="h-9 w-9 rounded bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </div>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask MaitriFlow AI — e.g. What NOCs do I need for food processing in Pune?"
            className="flex-1 border border-line rounded px-3 py-2 text-sm focus:border-indigo-600"
          />
          <Link
            href={`/assistant${question ? `?q=${encodeURIComponent(question)}` : ""}`}
            className="inline-flex items-center gap-1.5 rounded bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 shrink-0"
          >
            Ask <ArrowRight size={14} />
          </Link>
        </form>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Recent applications */}
        <Panel title="Recent Applications" action={<Link href="/applications" className="text-xs font-medium text-indigo-600 hover:underline">View all →</Link>}>
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink/40 uppercase tracking-wide border-b border-line">
                  <th className="px-5 py-2 font-medium">ID</th>
                  <th className="px-5 py-2 font-medium">Department</th>
                  <th className="px-5 py-2 font-medium">Status</th>
                  <th className="px-5 py-2 font-medium">SLA</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-line last:border-0 hover:bg-cloud/60">
                    <td className="px-5 py-2.5">
                      <Link href={`/applications/${app.id}`} className="font-medium text-indigo-700 hover:underline">
                        {app.applicationCode}
                      </Link>
                    </td>
                    <td className="px-5 py-2.5 text-ink/70">{app.department}</td>
                    <td className="px-5 py-2.5"><StatusBadge status={app.status} /></td>
                    <td className="px-5 py-2.5">
                      {app.status === "approved" ? (
                        <span className="text-xs text-ink/40">—</span>
                      ) : (
                        <SlaTimer deadline={app.slaDeadline} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Compliance deadlines */}
        <Panel title="Compliance Deadlines" action={<Link href="/compliance" className="text-xs font-medium text-indigo-600 hover:underline">View calendar →</Link>}>
          <ul className="divide-y divide-line">
            {complianceItems.map((c) => (
              <li key={c.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">{c.title}</p>
                  <p className="text-xs text-ink/50">
                    Due {new Date(c.deadline).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </div>
                <ComplianceBadge status={c.status} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Eligible schemes */}
      <Panel title="Eligible Incentives & Schemes" action={<Link href="/schemes" className="text-xs font-medium text-indigo-600 hover:underline">View all →</Link>} className="mb-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {schemes.slice(0, 3).map((s) => (
            <Link
              key={s.id}
              href="/schemes"
              className="block rounded border border-line p-4 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors"
            >
              <p className="text-sm font-semibold text-ink leading-snug">{s.name}</p>
              <p className="text-xs text-ink/50 mt-1">{s.category}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
                  <div
                    className="h-full bg-teal-600"
                    style={{ width: `${s.confidenceScore}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-teal-700">{s.confidenceScore}%</span>
              </div>
              <p className="text-[11px] text-ink/40 mt-1">Match confidence</p>
            </Link>
          ))}
        </div>
      </Panel>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Application Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3E7EF" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#14213D99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#14213D99" }} axisLine={false} tickLine={false} width={24} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: "#E3E7EF" }} />
              <Line type="monotone" dataKey="applications" stroke="#1B3A6B" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Applications by Department">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={byDepartment} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
                {byDepartment.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                formatter={(value, entry: any) => (
                  <span className="text-xs text-ink/70">
                    {value} ({entry.payload.value})
                  </span>
                )}
              />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: "#E3E7EF" }} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </AppShell>
  );
}
