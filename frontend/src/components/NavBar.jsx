/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, LogOut, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const navItems = [
  { label: "Problems", path: "/problems" },
  { label: "Contests", path: "/contests" },
  { label: "Discuss", path: "/discuss" },
  { label: "Interview", path: "/interview" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthContext();

  const isAuthenticated = Boolean(user);

  // 🔍 search focus
  const searchRef = useRef(null);

  // 📱 mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // 👤 profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);

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

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

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
          <div className="flex items-center gap-4 relative">
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

            {/* AUTH SECTION */}
            {isAuthenticated ? (
              <div className="relative">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setProfileOpen((p) => !p)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <div className="h-8 w-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-semibold">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                </motion.div>

                {/* Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-3 w-44 bg-[#111] border border-[#2a2a2a] rounded-md shadow-lg overflow-hidden"
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
    </motion.header>
  );
}
