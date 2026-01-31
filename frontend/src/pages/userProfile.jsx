import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Trophy, Code, BarChart, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserProfile } from "../apis/auth.api";
import { getAllsubmissionOfUser } from "../apis/problems.api";
import { useNavigate } from "react-router-dom";

const contestRatings = [
  { round: "R1", rating: 1000 },
  { round: "R2", rating: 1100 },
  { round: "R3", rating: 1200 },
];

export default function UserProfile() {
  const [userData, setUserData] = useState(null);

  const [loadingSubs, setLoadingSubs] = useState(false);
  const [page, setPage] = useState(1); // ✅ init
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const token = auth?.token;
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setUserData(data);
      } catch (err) {
        console.error("Profile fetch failed", err);
      }
    };

    const fetchUserSubmission = async () => {
      try {
        setLoadingSubs(true);
        const res = await getAllsubmissionOfUser({ token, page, limit });

        if (res.success) {
          setSubmissions(res.data); // ✅ correct
          setTotalPages(res.pagination.totalPages); // ✅ correct
        }
      } catch (err) {
        console.error("Submission fetch failed", err);
      } finally {
        setLoadingSubs(false);
      }
    };

    fetchProfile();
    fetchUserSubmission();
  }, [page]); // ✅ correct dependency

  /* ===== Loading Guard ===== */
  if (!userData) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  const solvedEasy = userData.solvedEasy || 0;
  const solvedMedium = userData.solvedMedium || 0;
  const solvedHard = userData.solvedHard || 0;
  const solvedCount = solvedEasy + solvedMedium + solvedHard;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex items-center gap-6 mb-10">
        <div className="h-24 w-24 rounded-full bg-yellow-400 text-black flex items-center justify-center text-3xl font-bold">
          {userData.username?.[0]?.toUpperCase()}
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-white">
            @{userData.username}
          </h1>
          <p className="text-gray-400">{userData.email}</p>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<Code />} label="Solved" value={solvedCount} />
        <StatCard icon={<Flame />} label="Easy" value={solvedEasy} />
        <StatCard icon={<BarChart />} label="Medium" value={solvedMedium} />
        <StatCard icon={<Trophy />} label="Hard" value={solvedHard} />
      </div>

      {/* SUBMISSIONS */}
      <Card title="User Submissions" className="max-w-6xl mx-auto">
        {loadingSubs ? (
          <p className="text-gray-400">Loading submissions...</p>
        ) : submissions.length === 0 ? (
          <p className="text-gray-400">No submissions found.</p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="border-b border-[#1f2937] text-gray-400">
                <tr>
                  <th className="py-2 text-left">Problem</th>
                  <th>Status</th>
                  <th>Lang</th>
                  <th>Total Time (ms)</th>
                  <th>Submitted</th>
                </tr>
              </thead>

              <tbody>
                {submissions.map((s) => (
                  <tr key={s._id} className="border-b border-[#1f2937]">
                    <td className="py-2 text-white cursor-pointer hover:underline"
                    onClick={()=>{navigate(`/submission/${s._id}`);}}
                    >{s.problemId.slug || "—"}</td>

                    <td
                      className={
                        s.status === "AC" ? "text-green-400" : "text-red-400"
                      }
                    >
                      {s.status}
                    </td>

                    <td>{s.language}</td>
                    <td>{s.totalTime ?? "-"}</td>
                    <td>{new Date(s.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 border border-[#1f2937] rounded disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-gray-400">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border border-[#1f2937] rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

/* ===== helpers unchanged ===== */
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
