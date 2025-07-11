"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Work",
    description: "Explore my projects and case studies.",
    href: "/works",
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "Blog",
    description: "Read insights and articles.",
    href: "/blog",
    color: "from-pink-500 to-yellow-500",
  },
  {
    title: "Company",
    description: "Learn more about me and my journey.",
    href: "/about",
    color: "from-green-500 to-cyan-500",
  },
];

export default function NavCardsSection() {
  const router = useRouter();
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4 py-24">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.05, rotate: -1 + idx * 2 }}
            whileTap={{ scale: 0.98 }}
            className={`group cursor-pointer rounded-2xl p-10 bg-gradient-to-br ${card.color} shadow-xl transition-all duration-300`}
            onClick={() => router.push(card.href)}
          >
            <h2 className="text-3xl font-bold text-white mb-4 group-hover:tracking-widest transition-all duration-300 uppercase">
              {card.title}
            </h2>
            <p className="text-white/80 text-lg">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 