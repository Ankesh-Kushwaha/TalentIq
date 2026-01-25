import { useState, useMemo } from "react";
import { MessageSquare, ThumbsUp, Search } from "lucide-react";

/* =======================
   MOCK DATA
======================= */
const discussions = [
  {
    id: 1,
    title: "Best approach for Two Sum?",
    author: "ankesh_k",
    replies: 14,
    likes: 32,
    tag: "Array",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Why my DP solution is TLE?",
    author: "coder123",
    replies: 9,
    likes: 21,
    tag: "Dynamic Programming",
    time: "1 day ago",
  },
  {
    id: 3,
    title: "Binary Search edge cases?",
    author: "algo_master",
    replies: 6,
    likes: 18,
    tag: "Binary Search",
    time: "3 days ago",
  },
];

const TAGS = [
  "All",
  "Array",
  "Dynamic Programming",
  "Binary Search",
  "Graph",
  "Tree",
];

export default function DiscussPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [tag, setTag] = useState("All");

  /* =======================
     FILTER + SORT
  ======================== */
  const filteredDiscussions = useMemo(() => {
    let data = [...discussions];

    if (tag !== "All") {
      data = data.filter((d) => d.tag === tag);
    }

    if (search) {
      data = data.filter((d) =>
        d.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sortBy === "likes") {
      data.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "replies") {
      data.sort((a, b) => b.replies - a.replies);
    }

    return data;
  }, [search, sortBy, tag]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        {/* =======================
            SIDEBAR
        ======================== */}
        <aside className="bg-[#111] border border-[#1f2937] rounded-xl p-5 h-fit">
          <h3 className="font-semibold mb-4">Topics</h3>

          <div className="space-y-1">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`block w-full text-left px-3 py-2 rounded text-sm ${
                  tag === t
                    ? "bg-yellow-400 text-black"
                    : "text-gray-300 hover:bg-[#1a1a1a]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </aside>

        {/* =======================
            MAIN CONTENT
        ======================== */}
        <section>
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-white">Discuss</h1>

            <div className="flex gap-3">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search discussions"
                  className="pl-9 pr-3 py-2 bg-[#111] border border-[#1f2937] rounded text-sm"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#111] border border-[#1f2937] px-3 py-2 rounded text-sm"
              >
                <option value="newest">Newest</option>
                <option value="likes">Most Liked</option>
                <option value="replies">Most Replies</option>
              </select>
            </div>
          </div>

          {/* Discussions */}
          <div className="space-y-3">
            {filteredDiscussions.map((d) => (
              <div
                key={d.id}
                className="bg-[#111] border border-[#1f2937] rounded-xl p-5 hover:bg-[#1a1a1a] cursor-pointer"
              >
                {/* Title */}
                <h2 className="text-lg font-medium text-white mb-1">
                  {d.title}
                </h2>

                {/* Meta */}
                <div className="flex flex-wrap justify-between items-center text-sm text-gray-400">
                  <span>
                    by <span className="text-gray-300">{d.author}</span> ·{" "}
                    {d.time}
                  </span>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} /> {d.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={14} /> {d.likes}
                    </span>
                    <span className="px-2 py-0.5 bg-[#1a1a1a] rounded text-xs">
                      {d.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredDiscussions.length === 0 && (
              <div className="text-gray-400 text-sm mt-10 text-center">
                No discussions found.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
