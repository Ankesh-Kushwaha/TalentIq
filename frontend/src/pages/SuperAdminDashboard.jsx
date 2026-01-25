import { Shield, Server, UserCog } from "lucide-react";

/* MOCK DATA */
const users = [
  { id: 1, username: "ankesh_k", role: "ADMIN" },
  { id: 2, username: "coder123", role: "USER" },
];

const containers = [
  { id: 1, language: "C++", image: "cpp-judge:v1" },
  { id: 2, language: "Python", image: "python-judge:v2" },
];

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Shield className="text-red-400" /> Super Admin Control
        </h1>

        {/* =======================
            USER ROLES
        ======================== */}
        <Section title="User Role Management" icon={<UserCog size={18} />}>
          {users.map((u) => (
            <div
              key={u.id}
              className="flex justify-between items-center border border-[#1f2937] rounded p-3"
            >
              <span>{u.username}</span>
              <select
                defaultValue={u.role}
                className="bg-[#111] border border-[#1f2937] px-2 py-1 rounded"
              >
                <option>USER</option>
                <option>ADMIN</option>
                <option>SUPER_ADMIN</option>
              </select>
            </div>
          ))}
        </Section>

        {/* =======================
            JUDGE CONTAINERS
        ======================== */}
        <Section title="Judge Worker Containers" icon={<Server size={18} />}>
          {containers.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center border border-[#1f2937] rounded p-3"
            >
              <span>{c.language}</span>
              <span className="text-sm text-gray-400">{c.image}</span>
            </div>
          ))}

          <button className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded">
            Add New Language Container
          </button>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded-xl p-6">
      <h2 className="font-semibold mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
