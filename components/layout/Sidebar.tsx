import Link from "next/link";

const menuItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/records/running", label: "Running" },
  { href: "/records/weight", label: "Weight" },
  { href: "/records/sleep", label: "Sleep" },
  { href: "/reports/weekly", label: "Weekly Report" },
  { href: "/reports/monthly", label: "Monthly Report" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200 px-6 py-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-950"
        >
          Health Dashboard
        </Link>
        <p className="mt-1 text-sm text-slate-500">Personal Health Analytics</p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
