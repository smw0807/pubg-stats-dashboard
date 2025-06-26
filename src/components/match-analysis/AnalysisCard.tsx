import { ReactNode } from 'react';

interface AnalysisCardProps {
  title: string;
  icon: string;
  description: string;
  onClick: () => void;
  isLoading?: boolean;
  hasData?: boolean;
  children?: ReactNode;
}

export default function AnalysisCard({
  title,
  icon,
  description,
  onClick,
  isLoading = false,
  hasData = false,
  children,
}: AnalysisCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
      {!hasData ? (
        <button
          onClick={onClick}
          disabled={isLoading}
          className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-3xl mr-4">{icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            </div>
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : (
              <span className="text-blue-600 text-lg">→</span>
            )}
          </div>
        </button>
      ) : (
        <div className="p-6">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-4">{icon}</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      )}
    </div>
  );
}
