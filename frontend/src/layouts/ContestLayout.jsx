import { NavLink, Outlet, useParams } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
import { Trophy, List, MessageSquare } from "lucide-react";

/* =======================
   MOCK CONTEST DATA
   (replace with API later)
======================= */
const contest = {
  id: 42,
  title: "Weekly Contest #42",
  endTime: "2026-02-01T20:30:00",
};

export default function ContestLayout() {
  const { contestId } = useParams();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 flex flex-col">
      {/* =======================
          CONTEST HEADER
      ======================== */}
      <header className="border-b border-[#1f2937] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4">
          {/* Contest Info */}
          <div>
            <h1 className="text-xl font-semibold text-white">
              {contest.title}
            </h1>
            <p className="text-sm text-gray-400">Contest ID: {contestId}</p>
          </div>

          {/* Countdown */}
          <div className="text-sm">
            Ends in <CountdownTimer endTime={contest.endTime} />
          </div>
        </div>
      </header>

      {/* =======================
          CONTEST NAV TABS
      ======================== */}
      <nav className="border-b border-[#1f2937] bg-[#111]">
        <div className="max-w-7xl mx-auto flex gap-6 px-6">
          <ContestTab
            to="problems"
            icon={<List size={16} />}
            label="Problems"
          />

          <ContestTab
            to="leaderboard"
            icon={<Trophy size={16} />}
            label="Leaderboard"
          />

          <ContestTab
            to="discuss"
            icon={<MessageSquare size={16} />}
            label="Discuss"
          />
        </div>
      </nav>

      {/* =======================
          CONTEST CONTENT
      ======================== */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

/* =======================
   TAB COMPONENT
======================= */
function ContestTab({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 py-3 text-sm border-b-2 ${
          isActive
            ? "border-yellow-400 text-yellow-400"
            : "border-transparent text-gray-400 hover:text-white"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
