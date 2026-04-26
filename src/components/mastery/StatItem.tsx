interface StatItemProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export default function StatItem({ label, value, highlight }: StatItemProps) {
  return (
    <div>
      <div className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">
        {label}
      </div>
      <div
        className={`text-sm font-semibold ${
          highlight
            ? "text-orange-500 dark:text-orange-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
