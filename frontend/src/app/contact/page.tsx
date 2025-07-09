// Dokyeong_Homepage/frontend/app/contact/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#f5f5f5] flex items-center justify-center py-20"
    >
      <div className="max-w-xl w-full mx-auto px-8 text-center">
        {/* 대형 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-8"
        >
          Contact
        </motion.h1>
        {/* 간단한 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-gray-700 mb-10"
        >
          프로젝트, 협업, 강연, 자문, 기타 문의를 환영합니다.<br />
          아래 버튼을 통해 언제든 연락해 주세요.
        </motion.p>
        {/* CTA 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* 이메일 버튼 */}
          <a
            href="mailto:dokyeong.yeom@gmail.com"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 py-4 text-lg shadow transition"
          >
            이메일로 문의하기
          </a>
          {/* LinkedIn 버튼 */}
          <a
            href="https://www.linkedin.com/in/po-dokyeongyeom/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full px-8 py-4 text-lg shadow transition"
          >
            LinkedIn으로 연락
          </a>
        </motion.div>
        {/* (옵션) 추가 연락처/설명 */}
        {/* <div className="mt-8 text-gray-500 text-sm">전화: 010-1234-5678</div> */}
      </div>
    </motion.div>
  );
} 