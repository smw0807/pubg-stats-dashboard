export default function ErrorCard({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
