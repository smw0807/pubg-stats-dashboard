import Image from 'next/image';

interface SmallInfoProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function SmallInfo({
  title,
  description,
  imageUrl,
}: SmallInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="relative mb-4">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={250}
          className="rounded-lg"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}
