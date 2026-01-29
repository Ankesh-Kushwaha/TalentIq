import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [data, setData] = useState({
    problems: { total: 0, published: 0, drafts: 0 },
    users: { total: 0, admins: 0, banned: 0 },
    submissions: { today: 0, total: 0 },
    ratings: { average: 0, top: [] },
    earnings: { total: 0, monthly: 0 },
  });

  // Mock fetch function
  useEffect(() => {
    toast.success("Welcome back....")
    const fetchData = async () => {
      // Replace with your API calls
      await new Promise((r) => setTimeout(r, 500));
      setData({
        problems: { total: 1245, published: 1023, drafts: 222 },
        users: { total: 12340, admins: 18, banned: 5 },
        submissions: { today: 8921, total: 123456 },
        ratings: { average: 4.5, top: ["Alice", "Bob", "Charlie"] },
        earnings: { total: 12500, monthly: 1200 },
      });
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard title="Total Problems" value={data.problems.total} />
        <StatCard title="Published Problems" value={data.problems.published} />
        <StatCard title="Draft Problems" value={data.problems.drafts} />
        <StatCard title="Total Users" value={data.users.total} />
        <StatCard title="Admins" value={data.users.admins} />
        <StatCard title="Banned Users" value={data.users.banned} />
        <StatCard title="Submissions Today" value={data.submissions.today} />
        <StatCard title="Total Submissions" value={data.submissions.total} />
        <StatCard title="Average Rating" value={data.ratings.average} />
        <StatCard title="Earnings Total ($)" value={data.earnings.total} />
        <StatCard
          title="Earnings This Month ($)"
          value={data.earnings.monthly}
        />
      </div>

      {/* Top Users / Leaderboard */}
      <div className="bg-[#111] border border-[#1f2937] rounded p-4">
        <h3 className="font-semibold mb-2">Top Rated Users</h3>
        <ul className="list-disc pl-5 text-sm text-gray-400">
          {data.ratings.top.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      </div>

      {/* Quick Management */}
      <div className="bg-[#111] border border-[#1f2937] rounded p-4">
        <h3 className="font-semibold mb-2">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-yellow-400 text-black rounded">
            Create Problem
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Manage Contests
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            View Testcases
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded">
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------- Stat Card ------------------- */
function StatCard({ title, value }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
