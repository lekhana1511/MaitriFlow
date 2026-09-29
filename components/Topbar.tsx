"use client";

import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { notifications as allNotifications } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";

export default function Topbar({
  name,
  role,
}: {
  name: string;
  role: string;
}) {
  const [open, setOpen] = useState(false);
  const unread = allNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-line bg-white/90 backdrop-blur flex items-center justify-between px-6">
      <div className="text-sm text-ink/50">
        Last synced <span className="font-medium text-ink/70">10:45 AM, 26 Sep 2026</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-cloud"
          >
            <Bell size={19} className="text-ink/70" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-alert-600 text-white text-[10px] font-semibold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-80 rounded border border-line bg-white shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-line flex items-center justify-between">
                <span className="text-sm font-semibold">Notifications</span>
                <button className="text-xs text-indigo-600 font-medium hover:underline">
                  Mark all read
                </button>
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {allNotifications.slice(0, 5).map((n) => (
                  <li
                    key={n.id}
                    className={clsx(
                      "px-4 py-3 text-sm border-b border-line last:border-0",
                      !n.read && "bg-indigo-50/50"
                    )}
                  >
                    <p className="text-ink/90">{n.message}</p>
                    <p className="text-xs text-ink/40 mt-1">
                      {formatDistanceToNow(new Date(n.createdAt))} ago
                    </p>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 text-center border-t border-line">
                <button className="text-xs font-medium text-indigo-600 hover:underline">
                  View all
                </button>
              </div>
            </div>
          )}
        </div>
        <button className="flex items-center gap-2 pl-3 border-l border-line">
          <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
            {name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium leading-tight">{name}</p>
            <p className="text-xs text-ink/50 leading-tight capitalize">{role}</p>
          </div>
          <ChevronDown size={15} className="text-ink/40" />
        </button>
      </div>
    </header>
  );
}
