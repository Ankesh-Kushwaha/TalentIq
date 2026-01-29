import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../../apis/auth.api";

const roles = ["user", "admin", "super_admin"];
const USERS_PER_PAGE = 5;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // 🔹 Fetch users
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;

    const fetchUser = async () => {
      const data = await getAllUser(token);
      setUsers(data || []);
    };

    fetchUser();
  }, []);

  // 🔹 Reset page on search
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [search]);

  // 🔹 Update user locally
  const updateUser = (id, updates) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, ...updates } : u)),
    );
  };

  // 🔹 Filter users (SAFE)
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();

    return (
      (u.username?.toLowerCase() || "").includes(q) ||
      (u.email?.toLowerCase() || "").includes(q) ||
      (u.role?.toLowerCase() || "").includes(q)
    );
  });

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">User Management</h2>
        <p className="text-sm text-gray-400">
          Manage users, roles, and access control
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          className="w-full max-w-md bg-[#111] border border-[#1f2937] rounded px-4 py-2 text-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-[#111] border border-[#1f2937] rounded">
        <table className="w-full text-sm">
          <thead className="bg-[#0b0b0b] text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}

            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t border-[#1f2937] hover:bg-[#0f172a]"
              >
                <td
                  className="px-4 py-3 hover:underline cursor-pointer"
                  onClick={() => navigate(`/profile/${user._id}`)}
                >
                  {user.username}
                </td>

                <td className="px-4 py-3 text-gray-400">{user.email}</td>

                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateUser(user._id, { role: e.target.value })
                    }
                    className="bg-[#111] border border-[#1f2937] rounded px-2 py-1 text-xs"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      user.status === "active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {user.status || "-"}
                  </span>
                </td>

                <td className="px-4 py-3 text-right space-x-2">
                  {user.status === "active" ? (
                    <button
                      onClick={() => updateUser(user._id, { status: "banned" })}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Ban
                    </button>
                  ) : (
                    <button
                      onClick={() => updateUser(user._id, { status: "active" })}
                      className="text-xs text-green-400 hover:underline"
                    >
                      Unban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 text-sm rounded bg-[#111] border border-[#1f2937] disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-[#111] border-[#1f2937] text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 text-sm rounded bg-[#111] border border-[#1f2937] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Extra Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ControlCard title="Total Users" value={users.length} />
        <ControlCard
          title="Banned Users"
          value={users.filter((u) => u.status === "banned").length}
        />
        <ControlCard
          title="Admins"
          value={users.filter((u) => u.role !== "user").length}
        />
      </div>
    </div>
  );
};

function ControlCard({ title, value }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

export default AllUsers;
