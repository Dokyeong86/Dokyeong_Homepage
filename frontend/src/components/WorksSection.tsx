"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// 가상 데이터 10개 중 6개만 노출
const works = [
  { id: 1, title: "AI Chatbot MVP", desc: "OpenAI 기반 챗봇 MVP", img: "/work1.jpg" },
  { id: 2, title: "E-Commerce Platform", desc: "풀스택 커머스 구축", img: "/work2.jpg" },
  { id: 3, title: "UX Research", desc: "사용자 리서치 및 개선", img: "/work3.jpg" },
  { id: 4, title: "Growth Dashboard", desc: "데이터 기반 Growth 대시보드", img: "/work4.jpg" },
  { id: 5, title: "AI Recommendation", desc: "개인화 추천 시스템", img: "/work5.jpg" },
  { id: 6, title: "Mobile App Launch", desc: "신규 앱 런칭 프로젝트", img: "/work6.jpg" },
  // ...4개 더 (BO에서 전체)
];

export default function WorksSection() {
  const router = useRouter();
  return (
    // 화이트 배경, 카드 6개 그리드(2열), 클릭시 /works 이동
    <section className="relative w-full py-24 bg-white cursor-pointer" onClick={() => router.push("/works")}> 
      <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Recent Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {works.map((work) => (
            <motion.div
              key={work.id}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-2xl bg-gray-100 overflow-hidden shadow-lg transition-all duration-300"
            >
              {/* 썸네일 이미지 */}
              <div className="h-56 w-full overflow-hidden">
                <img src={work.img} alt={work.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
              </div>
              {/* 타이틀/설명 */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition">{work.title}</h3>
                <p className="text-gray-600 text-sm">{work.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* 섹션 클릭 유도 오버레이 */}
      <div className="absolute inset-0 z-10" />
    </section>
  );
} 