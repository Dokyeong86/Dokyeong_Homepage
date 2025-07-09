// Dokyeong_Homepage/frontend/app/blog/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { getBlogs } from 'c:/Users/hongb/Dokyeong_Homepage/frontend/lib/api';
import { useRouter } from 'next/navigation';
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

// BlogCard 컴포넌트 (애니메이션, 클릭 이동)
function BlogCard({ blog }: { blog: Blog }) {
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
      onClick={() => router.push(`/blog/${blog.id}`)}
    >
      {/* 썸네일 이미지 */}
      {blog.image_url && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      {/* 타이틀/요약 */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition">
          {blog.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3 flex-grow line-clamp-3">
          {blog.summary}
        </p>
        {blog.tags && (
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.tags.split(',').map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch {
        setError('블로그 목록을 불러오는데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600 dark:text-gray-400">블로그 목록을 불러오는 중...</p>
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
          Latest Blog
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">아직 등록된 블로그가 없습니다. 백엔드에서 추가해주세요!</p>
          ) : (
            blogs.slice(0, 6).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
} 