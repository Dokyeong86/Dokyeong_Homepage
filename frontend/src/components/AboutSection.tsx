"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  title: string;
  direction: "left" | "right";
  index: number;
  children: ReactNode;
}

export default function AboutSection({
  title,
  direction,
  index,
  children,
}: AboutSectionProps) {
  // direction에 따라 애니메이션 x축 방향 결정
  const initialX = direction === "left" ? -80 : 80;
  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, x: initialX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className={`relative bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-2 md:mb-4 min-h-[120px]`}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{title}</h2>
        <div>{children}</div>
      </motion.div>
    </section>
  );
} 