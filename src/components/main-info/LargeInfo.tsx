import Image from 'next/image';

interface LargeInfoProps {
  title: string;
  description: string;
  summary: string[];
  imageUrl: string;
  imagePosition?: 'left' | 'right';
}
export default function LargeInfo({
  title,
  description,
  summary,
  imageUrl,
  imagePosition = 'left',
}: LargeInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {imagePosition === 'left' && (
          <div className="order-2 md:order-1 relative">
            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        )}

        <div className={imagePosition === 'left' ? 'order-1 md:order-2' : ''}>
          <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            {summary.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
        {imagePosition === 'right' && (
          <div className="relative">
            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
