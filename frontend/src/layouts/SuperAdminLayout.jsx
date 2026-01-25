import { NavLink, Outlet } from "react-router-dom";

export default function SuperAdminLayout() {
  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-gray-200">
      <aside className="w-72 bg-[#111] border-r border-[#1f2937] p-6">
        <h1 className="text-xl font-bold text-red-400 mb-6">Super Admin</h1>

        <nav className="space-y-2 text-sm">
          <Link to="" label="Dashboard" />
          <Link to="users" label="All Users" />
          <Link to="admins" label="Admins Control" />

          <div className="pt-4 text-gray-500 uppercase text-xs">Platform</div>
          <Link to="platform/activity" label="Activity" />
          <Link to="platform/logs" label="Audit Logs" />

          <div className="pt-4 text-gray-500 uppercase text-xs">Content</div>
          <Link to="content/problems" label="All Problems" />
          <Link to="content/testcases" label="All Testcases" />

          <div className="pt-4 text-gray-500 uppercase text-xs">System</div>
          <Link to="settings" label="Settings" />
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

function Link({ to, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `block px-3 py-2 rounded ${
          isActive ? "bg-red-500 text-black" : "hover:bg-[#1a1a1a]"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
