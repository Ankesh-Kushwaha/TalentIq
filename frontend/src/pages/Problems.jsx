import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";

/* =======================
   CONSTANTS
======================= */
const TOPICS = [
  "Array",
  "String",
  "Hash Table",
  "Two Pointers",
  "Binary Search",
  "Tree",
  "Graph",
  "Dynamic Programming",
];

const COMPANIES = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix"];

const PAGE_SIZE = 12;

/* =======================
   MOCK PROBLEMS
======================= */
const ALL_PROBLEMS = Array.from({ length: 90 }).map((_, i) => ({
  id: i + 1,
  title: `Problem ${i + 1}`,
  difficulty: i % 3 === 0 ? "Easy" : i % 3 === 1 ? "Medium" : "Hard",
  topics: [TOPICS[i % TOPICS.length], TOPICS[(i + 2) % TOPICS.length]],
  companies: [
    COMPANIES[i % COMPANIES.length],
    COMPANIES[(i + 1) % COMPANIES.length],
  ],
  acceptance: Math.floor(35 + Math.random() * 50),
  likes: Math.floor(100 + Math.random() * 2000),
  status: i % 4 === 0 ? "Solved" : i % 4 === 1 ? "Attempted" : "Todo",
}));

export default function ProblemsPage() {
  const navigate = useNavigate();

  /* =======================
     STATE
  ======================== */
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [company, setCompany] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [starred, setStarred] = useState(() => {
    return JSON.parse(localStorage.getItem("starredProblems")) || [];
  });

  /* =======================
     PERSIST STARRED
  ======================== */
  useEffect(() => {
    localStorage.setItem("starredProblems", JSON.stringify(starred));
  }, [starred]);

  /* =======================
     FILTER + SEARCH
  ======================== */
  const filteredProblems = useMemo(() => {
    let data = [...ALL_PROBLEMS];

    if (difficulty !== "All") {
      data = data.filter((p) => p.difficulty === difficulty);
    }

    if (topic !== "All") {
      data = data.filter((p) => p.topics.includes(topic));
    }

    if (company !== "All") {
      data = data.filter((p) => p.companies.includes(company));
    }

    if (search.trim()) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data;
  }, [difficulty, topic, company, search]);

  /* =======================
     PAGINATION
  ======================== */
  const totalPages = Math.ceil(filteredProblems.length / PAGE_SIZE);
  const paginatedProblems = filteredProblems.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  /* =======================
     STAR TOGGLE
  ======================== */
  const toggleStar = (id) => {
    setStarred((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  /* =======================
     RENDER
  ======================== */
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* =======================
            HEADER + SEARCH
        ======================== */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-white">Problems</h1>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by title"
              className="pl-9 pr-3 py-2 bg-[#111] border border-[#1f2937] rounded text-sm w-64"
            />
          </div>
        </div>

        {/* =======================
            FILTERS
        ======================== */}
        <div className="flex flex-wrap gap-3 mb-6">
          <FilterSelect
            label="Difficulty"
            value={difficulty}
            setValue={setDifficulty}
            options={["All", "Easy", "Medium", "Hard"]}
          />
          <FilterSelect
            label="Topic"
            value={topic}
            setValue={setTopic}
            options={["All", ...TOPICS]}
          />
          <FilterSelect
            label="Company"
            value={company}
            setValue={setCompany}
            options={["All", ...COMPANIES]}
          />
        </div>

        {/* =======================
            TABLE
        ======================== */}
        <div className="bg-[#111] border border-[#1f2937] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0b0f19] text-gray-400">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="text-left">Title</th>
                <th>Status</th>
                <th>Acceptance</th>
                <th>Companies</th>
                <th>Difficulty</th>
                <th>⭐</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProblems.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-[#1f2937] hover:bg-[#1a1a1a]"
                >
                  <td className="px-4 py-3 text-gray-400">{p.id}</td>

                  <td
                    className="cursor-pointer"
                    onClick={() => navigate(`/problem/${p.id}`)}
                  >
                    <div className="text-white font-medium">{p.title}</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {p.topics.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 bg-[#1a1a1a] rounded text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="text-center">
                    {p.status === "Solved" && (
                      <CheckCircle
                        className="text-green-400 mx-auto"
                        size={16}
                      />
                    )}
                    {p.status === "Attempted" && (
                      <Clock className="text-yellow-400 mx-auto" size={16} />
                    )}
                  </td>

                  <td className="text-center">{p.acceptance}%</td>

                  <td className="text-center">
                    {p.companies.slice(0, 2).join(", ")}
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        p.difficulty === "Easy"
                          ? "bg-green-900 text-green-300"
                          : p.difficulty === "Medium"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-red-900 text-red-300"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </td>

                  {/* Star */}
                  <td className="text-center">
                    <Star
                      size={16}
                      onClick={() => toggleStar(p.id)}
                      className={`cursor-pointer mx-auto ${
                        starred.includes(p.id)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-500"
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* =======================
            PAGINATION
        ======================== */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <span className="text-gray-400">
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <PageButton disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft size={16} />
            </PageButton>
            <PageButton
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight size={16} />
            </PageButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================
   REUSABLE COMPONENTS
======================= */
function FilterSelect({ label, value, setValue, options }) {
  return (
    <select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      className="bg-[#111] border border-[#1f2937] px-3 py-2 rounded text-sm"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function PageButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-3 py-1 border border-[#1f2937] rounded disabled:opacity-40"
    >
      {children}
    </button>
  );
}
