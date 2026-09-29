"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import { Panel, PageHeader } from "@/components/ui";
import { schemes, auditLogs, officerUser, applications } from "@/lib/mock-data";
import { Users, Gift, ScrollText, Database } from "lucide-react";

const tabs = [
  { id: "schemes", label: "Schemes", icon: Gift },
  { id: "users", label: "Users", icon: Users },
  { id: "knowledge", label: "Knowledge Base", icon: Database },
  { id: "audit", label: "Audit Logs", icon: ScrollText },
] as const;

type TabId = (typeof tabs)[number]["id"];

const mockUsers = [
  { id: "u-1", name: "ABC Industries", role: "entrepreneur", email: "contact@abcindustries.in" },
  { id: "u-2", name: "S. Deshmukh", role: "officer", email: "s.deshmukh@mpcb.gov.in" },
  { id: "u-3", name: "R. Kulkarni", role: "inspector", email: "r.kulkarni@fire.gov.in" },
  { id: "u-4", name: "MSInS Admin", role: "admin", email: "admin@msins.gov.in" },
];

export default function AdminPage() {
  const [tab, setTab] = useState<TabId>("schemes");

  return (
    <AppShell name="MSInS Admin" role="Admin" variant="officer">
      <PageHeader title="Admin Panel" description="Manage users, schemes, approval rules, and the AI knowledge base." />

      <div className="flex gap-2 mb-6 border-b border-line">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 -mb-px ${
                tab === t.id ? "border-indigo-600 text-indigo-700" : "border-transparent text-ink/50 hover:text-ink"
              }`}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "schemes" && (
        <Panel title="Government Schemes" action={<button className="text-xs font-medium text-white bg-indigo-600 rounded px-3 py-1.5 hover:bg-indigo-700">+ Add Scheme</button>}>
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink/40 uppercase tracking-wide border-b border-line">
                  <th className="px-5 py-2.5 font-medium">Scheme</th>
                  <th className="px-5 py-2.5 font-medium">Category</th>
                  <th className="px-5 py-2.5 font-medium">Benefit</th>
                  <th className="px-5 py-2.5 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {schemes.map((s) => (
                  <tr key={s.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-medium text-ink">{s.name}</td>
                    <td className="px-5 py-3 text-ink/60">{s.category}</td>
                    <td className="px-5 py-3 text-ink/60 max-w-xs truncate">{s.benefits}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-xs font-medium text-indigo-600 hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      {tab === "users" && (
        <Panel title="Users" action={<button className="text-xs font-medium text-white bg-indigo-600 rounded px-3 py-1.5 hover:bg-indigo-700">+ Add User</button>}>
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink/40 uppercase tracking-wide border-b border-line">
                  <th className="px-5 py-2.5 font-medium">Name</th>
                  <th className="px-5 py-2.5 font-medium">Role</th>
                  <th className="px-5 py-2.5 font-medium">Email</th>
                  <th className="px-5 py-2.5 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((u) => (
                  <tr key={u.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-medium text-ink">{u.name}</td>
                    <td className="px-5 py-3 text-ink/60 capitalize">{u.role}</td>
                    <td className="px-5 py-3 text-ink/60">{u.email}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-xs font-medium text-indigo-600 hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      {tab === "knowledge" && (
        <Panel title="Knowledge Base (RAG source documents)">
          <div className="rounded border-2 border-dashed border-line p-8 text-center">
            <Database className="mx-auto text-ink/20 mb-2" size={28} />
            <p className="text-sm text-ink/50">Upload regulations, scheme guidelines, and circulars for the AI assistant to cite.</p>
            <button className="mt-3 text-sm font-medium text-white bg-indigo-600 rounded px-4 py-2 hover:bg-indigo-700">
              Upload Document
            </button>
          </div>
          <ul className="mt-4 text-sm divide-y divide-line">
            <li className="py-2 flex justify-between"><span>Maharashtra Industrial Development Act</span><span className="text-xs text-ink/40">Updated 12 Aug 2026</span></li>
            <li className="py-2 flex justify-between"><span>MPCB Consent Guidelines v3</span><span className="text-xs text-ink/40">Updated 03 Sep 2026</span></li>
            <li className="py-2 flex justify-between"><span>MAITRI Single Window Policy 2016</span><span className="text-xs text-ink/40">Updated 20 Jun 2026</span></li>
          </ul>
        </Panel>
      )}

      {tab === "audit" && (
        <Panel title="Audit Logs">
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink/40 uppercase tracking-wide border-b border-line">
                  <th className="px-5 py-2.5 font-medium">User</th>
                  <th className="px-5 py-2.5 font-medium">Action</th>
                  <th className="px-5 py-2.5 font-medium">Resource</th>
                  <th className="px-5 py-2.5 font-medium">Timestamp</th>
                  <th className="px-5 py-2.5 font-medium">IP</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((l) => (
                  <tr key={l.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 text-ink/80">{l.user}</td>
                    <td className="px-5 py-3 text-ink/60">{l.action.replaceAll("_", " ")}</td>
                    <td className="px-5 py-3 text-ink/60">{l.resourceType}</td>
                    <td className="px-5 py-3 text-ink/60">{new Date(l.timestamp).toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3 text-ink/40 text-xs">{l.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}
    </AppShell>
  );
}
