import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProblemNavbar({ layout, setLayout }) {
  const navigate = useNavigate();

  // mock user (replace with auth context)
  const user = { name: "Ankesh" };

  // ⏱ Timer state
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#111] border-b border-[#1f2937]">
      {/* Top Bar */}
      <div className="h-12 px-4 flex items-center justify-between">
        {/* Left */}
        <div
          onClick={() => navigate("/problems")}
          className="cursor-pointer text-sm font-semibold"
        >
          <span className="text-white">Talent</span>
          <span className="text-yellow-400">IQ</span>
        </div>

        {/* Center (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Layout Switch */}
          <div className="flex bg-[#0b0f19] p-1 rounded-md">
            {["split", "editor", "problem"].map((mode) => (
              <button
                key={mode}
                onClick={() => setLayout(mode)}
                className={`px-3 py-1 text-xs rounded transition ${
                  layout === mode
                    ? "bg-yellow-400 text-black"
                    : "text-gray-300 hover:bg-[#1a1a1a]"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 text-sm">
            <Clock size={14} />
            <span className="font-mono">{formatTime()}</span>
            <button
              onClick={() => setRunning(!running)}
              className="text-xs text-gray-300 hover:text-white"
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setSeconds(0);
              }}
              className="text-xs text-gray-400 hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="h-7 w-7 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm font-semibold">
              {user.name[0]}
            </div>
            <span className="hidden sm:block text-sm">{user.name}</span>
          </motion.div>

          {/* Mobile Menu */}
          <button className="md:hidden">
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden border-t border-[#1f2937] bg-[#0b0f19] px-4 py-2 flex justify-between">
        {/* Layout */}
        <div className="flex gap-1">
          {["split", "editor", "problem"].map((mode) => (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={`px-2 py-1 text-xs rounded ${
                layout === mode ? "bg-yellow-400 text-black" : "text-gray-300"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono">{formatTime()}</span>
          <button onClick={() => setRunning(!running)}>
            {running ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    </header>
  );
}
