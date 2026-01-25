import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProblemNavbar({ layout, setLayout }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const isAuthenticated = Boolean(user);

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#111] border-b border-[#1f2937]">
      {/* Top Bar */}
      <div className="h-12 px-4 flex items-center justify-between">
        {/* Left */}
        <div
          onClick={() => navigate("/problems")}
          className="cursor-pointer text-sm font-semibold select-none"
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
        <div className="flex items-center gap-3 relative">
          {/* AUTH SECTION */}
          {isAuthenticated ? (
            <div className="relative">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="h-7 w-7 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm font-semibold">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="hidden sm:block text-sm">{user.name}</span>
              </motion.div>

              {/* Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-2 w-44 bg-[#111] border border-[#1f2937] rounded-md shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        navigate(`/profile/${user.id}`);
                        setProfileOpen(false);
                      }}
                      className="w-full px-4 py-2 text-sm flex items-center gap-2 text-gray-300 hover:bg-[#1a1a1a]"
                    >
                      <User size={16} />
                      Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm flex items-center gap-2 text-red-400 hover:bg-[#1a1a1a]"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-gray-300 hover:text-white"
            >
              Login
            </button>
          )}

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
