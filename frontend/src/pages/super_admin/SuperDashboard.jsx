import { useEffect } from "react";
import { toast } from "react-toastify";

export default function SuperDashboard() {
  useEffect(()=>{toast.success("Welcome back......")},[])
  return (
    <div className="space-y-10">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">Platform Overview</h2>
      {/* Core Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Total Users" value="12,340" />
        <Stat title="Admins" value="18" />
        <Stat title="Problems" value="1,245" />
        <Stat title="Submissions Today" value="8,921" />
      </div>

      {/* System Health */}
      <section>
        <h3 className="text-lg font-semibold mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HealthCard title="API Status" value="Operational" status="good" />
          <HealthCard title="Judge Engine" value="Running" status="good" />
          <HealthCard title="Error Rate (24h)" value="0.8%" status="warn" />
        </div>
      </section>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <section className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="bg-[#111] border border-[#1f2937] rounded p-4 space-y-3">
            <Activity
              text="New problem added: Binary Search II"
              time="5 mins ago"
            />
            <Activity
              text="Company Amazon created an assessment"
              time="32 mins ago"
            />
            <Activity text="User flagged for plagiarism" time="1 hour ago" />
            <Activity text="New admin account approved" time="3 hours ago" />
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="bg-[#111] border border-[#1f2937] rounded p-4 space-y-3">
            <ActionButton label="Add Problem" />
            <ActionButton label="Create Assessment" />
            <ActionButton label="Manage Users" />
            <ActionButton label="View System Logs" />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Stat({ title, value }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function HealthCard({ title, value, status }) {
  const statusColor =
    status === "good"
      ? "text-green-400"
      : status === "warn"
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="bg-[#111] border border-[#1f2937] rounded p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className={`text-lg font-semibold mt-1 ${statusColor}`}>{value}</p>
    </div>
  );
}

function Activity({ text, time }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-300">{text}</span>
      <span className="text-gray-500">{time}</span>
    </div>
  );
}

function ActionButton({ label }) {
  return (
    <button className="w-full bg-[#1f2937] hover:bg-[#374151] text-sm py-2 rounded transition">
      {label}
    </button>
  );
}
