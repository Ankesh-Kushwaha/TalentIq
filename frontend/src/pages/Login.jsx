import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { loginUser, loading, error } = useAuth();
  const { user } = useAuthContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(form); 
  };

  useEffect(() => {
    if (user) {
      if (user.role === "super_admin") navigate("/super-admin");
      else if (user.role === "admin") navigate("/admin");
      else navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-[#111] border border-[#1f2937] rounded-xl p-6"
      >
        <h1 className="text-2xl font-semibold text-white mb-2">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-6">
          Login to continue to TalentIQ
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-4 py-2 text-sm focus:outline-none focus:border-yellow-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-4 py-2 text-sm focus:outline-none focus:border-yellow-400"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-2 rounded-md font-medium disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
