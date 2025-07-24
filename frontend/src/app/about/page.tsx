import React from "react";
import AboutSection from "../../components/AboutSection";

// 더미 데이터 (실제 데이터로 교체 가능)
const personalInfo = {
  name: "염도경 (Yeom Dokyeong)",
  contact: {
    phone: "010-1234-5678",
    email: "dkyeom.po@gmail.com",
  },
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/po-dokyeongyeom/" },
    // { label: "Tech Blog", url: "https://blog.example.com" },
    { label: "GitHub", url: "https://github.com/Dokyeong86" },
  ],
};

const summary = {
  description:
    "13년 이상의 IT/디지털 신사업 Product Owner 경력. 0-to-1 사업 기획 및 성공적 시장 안착, AI 솔루션 사업 리딩 경험 보유.",
  keywords: [
    "PO",
    "AI",
    "기술 이해도",
    "전략 수립",
    "조직 관리",
    "프로세스 개선",
    "데이터 분석",
    "파트너십",
  ],
};

const workExperiences = [
  {
    company: "팀벨",
    title: "전략기획실|리드, 글로벌 사업부|리드, PO팀|리드",
    period: "2021.03 - 현재",
    achievements: [
      "AI KMS(callbot, chatbot, RAG, Agentic AI) PoC: Langsa",
      "AI 기사 요약 서비스 런칭(STT, LLM): 한국경제TV",
      "AI(STT, LLM) 회의록 솔루션 런칭: baronote, Timblo",
      "AI(STT) 회의록 PC App 런칭: baronote",
      "AI 기록/번역 플랫폼 런칭: soribaro, textar, worksfy",
      "경영 프로세스 혁신: OKR, Scrum, CRM 등 도입, 글로벌 사업 PI 리드",
      "글로벌 사업부 안정화 및 인도 법인 설립",
    ],
  },
  {
    company: "크레버스(청담러닝)",
    title: "AI Learning Team|PO",
    period: "2019.09 ~ 2021.03",
    achievements: [
      "AI 영어 대화 학습 서비스 런칭/운영",
      "AI Tutoring 서비스 런칭",
    ],
  },
  {
    company: "휴에이션",
    title: "기업문화정착팀|사업/경영전략, PM팀|PM",
    period: "2017.06 ~ 2018.12",
    achievements: [
      "ECM 신제품 기획",
      "삼성생명 사고보험접수 FAX 시스템 구축: 제안/수행 PM",
      "리더십 워크숍 운영 및 R&D T/F 운영영",
    ],
  },
  {
    company: "한솔인티큐브",
    title: "기획팀|전략/관리회계/파트너관리, 개발팀|웹개발",
    period: "2011.01 ~ 2016.12",
    achievements: [
      "M-SENS(STT, TA) MGPP 수립",
      "영업 파이프라인 및 프로세스 수립",
      "관리 회계 운영 및 재무 분석 리포팅",
      "파트너 관리 프로세스 수립 및 개선",
      "한국수자원공사, 동부화재, 유한킴벌리 콜센터 App 고도화 웹개발",
    ],
  },
];

const educations = [
  {
    school: "동국대학교",
    major: "정보통신공학",
    status: "졸업",
    year: "2003.03 - 2011.08",
  },
  {
    school: "경남고등학교",
    major: "이과",
    status: "졸업",
    year: "1997.03 - 2000.02",
  },
];

const certifications = [
  { name: "정보처리기사", org: "한국산업인력공단", year: "2012.08" },
  { name: "OCJP", org: "Oracle", year: "2012.12" },
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
              연락처: {personalInfo.contact.email}
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