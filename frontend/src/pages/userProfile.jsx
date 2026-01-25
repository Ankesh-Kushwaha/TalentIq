import { motion } from "framer-motion";
import { Trophy, Code, BarChart, Flame, Clock, Terminal } from "lucide-react";

/* =======================
   MOCK USER DATA
======================= */
const user = {
  name: "Ankesh Kushwaha",
  username: "ankesh_k",
  rating: 2148,
  rank: "Expert",
  globalRank: 1284,
  joined: "Jan 2024",
  acceptanceRate: 54.2,
  contests: 27,
  fastestSolve: "2m 14s",
  primaryLanguage: "C++",
};

const problemStats = {
  total: 612,
  easy: 310,
  medium: 241,
  hard: 61,
};

const ratingHistory = [
  { month: "Jan", rating: 1450 },
  { month: "Feb", rating: 1200 },
  { month: "Mar", rating: 1380 },
  { month: "Apr", rating: 1450 },
  { month: "May", rating: 2080 },
  { month: "Jun", rating: 2148 },
];

const recentSubmissions = [
  {
    id: 1,
    problem: "Two Sum",
    status: "Accepted",
    lang: "C++",
    time: "5 mins ago",
  },
  {
    id: 2,
    problem: "Longest Substring",
    status: "Wrong Answer",
    lang: "Python",
    time: "22 mins ago",
  },
  {
    id: 3,
    problem: "Merge K Sorted Lists",
    status: "Accepted",
    lang: "Java",
    time: "1 hour ago",
  },
];

const badges = [
  "🔥 100-Day Streak",
  "🏆 Monthly Winner",
  "⚡ Fast Solver",
  "💡 Editorial Contributor",
];

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      {/* =======================
          HEADER
      ======================== */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="h-24 w-24 rounded-full bg-yellow-400 text-black flex items-center justify-center text-3xl font-bold">
          A
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-white">{user.name}</h1>
          <p className="text-gray-400">@{user.username}</p>

          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            <span className="text-yellow-400">Rating: {user.rating}</span>
            <span className="text-gray-400">Rank: {user.rank}</span>
            <span className="text-gray-400">
              Global Rank: #{user.globalRank}
            </span>
            <span className="text-gray-400">Joined {user.joined}</span>
          </div>
        </div>
      </div>

      {/* =======================
          STATS CARDS
      ======================== */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<Code />} label="Solved" value={problemStats.total} />
        <StatCard
          icon={<BarChart />}
          label="Acceptance"
          value={`${user.acceptanceRate}%`}
        />
        <StatCard icon={<Flame />} label="Contests" value={user.contests} />
        <StatCard icon={<Trophy />} label="Rank" value={user.rank} />
      </div>

      {/* =======================
          MAIN GRID
      ======================== */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
        {/* Problem Distribution */}
        <Card title="Problem Solving">
          <Progress
            label="Easy"
            value={problemStats.easy}
            total={problemStats.total}
            color="bg-green-500"
          />
          <Progress
            label="Medium"
            value={problemStats.medium}
            total={problemStats.total}
            color="bg-yellow-500"
          />
          <Progress
            label="Hard"
            value={problemStats.hard}
            total={problemStats.total}
            color="bg-red-500"
          />
        </Card>

        {/* Rating Line Graph */}
        <Card title="Rating Progress">
          <RatingLineChart data={ratingHistory} />
        </Card>
      </div>

      {/* =======================
          EXTRA STATS
      ======================== */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
        <MiniStat
          icon={<Clock />}
          label="Fastest Solve"
          value={user.fastestSolve}
        />
        <MiniStat
          icon={<Terminal />}
          label="Primary Language"
          value={user.primaryLanguage}
        />
        <MiniStat icon={<Flame />} label="Current Streak" value="37 days" />
      </div>

      {/* =======================
          RECENT SUBMISSIONS
      ======================== */}
      <Card title="Recent Submissions" className="max-w-6xl mx-auto mb-12">
        <table className="w-full text-sm">
          <thead className="border-b border-[#1f2937] text-gray-400">
            <tr>
              <th className="py-2 text-left">Problem</th>
              <th>Status</th>
              <th>Lang</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentSubmissions.map((s) => (
              <tr key={s.id} className="border-b border-[#1f2937]">
                <td className="py-2 text-white">{s.problem}</td>
                <td
                  className={
                    s.status === "Accepted" ? "text-green-400" : "text-red-400"
                  }
                >
                  {s.status}
                </td>
                <td>{s.lang}</td>
                <td className="text-gray-400">{s.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* =======================
          BADGES
      ======================== */}
      <Card title="Achievements" className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-3">
          {badges.map((b) => (
            <span key={b} className="px-3 py-1 bg-[#1a1a1a] rounded text-sm">
              {b}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* =======================
   COMPONENTS
======================= */
function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-[#111] border border-[#1f2937] rounded-xl p-6 ${className}`}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded-xl p-6 flex items-center gap-4">
      <div className="text-yellow-400">{icon}</div>
      <div>
        <div className="text-xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded-xl p-5 flex items-center gap-4">
      <div className="text-yellow-400">{icon}</div>
      <div>
        <div className="text-white font-semibold">{value}</div>
        <div className="text-xs text-gray-400">{label}</div>
      </div>
    </div>
  );
}

function Progress({ label, value, total, color }) {
  const percent = Math.round((value / total) * 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-gray-400">
          {value} ({percent}%)
        </span>
      </div>
      <div className="h-2 bg-[#1f2937] rounded">
        <div
          className={`h-2 ${color} rounded`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/* =======================
   RATING LINE GRAPH
======================= */
function RatingLineChart({ data }) {
  const width = 300;
  const height = 120;
  const padding = 20;

  const max = Math.max(...data.map((d) => d.rating));
  const min = Math.min(...data.map((d) => d.rating));

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      ((d.rating - min) / (max - min)) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="#facc15"
        strokeWidth="2"
      />
      {points.map((p, i) => {
        const [x, y] = p.split(",");
        return <circle key={i} cx={x} cy={y} r="3" fill="#facc15" />;
      })}
    </svg>
  );
}
