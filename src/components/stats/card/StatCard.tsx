export default function StatCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[300px] border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
        {title}
      </h2>
      {children}
    </div>
  );
}
