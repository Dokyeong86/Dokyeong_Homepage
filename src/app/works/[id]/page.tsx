// Dokyeong_Homepage/frontend/app/works/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getWorkById } from '@/lib/api';
import { motion } from 'framer-motion';

// Work 데이터 타입 정의 (백엔드 스키마에 맞게 수정)
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

export default function WorkDetailPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchWork = async () => {
      try {
        const data = await getWorkById(id);
        setWork(data);
      } catch {
        setError('프로젝트 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchWork();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600 dark:text-gray-400">프로젝트 정보를 불러오는 중...</p>
      </div>
    );
  }
  if (error || !work) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error || '프로젝트를 찾을 수 없습니다.'}</p>
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
      <div className="max-w-3xl mx-auto px-6">
        {/* 대형 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8 text-center"
        >
          {work.title}
        </motion.h1>
        {/* 메인 이미지 */}
        {work.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={work.image_url}
              alt={work.title}
              className="w-full h-72 object-cover"
            />
          </motion.div>
        )}
        {/* 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg text-gray-800 mb-6 whitespace-pre-line"
        >
          {work.description}
        </motion.p>
        {/* 태그 */}
        {work.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {work.tags.split(',').map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        {/* 외부 링크 */}
        {work.project_url && (
          <a
            href={work.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 py-3 text-lg shadow transition mb-4"
          >
            프로젝트 바로가기
          </a>
        )}
        {/* 날짜 */}
        <div className="text-gray-400 text-sm mt-6 text-center">
          등록일: {new Date(work.created_at).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
} 