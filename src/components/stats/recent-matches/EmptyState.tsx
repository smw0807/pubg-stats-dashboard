export default function EmptyState() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        최근 매치
      </h2>
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          최근 매치 정보가 없습니다.
        </p>
      </div>
    </div>
  );
}
