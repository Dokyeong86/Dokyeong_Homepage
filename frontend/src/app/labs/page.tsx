// Dokyeong_Homepage/frontend/app/labs/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// 더미 데이터: AI 실험/챗봇/프로젝트
const labs = [
  {
    id: 1,
    title: 'RAG Chatbot',
    desc: '내 문서로 나만의 AI 챗봇 만들기 (RAG, LangChain, OpenAI)',
    img: '/lab1.jpg',
    cta: 'Chatbot 체험',
    href: '/labs/rag-chatbot',
  },
  {
    id: 2,
    title: 'AI Resume Analyzer',
    desc: '이력서 PDF 업로드 → AI가 강점/약점/추천 직무 분석',
    img: '/lab2.jpg',
    cta: '분석 체험',
    href: '/labs/resume-analyzer',
  },
  {
    id: 3,
    title: 'Prompt Playground',
    desc: '다양한 프롬프트 실험 및 결과 비교 (GPT-4, Claude 등)',
    img: '/lab3.jpg',
    cta: '프롬프트 실험',
    href: '/labs/prompt-playground',
  },
  {
    id: 4,
    title: 'Vision AI Demo',
    desc: '이미지/비디오 인식 AI 데모 (YOLO, CLIP 등)',
    img: '/lab4.jpg',
    cta: 'Demo 보기',
    href: '/labs/vision-demo',
  },
];

// LabCard 컴포넌트 (애니메이션, CTA)
function LabCard({ lab }: { lab: typeof labs[0] }) {
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
      onClick={() => router.push(lab.href)}
    >
      {/* 썸네일 이미지 */}
      {lab.img && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={lab.img}
            alt={lab.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      {/* 타이틀/설명/CTA */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition">
          {lab.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
          {lab.desc}
        </p>
        <button
          className="mt-auto bg-blue-600 text-white rounded-full px-5 py-2 font-semibold shadow hover:bg-blue-700 transition"
          onClick={e => { e.stopPropagation(); router.push(lab.href); }}
        >
          {lab.cta}
        </button>
      </div>
    </motion.div>
  );
}

export default function LabsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#f5f5f5] py-20"
    >
      <div className="max-w-5xl mx-auto px-8">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-10 text-center"
        >
          Labs & AI Experiments
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {labs.map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 