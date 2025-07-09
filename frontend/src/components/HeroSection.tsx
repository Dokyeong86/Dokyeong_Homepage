"use client";
import { motion } from "framer-motion";

// 오버랩 원 애니메이션 컴포넌트
function OverlapCircles() {
  return (
    <div className="absolute left-16 top-1/2 -translate-y-1/2 z-0 hidden md:block">
      <svg width="120" height="60">
        <circle cx="40" cy="30" r="28" stroke="#aaa" strokeWidth="2" fill="none" />
        <circle cx="60" cy="30" r="28" stroke="#aaa" strokeWidth="2" fill="none" />
        <circle cx="80" cy="30" r="28" stroke="#aaa" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    // 연한 그레이 배경, 좌우 분할 레이아웃
    <section className="relative w-full min-h-[60vh] bg-[#d3d3d3] flex flex-col justify-center">
      {/* 오버랩 원 애니메이션 */}
      <OverlapCircles />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-24">
        {/* 대형 타이포 */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-black leading-tight"
          >
            Design. Development.<br />
            <span className="text-gray-500">Mastership.</span>
          </motion.h1>
        </div>
        {/* 서브타이틀 */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 md:mt-0 md:max-w-sm text-right text-lg text-gray-700"
        >
          We design and develop exceptional digital products & services, eCommerce, and brand communication solutions.
        </motion.p>
      </div>
    </section>
  );
} 