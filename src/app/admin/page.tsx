// Dokyeong_Homepage/frontend/app/admin/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const router = useRouter();

  // 인증 체크: 토큰 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.replace('/admin/login');
      }
    }
  }, [router]);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#f5f5f5] flex items-center justify-center py-20"
    >
      <div className="max-w-lg w-full mx-auto px-8 py-12 bg-white rounded-2xl shadow-lg text-center">
        {/* 대형 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-gray-900 mb-8"
        >
          Admin Dashboard
        </motion.h1>
        {/* 관리 버튼들 */}
        <div className="flex flex-col gap-6 mb-8">
          <button
            onClick={() => router.push('/admin/works')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 py-4 text-lg shadow transition"
          >
            Works 관리
          </button>
          <button
            onClick={() => router.push('/admin/blogs')}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full px-8 py-4 text-lg shadow transition"
          >
            Blog 관리
          </button>
        </div>
        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full px-8 py-3 text-lg shadow transition"
        >
          로그아웃
        </button>
      </div>
    </motion.div>
  );
} 