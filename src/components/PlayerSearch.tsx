'use client';

import { useState } from 'react';
import { Platform } from '../models/platform';
import Alert from './Alert';
import { useRouter } from 'next/navigation';

export default function PlayerSearch() {
  const router = useRouter();

  const [platform, setPlatform] = useState<Platform>('steam');
  const [nickname, setNickname] = useState('');
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    message: string;
    type: 'error' | 'warning' | 'success' | 'info';
  }>({
    isOpen: false,
    message: '',
    type: 'info',
  });

  const showAlert = (
    message: string,
    type: 'error' | 'warning' | 'success' | 'info' = 'info'
  ) => {
    setAlert({
      isOpen: true,
      message,
      type,
    });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSearch = () => {
    if (!nickname.trim()) {
      showAlert('플레이어 닉네임을 입력해주세요.', 'warning');
      return;
    }
    router.push(`/player/${platform}/${nickname}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Alert
        message={alert.message}
        type={alert.type}
        isOpen={alert.isOpen}
        onClose={hideAlert}
        autoClose={true}
        autoCloseDelay={3000}
      />

      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            PUBG Stats Dashboard
          </h1>
          <p className="text-gray-600">플레이어 통계를 확인해보세요</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div>
            <label
              htmlFor="platform"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              플랫폼
            </label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            >
              <option value="steam">스팀</option>
              <option value="kakao">카카오</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              플레이어 닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="닉네임을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-700"
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            검색
          </button>
        </div>
      </div>
    </>
  );
}
