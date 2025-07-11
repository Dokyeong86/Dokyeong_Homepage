// Dokyeong_Homepage/frontend/app/works/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { getWorks } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// 백엔드 WorkResponse 스키마에 맞춰 Work 데이터 타입을 정의합니다.
interface Work {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  project_url?: string;
  tags?: string;
  created_at: string;
  updated_at: string;
}

// WorkCard 컴포넌트 분리 (모듈화 및 애니메이션)
function WorkCard({ work }: { work: Work }) {
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group rounded-2xl bg-white dark:bg-gray-900 overflow-hidden shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => router.push(`/works/${work.id}`)}
    >
      {/* 썸네일 이미지 */}
      {work.image_url && (
        <div className="h-56 w-full overflow-hidden">
          <img
            src={work.image_url}
            alt={work.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      {/* 타이틀/설명 */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
          {work.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3 flex-grow line-clamp-3">
          {work.description}
        </p>
        {work.tags && (
          <div className="flex flex-wrap gap-2 mb-2">
            {work.tags.split(',').map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        {work.project_url && (
          <a
            href={work.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline font-medium mt-auto"
            onClick={e => e.stopPropagation()}
          >
            프로젝트 보기
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await getWorks();
        setWorks(data);
      } catch {
        setError('작품 목록을 불러오는데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600 dark:text-gray-400">작품 목록을 불러오는 중...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">에러 발생: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#f5f5f5] py-20"
    >
      <div className="max-w-6xl mx-auto px-8">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-10 text-center"
        >
          Selected Works
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {works.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">아직 등록된 작품이 없습니다. 백엔드에서 추가해주세요!</p>
          ) : (
            works.slice(0, 6).map((work) => (
              <WorkCard key={work.id} work={work} />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}