import React, { useState } from 'react';

// =========================================================================
// CUSTOM LIGHTWEIGHT SVGS (0 Dependencies, Instant Load)
// =========================================================================

// --- Programming ---
const PythonIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 4H8a4 4 0 00-4 4v2a4 4 0 004 4h2"/><path d="M14 20h2a4 4 0 004-4v-2a4 4 0 00-4-4h-2"/><circle cx="8" cy="8" r="1"/><circle cx="16" cy="16" r="1"/></svg>
);
const JsIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M11 7v7c0 1.5-1 2.5-2.5 2.5S6 15.5 6 14"/><path d="M17 9c-1-1-3-1-3 1s1.5 1.5 3 2.5c1.5 1 1 3 0 4s-3 0-3-1"/></svg>
);
const TsIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 8h6M10 8v9"/><path d="M18 9c-1-1-3-1-3 1s1.5 1.5 3 2.5c1.5 1 1 3 0 4s-3 0-3-1"/></svg>
);
const JavaIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M4 8h14v9a4 4 0 01-4 4H8a4 4 0 01-4-4V8z"/><path d="M9 4v1M15 4v1"/></svg>
);

// --- Backend ---
const FastApiIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const DjangoIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="13" r="2"/><path d="M10 8v7M14 10v7c0 1.5-1 2-2 2M14 7v.01"/></svg>
);
const NodeIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12v9"/><path d="M12 12L4 7.5"/><path d="M12 12l8-4.5"/></svg>
);
const ExpressIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
);
const FlaskIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 3h6v6l4 10a2 2 0 01-2 2H7a2 2 0 01-2-2l4-10V3z"/><path d="M7 16h10"/></svg>
);

// --- Databases ---
const DbIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>
);
const MongoIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2C8 6 6 10 6 14c0 4 3 8 6 8s6-4 6-8c0-4-2-8-6-12z"/><path d="M12 2v20"/></svg>
);
const SupabaseIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 4v8h6M12 20v-8H6"/></svg>
);
const NeonIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
);

// --- Frontend ---
const ReactIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>
);
const HtmlIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 2l1.5 17L12 22l6.5-3L20 2H4z"/><path d="M8 7h8M8 12h8M8 12l.5 5.5L12 19l3.5-1.5.2-2.5"/></svg>
);
const CssIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 2l1.5 17L12 22l6.5-3L20 2H4z"/><path d="M16 7H8M16 12H8M16 12l-.5 5.5L12 19l-3.5-1.5-.2-2.5"/></svg>
);
const TailwindIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 10c1.5 0 2.5-1.5 4-1.5s2.5 1.5 4 1.5M10 14c1.5 0 2.5-1.5 4-1.5s2.5 1.5 4 1.5"/></svg>
);
const StateIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="8" width="6" height="8" rx="1"/><rect x="15" y="4" width="6" height="6" rx="1"/><rect x="15" y="14" width="6" height="6" rx="1"/><path d="M9 12h3V7h3M9 12h3v5h3"/></svg>
);

// --- AI & ML ---
const VectorDbIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16v16H4z"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="15" cy="9" r="1"/><path d="M9 9l6 6M15 9l-6 6"/></svg>
);
const WorkflowIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="12" r="3"/><path d="M8.5 7.5l7 3M8.5 16.5l7-3"/></svg>
);
const DeepLearningIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96.44 2.5 2.5 0 01-2.96-3.08 2.5 2.5 0 01-.98-4.7 2.5 2.5 0 01.98-4.7 2.5 2.5 0 012.96-3.08A2.5 2.5 0 019.5 2zM14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96.44 2.5 2.5 0 002.96-3.08 2.5 2.5 0 00.98-4.7 2.5 2.5 0 00-.98-4.7 2.5 2.5 0 00-2.96-3.08A2.5 2.5 0 0014.5 2z"/></svg>
);
const GenerativeAiIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
);

