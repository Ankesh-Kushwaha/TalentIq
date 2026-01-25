import { Users, Trophy, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";

const contests = [
  {
    id: 42,
    title: "Weekly Contest #42",
    status: "Live",
    endTime: "2026-02-01T20:30:00",
    participants: 1234,
  },
];

export default function ContestsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Contests</h1>

        {contests.map((c) => (
          <div
            key={c.id}
            className="bg-[#111] border border-[#1f2937] rounded-xl p-6 mb-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">{c.title}</h2>
              <span className="bg-green-900 text-green-300 px-2 py-1 text-xs rounded">
                LIVE
              </span>
            </div>

            <div className="flex gap-6 mt-3 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Users size={14} /> {c.participants}
              </span>
              <span>
                Ends in <CountdownTimer endTime={c.endTime} />
              </span>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigate(`/contest/${c.id}/leaderboard`)}
                className="px-4 py-1.5 bg-yellow-400 text-black rounded"
              >
                Leaderboard
              </button>
              <button
                onClick={() => navigate(`/contest/${c.id}/problems`)}
                className="px-4 py-1.5 border border-[#2a2a2a] rounded"
              >
                Problems
              </button>
              <button
                onClick={() => navigate(`/contest/${c.id}/discuss`)}
                className="px-4 py-1.5 border border-[#2a2a2a] rounded flex items-center gap-1"
              >
                <MessageSquare size={14} /> Discuss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
