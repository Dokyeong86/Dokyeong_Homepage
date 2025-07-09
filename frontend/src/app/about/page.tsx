import React from "react";
import AboutSection from "../../components/AboutSection";

// 더미 데이터 (실제 데이터로 교체 가능)
const personalInfo = {
  name: "홍길동 (Hong Gil-dong)",
  contact: {
    phone: "010-1234-5678",
    email: "hong@example.com",
  },
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/hong" },
    { label: "Tech Blog", url: "https://blog.example.com" },
    { label: "GitHub", url: "https://github.com/hong" },
  ],
};

const summary = {
  description:
    "10년 이상의 IT/디지털 신사업 Product Owner 경력. 0-to-1 사업 기획 및 성공적 시장 안착, AI/데이터 기반 전략 수립과 조직 리딩 경험 보유.",
  keywords: [
    "기술 이해도",
    "전략 수립",
    "조직 관리",
    "프로세스 개선",
    "재무 분석",
    "파트너십",
    "PO",
  ],
};

const workExperiences = [
  {
    company: "AwesomeTech Inc.",
    title: "Lead Product Owner",
    period: "2021.03 ~ 현재",
    achievements: [
      "AI 기반 SaaS 플랫폼 0-to-1 기획 및 50억 매출 달성",
      "조직 10명 → 40명 확장 및 Agile 프로세스 도입",
      "월간 사용자 5,000명 → 30,000명 성장 견인",
    ],
  },
  {
    company: "InnovateX",
    title: "Product Manager",
    period: "2017.06 ~ 2021.02",
    achievements: [
      "신규 B2B 서비스 런칭 및 30% 비용 절감",
      "데이터 기반 의사결정 체계 구축",
    ],
  },
];

const educations = [
  {
    school: "서울대학교",
    major: "컴퓨터공학과",
    status: "졸업",
    year: "2017",
  },
  {
    school: "OO고등학교",
    major: "이과",
    status: "졸업",
    year: "2013",
  },
];

const certifications = [
  { name: "PMP(Project Management Professional)", org: "PMI", year: "2020" },
  { name: "정보처리기사", org: "한국산업인력공단", year: "2016" },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white pb-20">
      <div className="max-w-3xl mx-auto pt-24 px-4 space-y-24">
        <AboutSection
          title="기본 정보 (Personal Information)"
          direction="left"
          index={0}
        >
          <div className="space-y-2">
            <div className="text-xl font-bold">{personalInfo.name}</div>
            <div className="text-sm text-gray-600">
              연락처: {personalInfo.contact.phone} / {personalInfo.contact.email}
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {personalInfo.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800 text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </AboutSection>
        <AboutSection
          title="핵심 역량/요약 (Summary/Core Competencies)"
          direction="right"
          index={1}
        >
          <div className="space-y-3">
            <div className="text-base font-medium">{summary.description}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {summary.keywords.map((kw) => (
                <span
                  key={kw}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </AboutSection>
        <AboutSection
          title="경력 사항 (Work Experience)"
          direction="left"
          index={2}
        >
          <div className="space-y-6">
            {workExperiences.map((exp) => (
              <div key={exp.company} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-lg">{exp.company}</div>
                <div className="text-sm text-gray-700">{exp.title} | {exp.period}</div>
                <ul className="list-disc ml-5 mt-2 text-sm text-gray-600 space-y-1">
                  {exp.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AboutSection>
        <AboutSection
          title="학력 사항 (Education)"
          direction="right"
          index={3}
        >
          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu.school} className="flex flex-col md:flex-row md:items-center md:gap-4">
                <span className="font-semibold">{edu.school}</span>
                <span className="text-sm text-gray-700">{edu.major}</span>
                <span className="text-sm text-gray-500">{edu.status} ({edu.year})</span>
              </div>
            ))}
          </div>
        </AboutSection>
        <AboutSection
          title="교육 및 자격증 (Education & Certifications)"
          direction="left"
          index={4}
        >
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col md:flex-row md:gap-4">
                <span className="font-medium">{cert.name}</span>
                <span className="text-sm text-gray-700">{cert.org}</span>
                <span className="text-sm text-gray-500">({cert.year})</span>
              </div>
            ))}
          </div>
        </AboutSection>
      </div>
    </main>
  );
} 