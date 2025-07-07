// Dokyeong_Homepage/frontend/app/works/page.tsx
'use client'; // 이 파일은 클라이언트 컴포넌트임을 명시

import React, { useEffect, useState } from 'react';
import { getWorks } from 'c:/Users/hongb/Dokyeong_Homepage/frontend/lib/api'; // 방금 만든 api.ts 파일에서 getWorks 함수를 임포트

// 백엔드 WorkResponse 스키마에 맞춰 Work 데이터 타입을 정의합니다.
// 이는 TypeScript가 데이터의 구조를 이해하고 자동 완성을 돕게 합니다.
interface Work {
  id: number;
  title: string;
  description: string;
  image_url?: string;      // Optional 필드
  project_url?: string;    // Optional 필드
  tags?: string;           // Optional 필드 (콤마로 구분된 문자열)
  created_at: string;     // ISO 8601 형식의 날짜 문자열
  updated_at: string;     // ISO 8601 형식의 날짜 문자열
}

export default function WorksPage() {
  // 작품 목록을 저장할 상태 변수
  const [works, setWorks] = useState<Work[]>([]);
  // 데이터 로딩 상태를 관리하는 변수
  const [loading, setLoading] = useState(true);
  // 에러 발생 시 메시지를 저장할 변수
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트가 마운트될 때 한 번만 실행되는 useEffect 훅
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await getWorks(); // 백엔드 API 호출
        setWorks(data); // 가져온 데이터를 상태에 저장
      } catch (err) {
        console.error("Failed to fetch works:", err);
        setError("작품 목록을 불러오는데 실패했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchWorks(); // 함수 실행
  }, []); // 빈 의존성 배열은 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

  // 로딩 중일 때 보여줄 UI
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl text-gray-600 dark:text-gray-400">작품 목록을 불러오는 중...</p>
        </div>
    );
  }

  // 에러 발생 시 보여줄 UI
  if (error) {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl text-red-500">에러 발생: {error}</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-white">My Works</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.length === 0 ? (
            // 작품이 없을 때 메시지
            <p className="col-span-full text-center text-gray-500 text-lg">아직 등록된 작품이 없습니다. 백엔드에서 추가해주세요!</p>
        ) : (
            // 작품 목록을 순회하며 각 작품 카드 렌더링
            works.map((work) => (
                <div
                    key={work.id}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden
                               transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                               flex flex-col"
                >
                    {work.image_url && (
                        // 이미지가 있다면 이미지 표시
                        <img
                            src={work.image_url}
                            alt={work.title}
                            className="w-full h-56 object-cover"
                        />
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                            {work.title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-4">
                            {work.description}
                        </p>
                        {work.tags && (
                            // 태그가 있다면 태그 목록 표시
                            <div className="flex flex-wrap gap-2 mb-4">
                                {work.tags.split(',').map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full
                                                   dark:bg-blue-900 dark:text-blue-200"
                                    >
                                        {tag.trim()} {/* 태그 앞뒤 공백 제거 */}
                                    </span>
                                ))}
                            </div>
                        )}
                        {work.project_url && (
                            // 프로젝트 URL이 있다면 링크 버튼 표시
                            <a
                                href={work.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-indigo-600 dark:text-indigo-400
                                           hover:underline font-medium mt-auto"
                            >
                                프로젝트 보기
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                        )}
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
}