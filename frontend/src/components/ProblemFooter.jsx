import { motion } from "framer-motion";
import { Users, CheckCircle, BarChart2 } from "lucide-react";

export default function ProblemFooter({ stats }) {
  const acceptanceRate = (
    (stats.acceptedSubmissions / stats.totalSubmissions) *
    100
  ).toFixed(1);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky bottom-0 bg-[#0b0f19] border-t border-[#1f2937] px-4 py-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
        {/* Users Solving */}
        <div className="flex items-center gap-1.5">
          <Users size={14} />
          <span>
            <span className="text-gray-200 font-medium">
              {stats.usersSolvingNow.toLocaleString()}
            </span>{" "}
            solving now
          </span>
        </div>

        {/* Accepted */}
        <div className="flex items-center gap-1.5">
          <CheckCircle size={14} className="text-green-400" />
          <span>
            <span className="text-gray-200 font-medium">
              {stats.acceptedSubmissions.toLocaleString()}
            </span>{" "}
            accepted
          </span>
        </div>

        {/* Submissions */}
        <div className="flex items-center gap-1.5">
          <BarChart2 size={14} />
          <span>
            <span className="text-gray-200 font-medium">
              {stats.totalSubmissions.toLocaleString()}
            </span>{" "}
            submissions
          </span>
        </div>

        {/* Acceptance Rate */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-200 font-medium">{acceptanceRate}%</span>
          <span>acceptance</span>
        </div>
      </div>
    </motion.footer>
  );
}
