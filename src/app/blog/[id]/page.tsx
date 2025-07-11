// Dokyeong_Homepage/frontend/app/blog/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBlogs } from '@/lib/api';
import { motion } from 'framer-motion';

// Blog 데이터 타입 정의 (백엔드 스키마에 맞게 수정)
interface Blog {
  id: number;
  title: string;
  summary: string;
  image_url?: string;
  tags?: string;
  created_at: string;
  updated_at: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        // getBlogs로 전체 fetch 후 id로 필터 (임시)
        const blogs = await getBlogs();
        const found = blogs.find((b: Blog) => b.id === id);
        if (!found) throw new Error('포스트를 찾을 수 없습니다.');
        setBlog(found);
      } catch {
        setError('포스트 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600 dark:text-gray-400">포스트 정보를 불러오는 중...</p>
      </div>
    );
  }
  if (error || !blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error || '포스트를 찾을 수 없습니다.'}</p>
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
          {blog.title}
        </motion.h1>
        {/* 메인 이미지 */}
        {blog.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-72 object-cover"
            />
          </motion.div>
        )}
        {/* 요약/본문 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg text-gray-800 mb-6 whitespace-pre-line"
        >
          {blog.summary}
        </motion.p>
        {/* 태그 */}
        {blog.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.split(',').map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        {/* 날짜 */}
        <div className="text-gray-400 text-sm mt-6 text-center">
          작성일: {new Date(blog.created_at).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
} 