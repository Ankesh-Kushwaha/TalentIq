import React, { useState } from "react";

const mockAdmins = [
  {
    id: 1,
    name: "Super Admin",
    email: "super@talentiq.com",
    role: "super_admin",
    status: "active",
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    name: "Admin One",
    email: "admin1@talentiq.com",
    role: "admin",
    status: "active",
    lastActive: "10 mins ago",
  },
  {
    id: 3,
    name: "Admin Two",
    email: "admin2@talentiq.com",
    role: "admin",
    status: "banned",
    lastActive: "2 days ago",
  },
];

const AdminsControl = () => {
  const [admins, setAdmins] = useState(mockAdmins);
  const [search, setSearch] = useState("");

  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()),
  );

  const updateAdmin = (id, updates) => {
    setAdmins((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Admins Control</h2>
        <p className="text-sm text-gray-400">
          Manage admin roles, permissions, and access
        </p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search admin by name or email..."
        className="w-full max-w-md bg-[#111] border border-[#1f2937] rounded px-4 py-2 text-sm outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Admin Table */}
      <div className="overflow-x-auto bg-[#111] border border-[#1f2937] rounded">
        <table className="w-full text-sm">
          <thead className="bg-[#0b0b0b] text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Last Active</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAdmins.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No admins found
                </td>
              </tr>
            )}

            {filteredAdmins.map((admin) => (
              <tr
                key={admin.id}
                className="border-t border-[#1f2937] hover:bg-[#0f172a]"
              >
                <td className="px-4 py-3">{admin.name}</td>
                <td className="px-4 py-3 text-gray-400">{admin.email}</td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      admin.role === "super_admin"
                        ? "bg-purple-500/10 text-purple-400"
                        : "bg-indigo-500/10 text-indigo-400"
                    }`}
                  >
                    {admin.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      admin.status === "active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-400">{admin.lastActive}</td>

                <td className="px-4 py-3 text-right space-x-2">
                  {admin.role !== "super_admin" && (
                    <>
                      <button
                        onClick={() =>
                          updateAdmin(admin.id, { role: "super_admin" })
                        }
                        className="text-xs text-purple-400 hover:underline"
                      >
                        Promote
                      </button>

                      <button
                        onClick={() => updateAdmin(admin.id, { role: "user" })}
                        className="text-xs text-yellow-400 hover:underline"
                      >
                        Demote
                      </button>
                    </>
                  )}

                  {admin.status === "active" ? (
                    <button
                      onClick={() =>
                        updateAdmin(admin.id, { status: "banned" })
                      }
                      className="text-xs text-red-400 hover:underline"
                    >
                      Ban
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateAdmin(admin.id, { status: "active" })
                      }
                      className="text-xs text-green-400 hover:underline"
                    >
                      Unban
                    </button>
                  )}

                  <button className="text-xs text-indigo-400 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Total Admins" value={admins.length} />
        <SummaryCard
          title="Super Admins"
          value={admins.filter((a) => a.role === "super_admin").length}
        />
        <SummaryCard
          title="Banned Admins"
          value={admins.filter((a) => a.status === "banned").length}
        />
      </div>
    </div>
  );
};

/* ---------- Components ---------- */

function SummaryCard({ title, value }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

export default AdminsControl;
