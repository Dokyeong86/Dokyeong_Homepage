"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ContactSection() {
  const router = useRouter();
  return (
    // 연한 그레이 배경, 중앙 버튼, 클릭시 /contact 이동
    <section className="relative w-full py-24 bg-[#e5e5e5] flex items-center justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-10 py-5 bg-black text-white rounded-full text-xl font-bold shadow-lg hover:bg-gray-800 transition"
        onClick={() => router.push("/contact")}
      >
        Contact Me
      </motion.button>
    </section>
  );
} 