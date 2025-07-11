"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// 가상 데이터 10개 중 3개만 노출
const blogs = [
  { id: 1, title: "AI 트렌드 2024", desc: "최신 AI 트렌드와 인사이트", img: "/blog1.jpg" },
  { id: 2, title: "PO의 성장 전략", desc: "Product Owner의 커리어 성장법", img: "/blog2.jpg" },
  { id: 3, title: "UX Writing", desc: "사용자 경험을 높이는 글쓰기", img: "/blog3.jpg" },
  // ...7개 더 (BO에서 전체)
];

export default function BlogSection() {
  const router = useRouter();
  return (
    // 화이트 배경, 카드 3개 그리드, 클릭시 /blog 이동
    <section className="relative w-full py-24 bg-white cursor-pointer" onClick={() => router.push("/blog")}> 
      <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Recent Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-2xl bg-gray-100 overflow-hidden shadow-lg transition-all duration-300"
            >
              {/* 썸네일 이미지 */}
              <div className="h-56 w-full overflow-hidden">
                <img src={blog.img} alt={blog.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
              </div>
              {/* 타이틀/설명 */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition">{blog.title}</h3>
                <p className="text-gray-600 text-sm">{blog.desc}</p>
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