// --- Cloud & DevOps ---
const AwsIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.5 19c-2 1.5-4.5 2-7.5 2a11.2 11.2 0 01-7-2.5c2 1 4.5 1.5 7 1.5 3 0 5.5-.5 7.5-1z"/><path d="M17.5 19l1 1v-2l-1 1zM6.5 13.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5M14 11v5"/></svg>
);
const DockerIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2zM6 10h4v4H6zM10 10h4v4h-4zM14 10h4v4h-4zM10 6h4v4h-4z"/></svg>
);
const CiCdIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);
const VercelIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3l10 17H2L12 3z"/></svg>
);
const RenderIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="8"/><path d="M12 4v8l6 6"/></svg>
);
const NetlifyIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2L2 12l10 10 10-10L12 2z"/><path d="M12 2v20M2 12h20"/></svg>
);


// =========================================================================
// UNIFIED SKILL DATA
// =========================================================================
const skillsData = [
  // Programming
  { name: 'Python', category: 'PROGRAMMING', icon: PythonIcon },
  { name: 'JavaScript', category: 'PROGRAMMING', icon: JsIcon },
  { name: 'TypeScript', category: 'PROGRAMMING', icon: TsIcon },
  { name: 'Java', category: 'PROGRAMMING', icon: JavaIcon },
  
  // Backend
  { name: 'FastAPI', category: 'BACKEND', icon: FastApiIcon },
  { name: 'Django / DRF', category: 'BACKEND', icon: DjangoIcon },
  { name: 'Node.js', category: 'BACKEND', icon: NodeIcon },
  { name: 'Express.js', category: 'BACKEND', icon: ExpressIcon },
  { name: 'Flask', category: 'BACKEND', icon: FlaskIcon },
  
  // AI & ML
  { name: 'Vector DBs / RAG', category: 'AI & ML', icon: VectorDbIcon },
  { name: 'Agentic Workflows', category: 'AI & ML', icon: WorkflowIcon },
  { name: 'Deep Learning', category: 'AI & ML', icon: DeepLearningIcon },
  { name: 'Generative AI', category: 'AI & ML', icon: GenerativeAiIcon },
  
  // Databases
  { name: 'PostgreSQL', category: 'DATABASE', icon: DbIcon },
  { name: 'MySQL / SQLite', category: 'DATABASE', icon: DbIcon },
  { name: 'MongoDB / Mongoose', category: 'DATABASE', icon: MongoIcon },
  { name: 'Supabase', category: 'DATABASE', icon: SupabaseIcon },
  { name: 'Neon Serverless', category: 'DATABASE', icon: NeonIcon },
  
  // Frontend
  { name: 'React.js', category: 'FRONTEND', icon: ReactIcon },
  { name: 'HTML5', category: 'FRONTEND', icon: HtmlIcon },
  { name: 'CSS3', category: 'FRONTEND', icon: CssIcon },
  { name: 'Tailwind CSS', category: 'FRONTEND', icon: TailwindIcon },
  { name: 'Context API / Zustand', category: 'FRONTEND', icon: StateIcon },
  
  // Cloud & DevOps
  { name: 'AWS', category: 'CLOUD', icon: AwsIcon },
  { name: 'Docker', category: 'CLOUD', icon: DockerIcon },
  { name: 'CI/CD Pipelines', category: 'CLOUD', icon: CiCdIcon },
  { name: 'Vercel', category: 'CLOUD', icon: VercelIcon },
  { name: 'Render', category: 'CLOUD', icon: RenderIcon },
  { name: 'Netlify', category: 'CLOUD', icon: NetlifyIcon },
];

const categories = [
  { id: 'ALL', label: 'ALL' },
  { id: 'FRONTEND', label: 'FRONTEND' },
  { id: 'BACKEND', label: 'BACKEND' },
  { id: 'PROGRAMMING', label: 'LANGUAGES' },
  { id: 'DATABASE', label: 'DATABASES' },
  { id: 'AI & ML', label: 'AI & ML' },
  { id: 'CLOUD', label: 'CLOUD & DEVOPS' },
];

