"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LabsSection() {
  const router = useRouter();
  return (
    // 다크 배경, 챗봇/실험 대표, 클릭시 /labs 이동
    <section className="relative w-full py-24 bg-[#181818] cursor-pointer" onClick={() => router.push("/labs")}> 
      <div className="max-w-4xl mx-auto flex flex-col items-center px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-white mb-6"
        >
          AI Labs & Experiments
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-gray-300 mb-8 text-center"
        >
          다양한 AI 실험과 챗봇, RAG 기반 Q&A 등 혁신적인 기능을 경험해보세요.
        </motion.p>
        {/* 챗봇/실험 대표 이미지/아이콘 등은 public 폴더에 추가 가능 */}
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4">
          🤖
        </div>
        <button className="mt-4 px-8 py-3 bg-white text-black rounded-full font-semibold shadow hover:bg-gray-200 transition">
          Labs 바로가기
        </button>
      </div>
      {/* 섹션 클릭 유도 오버레이 */}
      <div className="absolute inset-0 z-10" />
    </section>

  );
} 