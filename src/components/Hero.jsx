import React from 'react';
import { Download, ArrowRight, Sun } from 'lucide-react';

// --- Inline SVGs for Socials & Logo to avoid missing exports ---
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const LeetCodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835s.513 2.853 1.494 3.835l4.332 4.363c.981.981 2.336 1.494 3.835 1.494s2.853-.513 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9-.535-.535-1.386-.552-1.9-.038zm1.901-2.906h-7.464c-.752 0-1.366.614-1.366 1.366 0 .751.614 1.365 1.366 1.365h7.464c.751 0 1.365-.614 1.365-1.365 0-.752-.614-1.366-1.365-1.366z"/>
  </svg>
);

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id='home'
      className="relative min-h-screen overflow-hidden flex flex-col font-sans text-slate-800 selection:bg-slate-800 selection:text-white"
      style={{
        backgroundColor: '#f8fafc',
        backgroundImage: `
          radial-gradient(#cbd5e1 1px, transparent 1px),
          repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.120) 10px, rgba(0,0,0,0.120) 11px)
        `,
        backgroundSize: '32px 32px, 100% 100%'
      }}
    >
      {/* Decorative Background Plus Signs */}
      <div className="absolute top-8 lg:top-24 left-8 lg:left-24 text-slate-300 font-light">+</div>
      <div className="absolute top-8 lg:top-24 right-8 lg:right-24 text-slate-300 font-light">+</div>
      <div className="absolute bottom-12 lg:bottom-24 left-8 lg:left-24 text-slate-300 font-light">+</div>
      <div className="absolute bottom-12 lg:bottom-24 right-8 lg:right-24 text-slate-300 font-light">+</div>

      {/* Navigation Bar */}
      <nav className="w-full flex justify-between items-center px-6 lg:px-12 py-6 relative z-20">
        <div className="flex items-center gap-2">
          {/* <LogoIcon /> */}
        </div>
        <ul className="hidden lg:flex items-center gap-12 text-lg font-medium text-slate-600">
          <li onClick={() => scrollToSection('home')} className="text-slate-900 border-b-2 border-slate-900 pb-1 cursor-pointer">Home</li>
          <li onClick={() => scrollToSection('skills')} className="hover:text-slate-900 cursor-pointer transition-colors">Skills</li>
          <li onClick={() => scrollToSection('projects')} className="hover:text-slate-900 cursor-pointer transition-colors">Projects</li>
          <li onClick={() => scrollToSection('contact')} className="hover:text-slate-900 cursor-pointer transition-colors">Contact</li>
        </ul>
        <button className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          {/* <Sun size={20} className="text-slate-700" /> */}
        </button>
      </nav>

      {/* Main Hero Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 md:px-12 relative z-10">
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-start gap-6 mt-12 lg:mt-0">

            {/* Headings */}
            <div className="flex flex-col mt-2">
              <span className="text-slate-400 text-lg sm:text-2xl lg:text-4xl font-medium tracking-[0.4em] mb-4">
                MEET, 
              </span>
              <h1 className="text-6xl font-grained sm:text-[120px] lg:text-[15rem] z-10 font-black text-[#2d3036] tracking-[10px] sm:tracking-[20px] lg:tracking-[40px] leading-[1]">
                Jatin
              </h1>
              <h1 
                className="text-5xl sm:text-7xl lg:text-[6.5rem] text-[#0f172a] -mt-1 sm:-mt-2 lg:-mt-4 relative z-10" 
                style={{ fontFamily: "'Yellowtail', cursive", transform: 'rotate(-2deg)' }}
              >
                Rajani
              </h1>
            </div>

            {/* Role / Subtitle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full lg:w-[1400px] gap-2 lg:gap-4 mt-2 lg:mt-6 z-10">
              <div className="hidden sm:block h-px bg-slate-400 mt-2 w-8 lg:w-12"></div>
              <span className="text-[11px] sm:text-[15px] lg:text-4xl font-bold text-slate-600 tracking-[0.1em] sm:tracking-[0.25em] uppercase">
                AI & Cloud-Native Full Stack Web Engineer
              </span>
            </div>

            {/* Quote / Intro */}
            <div className="border-l-[3px] border-slate-400 pl-4 lg:pl-6 my-2 lg:my-4">
              <p className="text-slate-500 text-sm sm:text-lg lg:text-xl font-medium max-w-xs sm:max-w-md">
                Driving Real-World Business and Societal Solutions through Technical Skills
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4 mt-2 z-10 w-full sm:w-auto">
              <a href="/Jatin-Rajani-Resume.pdf" target='_blank' rel="noopener noreferrer" className="flex items-center justify-center z-10 gap-3 lg:gap-4 bg-[#0f172a] text-white px-6 py-4 lg:px-8 lg:py-5 rounded-sm text-lg lg:text-2xl font-semibold hover:bg-slate-800 transition-colors shadow-sm w-full sm:w-auto">
                <Download size={20} className="w-5 h-5 lg:w-6 lg:h-6" />
                Download Resume
              </a>
              <button onClick={() => scrollToSection('contact')} className="flex items-center justify-center gap-3 lg:gap-4 bg-transparent border border-slate-400 text-slate-700 px-6 py-4 lg:px-8 lg:py-5 rounded-sm text-lg lg:text-2xl font-semibold hover:bg-slate-100 transition-colors w-full sm:w-auto">
                Get in Touch
                <ArrowRight size={20} className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 lg:mt-8 mb-8 z-10">
              <span className="text-[16px] lg:text-[30px] font-bold text-slate-400 tracking-widest uppercase">
                CONNECT :
              </span>
              <div className="hidden sm:block h-4 w-px bg-slate-300 mx-2"></div>
              <div className="flex gap-3 lg:gap-4">
                <a href="https://leetcode.com/u/mejatinrajani/" className="p-4 lg:p-6 border border-slate-200 bg-white rounded-sm text-slate-600 hover:text-[#0f172a] transition-colors shadow-sm">
                  <LeetCodeIcon />
                </a>
                <a href="https://www.linkedin.com/in/mejatinrajani/" className="p-4 lg:p-6 border border-slate-200 bg-white rounded-sm text-slate-600 hover:text-[#0f172a] transition-colors shadow-sm">
                  <LinkedinIcon />
                </a>
                <a href="https://github.com/mejatinrajani" className="p-4 lg:p-6 border border-slate-200 bg-white rounded-sm text-slate-600 hover:text-[#0f172a] transition-colors shadow-sm">
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Image Section (HIDDEN ON PHONES) */}
          <div className="hidden md:flex relative mx-auto w-full max-w-[380px] mt-16 lg:mt-0 justify-end">
            
            {/* Giant Background 'JR' */}
            <div className="absolute -top-14 -translate-y-1/2 -right-8 sm:-right-20 lg:-right-[360px] text-[18rem] sm:text-[24rem] lg:text-[70rem] font-black z-0 select-none pointer-events-none leading-none  bg-gradient-to-b from-slate-40/50 from-10% to-slate-300/80 bg-clip-text text-transparent">
              JR
            </div>

          </div>
        </div>
      </main>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-8 bg-slate-300"></div>
      </div>

    </div>
  );
};

export default Hero;