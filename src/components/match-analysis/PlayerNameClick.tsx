import Link from 'next/link';

export default function PlayerNameClick({
  platform,
  playerName,
  isMine,
}: {
  platform: string;
  playerName: string;
  isMine: boolean;
}) {
  return (
    <Link
      href={`/player/${platform}/${playerName}`}
      className="hover:underline hover:text-blue-500"
    >
      {isMine ? <>{playerName} (나)</> : playerName}
    </Link>
  );
}
