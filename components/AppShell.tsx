import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({
  children,
  name,
  role,
  variant = "entrepreneur",
}: {
  children: React.ReactNode;
  name: string;
  role: string;
  variant?: "entrepreneur" | "officer";
}) {
  return (
    <div className="min-h-screen bg-cloud">
      <Sidebar variant={variant} />
      <div className="md:pl-64">
        <Topbar name={name} role={role} />
        <main className="p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
