import React, { useState } from "react";

/* ---------------- MOCK ACTIVITY LOGS ---------------- */

const ACTIVITY_LOGS = [
  {
    id: 1,
    type: "USER",
    message: "User akdjddd registered",
    actor: "system",
    time: "2 minutes ago",
    level: "info",
  },
  {
    id: 2,
    type: "ADMIN",
    message: "Admin promoted user john_doe to moderator",
    actor: "super_admin",
    time: "10 minutes ago",
    level: "warning",
  },
  {
    id: 3,
    type: "JUDGE",
    message: "Submission failed (TLE) for problem #123",
    actor: "judge-worker-2",
    time: "18 minutes ago",
    level: "error",
  },
  {
    id: 4,
    type: "SYSTEM",
    message: "Maintenance mode enabled",
    actor: "super_admin",
    time: "1 hour ago",
    level: "critical",
  },
  {
    id: 5,
    type: "SECURITY",
    message: "Rate limit triggered for IP 103.xx.xx.xx",
    actor: "api-gateway",
    time: "3 hours ago",
    level: "error",
  },
];

/* ---------------- PAGE ---------------- */

export default function PlatformActivity() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const filteredLogs = ACTIVITY_LOGS.filter((log) => {
    const matchesType = filterType === "ALL" || log.type === filterType;
    const matchesSearch =
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Platform Activity</h2>
        <p className="text-sm text-gray-400">
          System-wide events, admin actions, and judge activity
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          placeholder="Search activity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#0b0b0b] border border-[#1f2937] rounded px-4 py-2 text-sm"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-[#0b0b0b] border border-[#1f2937] rounded px-4 py-2 text-sm"
        >
          <option value="ALL">All Events</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="JUDGE">Judge</option>
          <option value="SYSTEM">System</option>
          <option value="SECURITY">Security</option>
        </select>
      </div>

      {/* Activity Feed */}
      <div className="bg-[#111] border border-[#1f2937] rounded">
        {filteredLogs.length === 0 && (
          <div className="p-6 text-center text-gray-500">No activity found</div>
        )}

        {filteredLogs.map((log) => (
          <ActivityItem key={log.id} log={log} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ActivityItem({ log }) {
  return (
    <div className="flex gap-4 px-6 py-4 border-b border-[#1f2937] hover:bg-[#0f172a]">
      <div className={`mt-1 w-2 h-2 rounded-full ${levelColor(log.level)}`} />

      <div className="flex-1">
        <p className="text-sm">{log.message}</p>

        <div className="text-xs text-gray-400 mt-1 flex gap-4">
          <span>Actor: {log.actor}</span>
          <span>Type: {log.type}</span>
          <span>{log.time}</span>
        </div>
      </div>

      <span
        className={`text-xs px-2 py-1 rounded border ${badgeStyle(log.level)}`}
      >
        {log.level.toUpperCase()}
      </span>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function levelColor(level) {
  if (level === "info") return "bg-blue-500";
  if (level === "warning") return "bg-yellow-500";
  if (level === "error") return "bg-red-500";
  if (level === "critical") return "bg-red-700";
  return "bg-gray-500";
}

function badgeStyle(level) {
  if (level === "info") return "border-blue-500 text-blue-400";
  if (level === "warning") return "border-yellow-500 text-yellow-400";
  if (level === "error") return "border-red-500 text-red-400";
  if (level === "critical") return "border-red-700 text-red-500";
  return "border-gray-500 text-gray-400";
}
