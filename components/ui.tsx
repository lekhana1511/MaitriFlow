import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { slaDaysRemaining } from "@/lib/mock-data";
import type { ApprovalStatus, ComplianceStatus, RiskLevel } from "@/lib/types";

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("bg-white border border-line rounded shadow-panel", className)}>
      {title && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-heading font-semibold text-ink text-[15px]">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  tone,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone: "indigo" | "teal" | "saffron" | "alert";
  href?: string;
}) {
  const toneMap = {
    indigo: "bg-indigo-50 text-indigo-700 border-l-indigo-600",
    teal: "bg-teal-50 text-teal-700 border-l-teal-600",
    saffron: "bg-saffron-50 text-saffron-700 border-l-saffron-600",
    alert: "bg-alert-50 text-alert-700 border-l-alert-600",
  };
  return (
    <div className={clsx("bg-white border border-line border-l-4 rounded shadow-panel p-4", toneMap[tone].split(" ").slice(-1))}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink/50 uppercase tracking-wide">{label}</p>
          <p className="font-heading text-2xl font-bold text-ink mt-1">{value}</p>
        </div>
        <div className={clsx("h-9 w-9 rounded flex items-center justify-center", toneMap[tone].split(" ").slice(0, 2).join(" "))}>
          <Icon size={18} />
        </div>
      </div>
      {href && (
        <a href={href} className="text-xs font-medium text-indigo-600 hover:underline mt-3 inline-block">
          View all →
        </a>
      )}
    </div>
  );
}

const statusConfig: Record<ApprovalStatus, { label: string; tone: string }> = {
  submitted: { label: "Submitted", tone: "bg-indigo-100 text-indigo-700" },
  under_review: { label: "Under Review", tone: "bg-saffron-100 text-saffron-700" },
  inspection_scheduled: { label: "Inspection Scheduled", tone: "bg-indigo-100 text-indigo-700" },
  query_raised: { label: "Query Raised", tone: "bg-alert-100 text-alert-700" },
  approved: { label: "Approved", tone: "bg-teal-100 text-teal-700" },
  rejected: { label: "Rejected", tone: "bg-alert-100 text-alert-700" },
};

export function StatusBadge({ status }: { status: ApprovalStatus }) {
  const c = statusConfig[status];
  return (
    <span className={clsx("inline-flex items-center rounded px-2 py-0.5 text-xs font-medium", c.tone)}>
      {c.label}
    </span>
  );
}

const complianceConfig: Record<ComplianceStatus, { label: string; tone: string }> = {
  compliant: { label: "Compliant", tone: "bg-teal-100 text-teal-700" },
  due_soon: { label: "Due Soon", tone: "bg-saffron-100 text-saffron-700" },
  overdue: { label: "Overdue", tone: "bg-alert-100 text-alert-700" },
  pending: { label: "Pending", tone: "bg-indigo-100 text-indigo-700" },
};

export function ComplianceBadge({ status }: { status: ComplianceStatus }) {
  const c = complianceConfig[status];
  return (
    <span className={clsx("inline-flex items-center rounded px-2 py-0.5 text-xs font-medium", c.tone)}>
      {c.label}
    </span>
  );
}

const riskConfig: Record<RiskLevel, { label: string; tone: string }> = {
  low: { label: "Low risk", tone: "bg-teal-100 text-teal-700" },
  medium: { label: "Medium risk", tone: "bg-saffron-100 text-saffron-700" },
  high: { label: "High risk", tone: "bg-alert-100 text-alert-700" },
};

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const c = riskConfig[risk];
  return (
    <span className={clsx("inline-flex items-center rounded px-2 py-0.5 text-xs font-medium", c.tone)}>
      {c.label}
    </span>
  );
}

export function SlaTimer({ deadline }: { deadline: string }) {
  const days = slaDaysRemaining(deadline);
  const overdue = days < 0;
  const soon = days >= 0 && days <= 5;
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
        overdue
          ? "bg-alert-100 text-alert-700"
          : soon
          ? "bg-saffron-100 text-saffron-700"
          : "bg-cloud text-ink/60"
      )}
    >
      {overdue ? `${Math.abs(days)}d overdue` : `Due in ${days}d`}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">{title}</h1>
        {description && <p className="text-sm text-ink/55 mt-1 max-w-xl">{description}</p>}
      </div>
      {action}
    </div>
  );
}
