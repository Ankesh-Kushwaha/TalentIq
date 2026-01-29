import { useEffect, useState } from "react";

const mockUsers = [
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
    isBanned: false,
    solved: 12,
    submissions: 34,
  },
  {
    id: "u2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "admin",
    isBanned: false,
    solved: 25,
    submissions: 50,
  },
  {
    id: "u3",
    name: "Charlie Doe",
    email: "charlie@example.com",
    role: "user",
    isBanned: true,
    solved: 5,
    submissions: 10,
  },
];

export default function UserControl() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  /* ---------------- LOAD MOCK DATA ---------------- */
  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const toggleRole = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              role: u.role === "user" ? "admin" : "user",
            }
          : u,
      ),
    );
  };

  const toggleBan = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isBanned: !u.isBanned } : u)),
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-6xl space-y-6">
      <h2 className="text-xl font-semibold">User Control</h2>
      <p className="text-sm text-gray-400">
        Manage all platform users and their roles/status
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#0b0f19] border border-gray-700 rounded px-3 py-2 mt-2"
      />

      {/* Users Table */}
      <div className="overflow-x-auto mt-4 bg-[#111] border border-[#1f2937] rounded">
        <table className="w-full text-sm">
          <thead className="bg-[#0b0b0b] text-gray-400">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Banned</th>
              <th className="px-4 py-2 text-left">Solved</th>
              <th className="px-4 py-2 text-left">Submissions</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}

            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                className="border-t border-[#1f2937] hover:bg-[#0f172a]"
              >
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 font-semibold">{u.role}</td>
                <td className="px-4 py-2">{u.isBanned ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{u.solved}</td>
                <td className="px-4 py-2">{u.submissions}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => toggleRole(u.id)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                  >
                    {u.role === "user" ? "Promote" : "Demote"}
                  </button>

                  <button
                    onClick={() => toggleBan(u.id)}
                    className={`px-2 py-1 rounded text-xs ${
                      u.isBanned
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {u.isBanned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
