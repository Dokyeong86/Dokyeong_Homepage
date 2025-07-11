"use client";
// 이미지/비디오/모형은 public 폴더에 넣고 src로 불러오세요.
export default function ShowreelSection() {
  return (
    // 다크 배경, 중앙 노트북 mockup
    <section className="relative w-full min-h-[60vh] bg-[#181818] flex items-center justify-center">
      {/* 노트북/디바이스 mockup 이미지 */}
      <div className="relative">
        <img
          src="/laptop-mockup.png" // public 폴더에 이미지 추가 필요
          alt="Showreel"
          className="w-[600px] max-w-full rounded-2xl shadow-2xl"
        />
        {/* 중앙 원형 버튼 */}
        <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:scale-105 transition">
          Watch Showreel
        </button>
      </div>
    </section>
  );
} 