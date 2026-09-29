"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  UploadCloud,
  FileStack,
  CalendarClock,
  Gift,
  MessagesSquare,
  Users,
  ShieldCheck,
  LogOut,
  Leaf,
} from "lucide-react";
import clsx from "clsx";

const entrepreneurNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/checklist", label: "Approvals Checklist", icon: ClipboardList },
  { href: "/documents", label: "Document Upload", icon: UploadCloud },
  { href: "/applications", label: "My Applications", icon: FileStack },
  { href: "/compliance", label: "Compliance Calendar", icon: CalendarClock },
  { href: "/schemes", label: "Incentives & Schemes", icon: Gift },
  { href: "/assistant", label: "AI Assistant", icon: MessagesSquare },
];

const officerNav = [
  { href: "/officer", label: "Officer Dashboard", icon: LayoutDashboard },
  { href: "/admin", label: "Admin Panel", icon: ShieldCheck },
];

export default function Sidebar({ variant = "entrepreneur" }: { variant?: "entrepreneur" | "officer" }) {
  const pathname = usePathname();
  const nav = variant === "entrepreneur" ? entrepreneurNav : officerNav;

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-line bg-white">
      <div className="flex items-center gap-2 px-6 h-16 border-b border-line">
        <Leaf className="text-teal-600" size={22} strokeWidth={2.5} />
        <span className="font-heading font-extrabold text-lg text-indigo-700">
          MaitriFlow
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-ink/70 hover:bg-cloud hover:text-ink"
              )}
            >
              <Icon size={18} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-4 pt-2 border-t border-line">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-ink/60 hover:bg-cloud hover:text-alert-600"
        >
          <LogOut size={18} strokeWidth={2} />
          Log out
        </Link>
      </div>
    </aside>
  );
}
