import React, { useState } from "react";

/* ---------------- MOCK AUDIT LOGS ---------------- */

const AUDIT_LOGS = [
  {
    id: "a1",
    actor: "super_admin",
    action: "UPDATED_PLATFORM_SETTINGS",
    target: "PlatformSettings",
    ip: "103.21.xx.xx",
    userAgent: "Chrome / Windows",
    timestamp: "2026-01-30 14:22:10",
    severity: "critical",
  },
  {
    id: "a2",
    actor: "admin_john",
    action: "DELETED_PROBLEM",
    target: "Problem #245",
    ip: "182.76.xx.xx",
    userAgent: "Firefox / Linux",
    timestamp: "2026-01-30 13:58:44",
    severity: "high",
  },
  {
    id: "a3",
    actor: "system",
    action: "AUTO_BANNED_USER",
    target: "user_akdjddd",
    ip: "internal",
    userAgent: "rule-engine",
    timestamp: "2026-01-30 12:10:02",
    severity: "medium",
  },
  {
    id: "a4",
    actor: "super_admin",
    action: "UPDATED_JUDGE_CONTAINER",
    target: "Language: python",
    ip: "103.21.xx.xx",
    userAgent: "Chrome / Windows",
    timestamp: "2026-01-29 22:41:33",
    severity: "critical",
  },
];

/* ---------------- PAGE ---------------- */

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("ALL");

  const filteredLogs = AUDIT_LOGS.filter((log) => {
    const matchesSeverity = severity === "ALL" || log.severity === severity;
    const matchesSearch =
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Audit Logs</h2>
        <p className="text-sm text-gray-400">
          Immutable record of all administrative and system actions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          placeholder="Search actor, action, target..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#0b0b0b] border border-[#1f2937] rounded px-4 py-2 text-sm"
        />

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="bg-[#0b0b0b] border border-[#1f2937] rounded px-4 py-2 text-sm"
        >
          <option value="ALL">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-[#1f2937] rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#0b0b0b] text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">Timestamp</th>
              <th className="px-4 py-3 text-left">Actor</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Target</th>
              <th className="px-4 py-3 text-left">IP</th>
              <th className="px-4 py-3 text-left">User Agent</th>
              <th className="px-4 py-3 text-left">Severity</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No audit logs found
                </td>
              </tr>
            )}

            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className="border-t border-[#1f2937] hover:bg-[#0f172a]"
              >
                <td className="px-4 py-3 font-mono">{log.timestamp}</td>
                <td className="px-4 py-3">{log.actor}</td>
                <td className="px-4 py-3 text-indigo-400">{log.action}</td>
                <td className="px-4 py-3">{log.target}</td>
                <td className="px-4 py-3 text-gray-400">{log.ip}</td>
                <td className="px-4 py-3 text-gray-400">{log.userAgent}</td>
                <td className="px-4 py-3">
                  <SeverityBadge level={log.severity} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <p className="text-xs text-gray-500">
        Audit logs are immutable and retained for compliance and security
        investigations.
      </p>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SeverityBadge({ level }) {
  const styles = {
    critical: "bg-red-700 text-red-100",
    high: "bg-red-500 text-red-100",
    medium: "bg-yellow-500 text-yellow-900",
    low: "bg-green-600 text-green-100",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${
        styles[level] || "bg-gray-500"
      }`}
    >
      {level.toUpperCase()}
    </span>
  );
}
