import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useSignUp from "../hooks/useSignUp";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signupUser, loading, error } = useSignUp();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupUser(form);
      navigate("/");
    } catch {
      console.log("error while  sigup user");
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-[#111] border border-[#1f2937] rounded-xl p-6"
      >
        <h1 className="text-2xl font-semibold text-white mb-2">
          Create account
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Join TalentIQ and start solving
        </p>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Full Name"
            required
            value={form.username}
            onChange={handleChange}
            className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-4 py-2 text-sm focus:outline-none focus:border-yellow-400"
          />

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

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-2 rounded-md font-medium disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
