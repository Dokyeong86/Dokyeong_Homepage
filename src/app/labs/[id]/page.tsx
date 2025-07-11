// Dokyeong_Homepage/frontend/app/labs/[id]/page.tsx
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// 더미 데이터: Labs 메인과 동일
const labs = [
  {
    id: 1,
    title: 'RAG Chatbot',
    desc: '내 문서로 나만의 AI 챗봇 만들기 (RAG, LangChain, OpenAI)',
    img: '/lab1.jpg',
    cta: 'Chatbot 체험',
    href: '/labs/rag-chatbot',
    detail: 'RAG 기반 챗봇을 직접 체험해보세요. 내 문서를 업로드하고, 맞춤형 Q&A를 경험할 수 있습니다. OpenAI, LangChain, Pinecone 등 최신 AI 스택 활용.'
  },
  {
    id: 2,
    title: 'AI Resume Analyzer',
    desc: '이력서 PDF 업로드 → AI가 강점/약점/추천 직무 분석',
    img: '/lab2.jpg',
    cta: '분석 체험',
    href: '/labs/resume-analyzer',
    detail: 'AI가 이력서를 분석하여 강점, 약점, 추천 직무를 제안합니다. PDF 업로드만으로 빠른 피드백을 받아보세요.'
  },
  {
    id: 3,
    title: 'Prompt Playground',
    desc: '다양한 프롬프트 실험 및 결과 비교 (GPT-4, Claude 등)',
    img: '/lab3.jpg',
    cta: '프롬프트 실험',
    href: '/labs/prompt-playground',
    detail: '여러 LLM(GPT-4, Claude 등)에서 프롬프트 실험을 해보고, 결과를 비교할 수 있습니다. 프롬프트 엔지니어링 학습에 최적.'
  },
  {
    id: 4,
    title: 'Vision AI Demo',
    desc: '이미지/비디오 인식 AI 데모 (YOLO, CLIP 등)',
    img: '/lab4.jpg',
    cta: 'Demo 보기',
    href: '/labs/vision-demo',
    detail: 'YOLO, CLIP 등 최신 Vision AI 모델을 활용한 이미지/비디오 인식 데모. 실제 데이터를 업로드해 결과를 확인하세요.'
  },
];

export default function LabDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? Number(params.id) : null;
  const lab = labs.find((l) => l.id === id);

  if (!lab) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">실험 정보를 찾을 수 없습니다.</p>
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
          {lab.title}
        </motion.h1>
        {/* 메인 이미지 */}
        {lab.img && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={lab.img}
              alt={lab.title}
              className="w-full h-72 object-cover"
            />
          </motion.div>
        )}
        {/* 상세 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg text-gray-800 mb-6 whitespace-pre-line"
        >
          {lab.detail}
        </motion.p>
        {/* CTA 버튼 */}
        <a
          href={lab.href}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 py-3 text-lg shadow transition mb-4"
          onClick={e => { e.preventDefault(); router.push(lab.href); }}
        >
          {lab.cta}
        </a>
      </div>
    </motion.div>
  );
} 