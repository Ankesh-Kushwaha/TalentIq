export default function SuperDashboard() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Platform Overview</h2>

      <div className="grid grid-cols-4 gap-4">
        <Stat title="Total Users" value="12,340" />
        <Stat title="Admins" value="18" />
        <Stat title="Problems" value="1,245" />
        <Stat title="Submissions Today" value="8,921" />
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
