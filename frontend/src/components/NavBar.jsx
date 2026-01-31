/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, LogOut, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDebounce } from "../hooks/usedebounce";
import { globalSearch } from "../apis/problems.api";

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

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchRef = useRef(null);
  const debounceSearch = useDebounce(search, 500);

  /* ---------------- / KEY SHORTCUT ---------------- */
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

  /* ---------------- SEARCH API ---------------- */
  useEffect(() => {
    if (!debounceSearch.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchSearch = async () => {
      try {
        const res = await globalSearch(debounceSearch);
        setSearchResult(res.data || []);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchSearch();
  }, [debounceSearch]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

  /* ---------------- UI ---------------- */
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
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yellow-400"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4 relative">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 bg-[#111] border border-[#2a2a2a] px-3 py-1.5 rounded-md relative">
              <Search size={16} className="text-gray-400" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search problems (/)"
                className="bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none w-44"
              />

              {/* Search Results */}
              {searchResult.length > 0 && (
                <div className="absolute top-10 left-0 w-full bg-[#111] border border-[#2a2a2a] rounded-md max-h-64 overflow-y-auto z-50">
                  {searchResult.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => {
                        navigate(`/problem/${p._id}?${p.slug}`);
                        setSearch("");
                        setSearchResult([]);
                      }}
                      className="px-3 py-2 hover:bg-[#1a1a1a] cursor-pointer"
                    >
                      <p className="text-sm text-white">{p.title}</p>
                      <p className="text-xs text-gray-400">{p.slug}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <div
                  onClick={() => setProfileOpen((p) => !p)}
                  className="cursor-pointer h-8 w-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-semibold"
                >
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-3 w-44 bg-[#111] border border-[#2a2a2a] rounded-md overflow-hidden"
                    >
                      {(user.role === "admin" ||
                        user.role === "super_admin") && (
                        <button
                          onClick={() => {
                            navigate(
                              user.role === "super_admin"
                                ? "/super-admin"
                                : "/admin/control/dashboard",
                            );
                            setProfileOpen(false);
                          }}
                          className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a]"
                        >
                          Dashboard
                        </button>
                      )}

                      <button
                        onClick={() => {
                          navigate(`/profile/${user.userId}`);
                          setProfileOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a]"
                      >
                        Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-red-400 hover:bg-[#1a1a1a]"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:block text-sm text-gray-300 hover:text-white"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="hidden sm:block text-sm bg-yellow-400 text-black px-4 py-1.5 rounded-md"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen((m) => !m)}
              className="md:hidden text-gray-300"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#1a1a1a] border-t border-[#2a2a2a]"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map(({ label, path }) => (
                <button
                  key={label}
                  onClick={() => {
                    navigate(path);
                    setMenuOpen(false);
                  }}
                  className="text-left text-gray-300 hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
