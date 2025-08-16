interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        최근 매치
      </h2>
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400 mb-2">
          최근 매치 정보를 불러올 수 없습니다.
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{error}</p>
      </div>
    </div>
  );
}
