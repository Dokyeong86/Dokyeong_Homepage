import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 w-full flex flex-col items-center pb-6 z-20">
      <div className="flex space-x-6 mb-2">
        <a href="https://www.linkedin.com/in/po-dokyeongyeom/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5 text-white/70 hover:text-white transition" />
        </a>
        <a href="https://github.com/Dokyeong86/Dokyeong_Homepage" target="_blank" rel="noopener noreferrer">
          <Github className="w-5 h-5 text-white/70 hover:text-white transition" />
        </a>
        <a href="mailto:contact@dokyeongyeom.com">
          <Mail className="w-5 h-5 text-white/70 hover:text-white transition" />
        </a>
      </div>
      <div className="text-xs text-white/40">© {new Date().getFullYear()} Dokyeong Yeom. All Rights Reserved.</div>
    </footer>
  );
} 