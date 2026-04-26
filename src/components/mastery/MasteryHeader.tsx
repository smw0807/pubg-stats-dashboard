interface MasteryHeaderProps {
  platform: string;
  playerName: string;
}

export default function MasteryHeader({
  platform,
  playerName,
}: MasteryHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
        <span>{platform === "steam" ? "Steam" : "Kakao"}</span>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {playerName}
        </span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        무기 마스터리
      </h1>
    </div>
  );
}
