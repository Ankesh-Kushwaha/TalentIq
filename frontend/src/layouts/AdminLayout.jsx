import { NavLink, Outlet } from "react-router-dom";
import { FileText, LayoutDashboard, PlusSquare, Trophy } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1f2937] p-5 bg-[#111]">
        <h1 className="text-xl font-semibold text-white mb-6">Admin Panel</h1>

        <nav className="space-y-2">
          <AdminLink
            to="control/dashboard"
            icon={<LayoutDashboard size={16} />}
            label="Dashboard"
            end="true"
          />
          
          <AdminLink
            to="problems"
            icon={<FileText size={16} />}
            label="Problems"
            end="true"
          />
          <AdminLink
            to="problems/new"
            icon={<PlusSquare size={16} />}
            label="Create Problem"
          />
          <AdminLink
            to="problems/set/testcases"
            icon={<Trophy size={16} />}
            label="Set Test Cases"
          />
          <AdminLink
            to="control/contests"
            icon={<Trophy size={16} />}
            label="Contests Control"
          />

          <AdminLink
            to="control/user/access"
            icon={<Trophy size={16} />}
            label="User Control"
            end="true"
          />
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

function AdminLink({ to, icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded text-sm ${
          isActive
            ? "bg-yellow-400 text-black"
            : "text-gray-300 hover:bg-[#1a1a1a]"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

