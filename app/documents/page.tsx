"use client";

import { useState, useCallback } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Panel, PageHeader } from "@/components/ui";
import { currentUser } from "@/lib/mock-data";
import clsx from "clsx";

type DocStatus = "validating" | "valid" | "invalid";

interface DocRow {
  id: string;
  name: string;
  approval: string;
  status: DocStatus;
  issue: string | null;
}

// Pre-populated rows: documents already on file for this applicant, as the backend
// would return them from GET /documents?application_id=... across all approvals.
const initialRows: DocRow[] = [
  { id: "r-1", name: "CIN Certificate", approval: "All", status: "valid", issue: null },
  { id: "r-2", name: "Land Ownership Proof", approval: "Factory Licence", status: "valid", issue: null },
  { id: "r-3", name: "Site Plan", approval: "Building Plan Approval", status: "invalid", issue: "Page not clear" },
  { id: "r-4", name: "Pollution Control Form", approval: "MPCB", status: "valid", issue: null },
];

// Deterministic mock OCR/NLP outcome based on filename — simulates backend POST /documents/{id}/validate
function mockValidate(filename: string): { approval: string; issue: string | null } {
  const lower = filename.toLowerCase();
  if (lower.includes("roster") || lower.includes("employee")) {
    return { approval: "Factory Licence", issue: "Missing authorized signatory stamp on page 2" };
  }
  if (lower.includes("plan") || lower.includes("site")) {
    return { approval: "Building Plan Approval", issue: null };
  }
  if (lower.includes("consent") || lower.includes("mpcb")) {
    return { approval: "MPCB", issue: "Expiry date not detected" };
  }
  if (lower.includes("fire")) {
    return { approval: "Fire NOC", issue: null };
  }
  return { approval: "All", issue: null };
}

function displayName(filename: string): string {
  const base = filename.replace(/\.[^/.]+$/, "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DocumentUploadPage() {
  const [rows, setRows] = useState<DocRow[]>(initialRows);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback((fileList: FileList) => {
    const incoming: DocRow[] = Array.from(fileList).map((f) => ({
      id: `${f.name}-${Date.now()}`,
      name: displayName(f.name),
      approval: "—",
      status: "validating",
      issue: null,
    }));
    setRows((prev) => [...incoming, ...prev]);

    incoming.forEach((row, i) => {
      setTimeout(() => {
        const { approval, issue } = mockValidate(row.name);
        setRows((prev) =>
          prev.map((r) =>
            r.id === row.id ? { ...r, approval, status: issue ? "invalid" : "valid", issue } : r
          )
        );
      }, 1000 + i * 300);
    });
  }, []);

  return (
    <AppShell name={currentUser.companyName ?? currentUser.username} role="Entrepreneur">
      <PageHeader
        title="Document Upload & Pre-Validation"
        description="Upload the required documents for each approval. Our system automatically checks format, fields and expiry, and shows real-time feedback."
      />

      <Panel>
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
          }}
          className={clsx(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-10 px-4 cursor-pointer transition-colors",
            dragOver ? "border-indigo-600 bg-indigo-50" : "border-indigo-200 bg-indigo-50/40 hover:border-indigo-400"
          )}
        >
          <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-panel">
            <UploadCloud className="text-white" size={22} />
          </div>
          <p className="text-sm text-ink mt-1">
            Drag & drop files here or{" "}
            <span className="text-indigo-600 font-semibold">Browse Files</span>
          </p>
          <p className="text-xs text-ink/40">PDF, JPG, PNG (Max 10MB)</p>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </label>

        <h2 className="font-heading font-semibold text-ink text-[15px] mt-6 mb-3">
          Uploaded Documents
        </h2>
        <div className="overflow-x-auto rounded border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-ink/40 uppercase tracking-wide bg-cloud border-b border-line">
                <th className="px-4 py-2.5 font-medium">Document Name</th>
                <th className="px-4 py-2.5 font-medium">Approval</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Issues</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0 hover:bg-cloud/60">
                  <td className="px-4 py-3 font-medium text-ink">{r.name}</td>
                  <td className="px-4 py-3 text-ink/60">{r.approval}</td>
                  <td className="px-4 py-3">
                    {r.status === "validating" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full px-2.5 py-1">
                        <Loader2 size={11} className="animate-spin" /> Checking
                      </span>
                    ) : (
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                          r.status === "valid" ? "bg-teal-100 text-teal-700" : "bg-alert-100 text-alert-700"
                        )}
                      >
                        {r.status === "valid" ? "Valid" : "Error"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink/60">
                    {r.status === "invalid" ? (
                      <span className="text-alert-700">{r.issue}</span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