const SkillsGrid = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredSkills = activeTab === 'ALL' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeTab);

  return (
    <section className="relative w-full bg-[#f8fafc] py-20 px-6 lg:px-12 font-sans selection:bg-slate-800 selection:text-white">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 relative">
        <div className="flex flex-col gap-4 z-10 max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="h-px bg-slate-300 w-12"></div>
            <span className="text-xs font-bold text-slate-400 tracking-[0.3em] uppercase">
              CORE EXPERTISE
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black text-[#0f172a] tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-slate-500 text-lg border-l-2 border-slate-300 pl-4 mt-2">
            A comprehensive toolkit of modern technologies I use for Full Stack Engineering, Backend Systems, and AI Integration.
          </p>
        </div>

        {/* --- STATS SECTION (REDESIGNED) --- */}
        <div className="hidden sm:flex flex-col items-end gap-5 mt-10 lg:mt-0 z-10">
          
          {/* Top: The lists of categories */}
          <div className="flex gap-8 text-right">
            <ul className="text-xs font-bold text-slate-400 tracking-widest leading-relaxed flex flex-col gap-1 items-end">
              <li>AI & ML (4) <span className="text-slate-300 ml-2">•</span></li>
              <li>BACKEND (5) <span className="text-slate-300 ml-2">•</span></li>
              <li>FRONTEND (5) <span className="text-slate-300 ml-2">•</span></li>
            </ul>
            <ul className="text-xs font-bold text-slate-400 tracking-widest leading-relaxed flex flex-col gap-1 items-end">
              <li>DATABASES (5) <span className="text-slate-300 ml-2">•</span></li>
              <li>LANGUAGES (4) <span className="text-slate-300 ml-2">•</span></li>
              <li>CLOUD (6) <span className="text-slate-300 ml-2">•</span></li>
            </ul>
          </div>
          
          {/* Middle: Divider */}
          <div className="w-full h-px bg-slate-200 mt-1"></div>
          
          {/* Bottom: The total technologies count */}
          <div className="flex items-center gap-3">
            <span className="text-[3.5rem] leading-none font-black text-[#0f172a] tracking-tighter">
              {skillsData.length}
            </span>
            <span className="text-xs mt-8 font-bold text-slate-400 tracking-[0.2em] uppercase">
              TECHNOLOGIES
            </span>
          </div>
        </div>

        <div className="absolute -top-10 right-0 text-[18rem] font-black text-slate-200/40 z-0 select-none pointer-events-none leading-none bg-gradient-to-b from-slate-300/60 from 20% to-transparent bg-clip-text text-transparent">
          02
        </div>
      </div>

      {/* --- SCROLLING MARQUEE STRIP --- */}
      <div className="relative w-full border-y border-slate-200 bg-white/40 py-5 overflow-hidden flex z-10 mb-12">
        <style>
          {`
            @keyframes infinite-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-infinite-scroll {
              animation: infinite-scroll 45s linear infinite;
            }
            .animate-infinite-scroll:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="flex w-max animate-infinite-scroll items-center">
          {[...skillsData, ...skillsData].map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="flex items-center gap-3 px-8 sm:px-12 group cursor-pointer">
                <Icon size={18} className="text-slate-400 group-hover:text-[#0f172a] transition-colors" />
                <span className="text-xs font-bold tracking-[0.2em] text-slate-500 group-hover:text-[#0f172a] transition-colors uppercase whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
      </div>

      <div className="max-w-[1400px] mx-auto z-10 relative">
        
        {/* --- TABS --- */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => {
            const count = cat.id === 'ALL' 
              ? skillsData.length 
              : skillsData.filter(s => s.category === cat.id).length;
            
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold tracking-widest transition-all ${
                  activeTab === cat.id
                    ? 'bg-[#0f172a] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
                <span className={`text-[10px] px-1.5 rounded-sm ${
                  activeTab === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* --- GRID WITH NEW BLACK/DARK SLATE GLOWING HOVER EFFECT --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={`${skill.name}-${index}`}
                className="bg-white p-5 rounded-lg flex items-center gap-4 cursor-pointer group transition-all duration-300
                           border-2 border-solid border-slate-100 
                           hover:border hover:border-[#0f172a] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(15,23,42,0.15)]"
              >
                <div className="bg-slate-50 p-3 rounded-md group-hover:bg-[#0f172a]/10 transition-colors duration-300">
                  <Icon size={26} className="text-slate-600 group-hover:text-[#0f172a] transition-colors duration-300" />
                </div>
                
                <span className="font-bold text-slate-800 text-[17px] group-hover:text-[#0f172a] transition-colors duration-300">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SkillsGrid;