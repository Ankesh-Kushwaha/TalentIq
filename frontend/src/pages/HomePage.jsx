import { motion } from "framer-motion";
import { Trophy, Flame, Code, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =======================
   MOCK DATA
======================= */
const stats = [
  { label: "Problems", value: "2,450+" },
  { label: "Active Coders", value: "78,000+" },
  { label: "Submissions", value: "12M+" },
  { label: "Companies", value: "350+" },
];

const topCoders = [
  { name: "Aman Verma", rating: 2150 },
  { name: "Sneha Gupta", rating: 2084 },
  { name: "Rohit Sharma", rating: 2012 },
];

const winnerOfMonth = {
  name: "Priya Singh",
  rating: 2231,
  problemsSolved: 612,
};

const trendingProblems = [
  { title: "Two Sum", difficulty: "Easy" },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
  },
  { title: "Merge K Sorted Lists", difficulty: "Hard" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f0f0f] text-gray-200">
      {/* =======================
          HERO SECTION
      ======================== */}
      <section className="min-h-[70vh] flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sharpen Your Coding Skills.
            <br />
            <span className="text-yellow-400">Compete. Grow. Get Hired.</span>
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            TalentIQ is a competitive coding platform to practice real-world
            problems, compete in contests, and showcase your skills to top
            companies.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/problems")}
              className="px-6 py-3 bg-yellow-400 text-black rounded-md font-medium hover:bg-yellow-300"
            >
              Start Solving
            </button>
            <button
              onClick={() => navigate("/contests")}
              className="px-6 py-3 border border-[#2a2a2a] rounded-md hover:bg-[#1a1a1a]"
            >
              View Contests
            </button>
          </div>
        </motion.div>
      </section>

      {/* =======================
          PLATFORM STATS
      ======================== */}
      <section className="py-16 border-t border-[#1f2937]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#111] border border-[#1f2937] rounded-xl p-6 text-center"
            >
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =======================
          MOST RATED CODERS
      ======================== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Flame className="text-orange-400" /> Most Rated Coders
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {topCoders.map((coder, idx) => (
              <div
                key={coder.name}
                className="bg-[#111] border border-[#1f2937] rounded-xl p-6"
              >
                <div className="text-lg font-medium text-white">
                  #{idx + 1} {coder.name}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Rating:{" "}
                  <span className="text-yellow-400">{coder.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          WINNER OF THE MONTH
      ======================== */}
      <section className="py-16 bg-[#111] border-y border-[#1f2937]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
              <Trophy className="text-yellow-400" />
              Winner of the Month
            </h2>
            <p className="text-lg text-white">{winnerOfMonth.name}</p>
            <p className="text-gray-400">
              Rating: {winnerOfMonth.rating} · Problems Solved:{" "}
              {winnerOfMonth.problemsSolved}
            </p>
          </div>

          <div className="bg-[#0b0f19] border border-[#1f2937] rounded-full h-24 w-24 flex items-center justify-center text-3xl font-bold text-yellow-400">
            🏆
          </div>
        </div>
      </section>

      {/* =======================
          TRENDING PROBLEMS
      ======================== */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Code /> Trending Problems
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {trendingProblems.map((p) => (
              <div
                key={p.title}
                onClick={() => navigate("/problems")}
                className="cursor-pointer bg-[#111] border border-[#1f2937] rounded-xl p-5 hover:bg-[#1a1a1a]"
              >
                <p className="font-medium text-white mb-2">{p.title}</p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    p.difficulty === "Easy"
                      ? "bg-green-900 text-green-300"
                      : p.difficulty === "Medium"
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-red-900 text-red-300"
                  }`}
                >
                  {p.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          CTA FOOTER
      ======================== */}
      <section className="py-20 text-center border-t border-[#1f2937]">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Ready to level up?
        </h2>
        <p className="text-gray-400 mb-6">
          Join thousands of coders improving their skills every day.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-yellow-400 text-black rounded-md font-medium hover:bg-yellow-300"
        >
          Join TalentIQ
        </button>
      </section>
    </div>
  );
}
