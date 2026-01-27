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
import { getAllProblems } from "../apis/problems.api";


const TOPICS = [
  "Array",
  "String",
  "Hashmap",
  "Two Pointers",
  "Binary Search",
  "Tree",
  "Graph",
  "DP",
];

const PAGE_SIZE = 12;

export default function ProblemsPage() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState();

  const [starred, setStarred] = useState(() => {
    return JSON.parse(localStorage.getItem("starredProblems")) || [];
  });


  useEffect(() => {
    localStorage.setItem("starredProblems", JSON.stringify(starred));
    const loadProblems = async ()=>{
      const data = await getAllProblems();
      setProblems(data);
    }
    loadProblems();
  }, [starred]);

 
 const allProblems = useMemo(() => {
   if (!Array.isArray(problems)) return [];

   return problems.map((p, index) => ({
     id:index+1,
     problemId: p._id,
     slug: p.slug,
     title: p.title,
     difficulty:
       p.difficulty === "EASY"
         ? "Easy"
         : p.difficulty === "MEDIUM"
           ? "Medium"
           : "Hard",
     topics: p.tags.map((t) => t.charAt(0).toUpperCase() + t.slice(1)),
     acceptance: "--",
     companies: [],
     status: "Todo",
   }));
 }, [problems]);


  const filteredProblems = useMemo(() => {
    let data = [...allProblems];

    if (difficulty !== "All") {
      data = data.filter((p) => p.difficulty === difficulty);
    }

    if (topic !== "All") {
      data = data.filter((p) => p.topics.includes(topic));
    }

    if (search.trim()) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data;
  }, [difficulty, topic, search, allProblems]);

 
  const totalPages = Math.ceil(filteredProblems.length / PAGE_SIZE) || 1;
  const paginatedProblems = filteredProblems.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const toggleStar = (id) => {
    setStarred((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
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

        {/* FILTERS */}
        <div className="flex gap-3 mb-6">
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
        </div>

        {/* TABLE */}
        <div className="bg-[#111] border border-[#1f2937] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0b0f19] text-gray-400">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="text-left">Title</th>
                <th>Status</th>
                <th>Difficulty</th>
                <th>⭐</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProblems.map((p) => (
                <tr
                  key={p.problemId}
                  className="border-t border-[#1f2937] hover:bg-[#1a1a1a]"
                >
                  <td className="px-4 py-3 text-gray-400">{p.id}</td>

                  <td
                    className="cursor-pointer"
                    onClick={() => navigate(`/problem/${p.problemId}?${p.slug}`)}
                  >
                    <div className="text-white font-medium">{p.title}</div>
                    <div className="flex gap-2 mt-1">
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

        {/* PAGINATION */}
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


function FilterSelect({ value, setValue, options }) {
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
