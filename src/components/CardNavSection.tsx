"use client";
import { motion } from "framer-motion";

// 학력/경력/역량 더미 데이터
const education = [
  { school: "KAIST", degree: "M.S. in Computer Science", year: "2012-2014" },
  { school: "서울대학교", degree: "B.S. in Computer Science", year: "2008-2012" },
];
const experience = [
  { company: "카카오", role: "Product Owner", period: "2018-2023" },
  { company: "SKT", role: "AI/데이터 신사업 리드", period: "2014-2018" },
  { company: "스타트업", role: "PO/PM", period: "2012-2014" },
];
const skills = [
  "Product Strategy", "AI/ML", "UX", "Agile", "Data", "Growth", "Leadership"
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* 상단 대형 타이포 */}
      <section className="max-w-5xl mx-auto px-8 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6"
        >
          About <span className="text-blue-600">Dokyeong Yeom</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-gray-700 max-w-2xl"
        >
          Product Owner, AI & New Business. 10+ years of experience in digital product, service, and business innovation. 
          <br />
          <a href="https://www.linkedin.com/in/po-dokyeongyeom/" target="_blank" className="underline text-blue-600">LinkedIn</a>
        </motion.p>
      </section>

      {/* 학력/경력/역량 카드 */}
      <section className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 학력 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl font-bold mb-4 text-blue-600">Education</h3>
          <ul className="space-y-2">
            {education.map((edu, i) => (
              <li key={i}>
                <div className="font-semibold">{edu.school}</div>
                <div className="text-gray-600 text-sm">{edu.degree}</div>
                <div className="text-gray-400 text-xs">{edu.year}</div>
              </li>
            ))}
          </ul>
        </motion.div>
        {/* 경력 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl font-bold mb-4 text-blue-600">Experience</h3>
          <ul className="space-y-2">
            {experience.map((exp, i) => (
              <li key={i}>
                <div className="font-semibold">{exp.company}</div>
                <div className="text-gray-600 text-sm">{exp.role}</div>
                <div className="text-gray-400 text-xs">{exp.period}</div>
              </li>
            ))}
          </ul>
        </motion.div>
        {/* 핵심역량 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl font-bold mb-4 text-blue-600">Core Skills</h3>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <li key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{skill}</li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  );
} 