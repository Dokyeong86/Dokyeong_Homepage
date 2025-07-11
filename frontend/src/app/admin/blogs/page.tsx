// Dokyeong_Homepage/frontend/app/admin/blogs/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBlogs } from '@/lib/api';
import { Blog } from '../../../../types';
import { motion } from 'framer-motion';

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [form, setForm] = useState({
    title: '',
    summary: '',
    image_url: '',
    tags: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // 인증 체크: 토큰 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.replace('/admin/login');
      }
    }
  }, [router]);

  // 블로그 목록 fetch
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch {
      setError('블로그 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchBlogs(); }, []);

  // 신규 등록/수정 모달 열기
  const openModal = (mode: 'create' | 'edit', blog?: Blog) => {
    setModalMode(mode);
    setForm(
      blog
        ? {
            title: blog.title,
            summary: blog.summary,
            image_url: blog.image_url || '',
            tags: blog.tags || '',
          }
        : { title: '', summary: '', image_url: '', tags: '' }
    );
    setFormError(null);
    setShowModal(true);
  };

  // 등록/수정 폼 제출 (API 연동은 추후 구현)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      // TODO: createBlog, updateBlog API 연동
      setShowModal(false);
      fetchBlogs();
    } catch {
      setFormError('저장에 실패했습니다.');
    } finally {
      setFormLoading(false);
    }
  };

  // 삭제 (API 연동은 추후 구현)
  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      // TODO: deleteBlog API 연동
      fetchBlogs();
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#f5f5f5] py-20"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* 대형 타이틀 및 등록 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          >
            Blog 관리
          </motion.h1>
          <button
            onClick={() => openModal('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 py-3 text-lg shadow transition"
          >
            + 새 블로그 등록
          </button>
        </div>
        {/* 목록 */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">불러오는 중...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">제목</th>
                  <th className="py-3 px-4 text-left">요약</th>
                  <th className="py-3 px-4 text-left">등록일</th>
                  <th className="py-3 px-4 text-center">수정</th>
                  <th className="py-3 px-4 text-center">삭제</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b last:border-none">
                    <td className="py-3 px-4 font-semibold">{blog.title}</td>
                    <td className="py-3 px-4 text-gray-700 line-clamp-2 max-w-xs">{blog.summary}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{new Date(blog.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openModal('edit', blog)}
                        className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-5 py-2 text-sm font-semibold shadow transition"
                      >
                        수정
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete()}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full px-5 py-2 text-sm font-semibold shadow transition"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* 등록/수정 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-6">{modalMode === 'create' ? '새 블로그 등록' : '블로그 수정'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="제목"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                required
              />
              <textarea
                placeholder="요약"
                value={form.summary}
                onChange={e => setForm({ ...form, summary: e.target.value })}
                className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg min-h-[100px]"
                required
              />
              <input
                type="text"
                placeholder="이미지 URL"
                value={form.image_url}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <input
                type="text"
                placeholder="태그 (쉼표로 구분)"
                value={form.tags}
                onChange={e => setForm({ ...form, tags: e.target.value })}
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 py-3 text-lg shadow transition disabled:opacity-60"
                >
                  {formLoading ? '저장 중...' : '저장'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-full px-8 py-3 text-lg shadow transition"
                >
                  취소
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
} 