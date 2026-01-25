export default function VirtualRank({ rank, virtual }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs ${
        virtual
          ? "bg-purple-900 text-purple-300"
          : "bg-yellow-900 text-yellow-300"
      }`}
    >
      #{rank} {virtual && "(Virtual)"}
    </span>
  );
}
