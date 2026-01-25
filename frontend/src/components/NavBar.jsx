/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Problems", path: "/problems" },
  { label: "Contests", path: "/contests" },
  { label: "Discuss", path: "/discuss" },
  { label: "Interview", path: "/interview" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 auth state (replace with context later)
  const isAuthenticated = false;

  // 🔍 search focus
  const searchRef = useRef(null);

  // 📱 mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  /* ⌨️ "/" keyboard shortcut */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-[#2a2a2a]"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
            className="text-xl font-semibold cursor-pointer select-none"
          >
            <span className="text-white">Talent</span>
            <span className="text-yellow-400">IQ</span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {navItems.map(({ label, path }) => {
              const isActive = location.pathname.startsWith(path);

              return (
                <motion.button
                  key={label}
                  onClick={() => navigate(path)}
                  whileHover={{ y: -2 }}
                  className={`relative text-sm ${
                    isActive
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-yellow-400"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 bg-[#111] border border-[#2a2a2a] px-3 py-1.5 rounded-md">
              <Search size={16} className="text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search problems (/)"
                className="bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none w-44"
              />
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/profile/123")}
                className="cursor-pointer flex items-center gap-2"
              >
                <div className="h-8 w-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-semibold">
                  A
                </div>
              </motion.div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate("/login")}
                  className="text-sm text-gray-300 hover:text-white hidden sm:block"
                >
                  Login
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate("/signup")}
                  className="text-sm bg-yellow-400 text-black px-4 py-1.5 rounded-md font-medium hover:bg-yellow-300 hidden sm:block"
                >
                  Sign Up
                </motion.button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-300"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#111] border-t border-[#2a2a2a]"
          >
            {navItems.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => {
                  navigate(path);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-6 py-3 text-sm text-gray-300 hover:bg-[#1a1a1a]"
              >
                {label}
              </button>
            ))}

            {!isAuthenticated && (
              <div className="px-6 py-4 flex gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="flex-1 text-sm text-gray-300 border border-[#2a2a2a] py-2 rounded-md"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="flex-1 text-sm bg-yellow-400 text-black py-2 rounded-md"
                >
                  Sign Up
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
