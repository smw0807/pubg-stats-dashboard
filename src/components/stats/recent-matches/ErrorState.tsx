interface ErrorStateProps {
  error: Error;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">최근 매치</h2>
      <div className="text-center py-8">
        <p className="text-red-600 mb-2">
          최근 매치 정보를 불러올 수 없습니다.
        </p>
        <p className="text-gray-500 text-sm">{error.message}</p>
      </div>
    </div>
  );
}
