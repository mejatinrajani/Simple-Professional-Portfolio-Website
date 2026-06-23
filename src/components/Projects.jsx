import React from 'react';

const Projects = () => {
  const projects = [
    {
      id: "01",
      title: "MHPCD",
      description: "Constructed an AI-powered moderation system for context-aware detection of predatory and abusive behavior in Indian social media conversations. Architected a multimodal fusion pipeline utilizing SigLIP and BGE-M3 encoders with cross-modal attention to analyze images and Hinglish comments simultaneously, supported by a robust backend for processing complex inputs.",
      tech: ["PyTorch", "Transformers", "FastAPI", "Computer Vision", "NLP"],
      githubLink: "https://github.com/mejatinrajani/Aegis.git"
    },
    {
      id: "02",
      title: "NexusMind",
      description: "Architected a multi-tenant, no-code platform for building custom Hybrid RAG agents, allowing users to define agent personas, system prompts, and knowledge sources. Designed a multimodal ingestion system that transforms any unstructured data into searchable graph and vector knowledge bases. Implemented LangGraph-based agent orchestration with intelligent retrieval routing, fault-tolerant model fallbacks, and real-time monitoring capabilities.",
      tech: ["Python", "FastAPI", "React", "LangGraph", "Neo4j", "ChromaDB", "AWS Textract"],
      githubLink: "https://github.com/mejatinrajani/NexusMind.git"
    },
    {
      id: "03",
      title: "Chronexis",
      description: "Orchestrated an automated, large-scale timetable generation system supporting 5000+ slots to create conflict-free schedules with balanced workloads and efficient class allocation. Integrated features for drag-and-drop editing, add/delete class flexibility, real-time conflict detection, Excel import/export, and enabled multi-perspective timetable views for students, teachers, and rooms with reverse scheduling and history tracking.",
      tech: ["Google OR-Tools", "FastAPI", "React", "TypeScript", "Excel"],
      githubLink: "https://github.com/mejatinrajani/Chronexis--Automated-Time-Table-Generator.git"
    },
    {
      id: "04",
      title: "Astika",
      description: "Engineered a full-stack Vedic astrology platform featuring 50+ deterministic engines for high-precision, location-based calculations across rashi, nakshatra, transits, dosha and yoga detection, dasha timelines, guna milan, and divisional charts. Delivered structured insights and daily predictions across career, health, personality & relationships. Integrated an intent-aware chatbot for natural language query handling backed by strict rule-based accuracy.",
      tech: ["Python", "FastAPI", "React", "Swiss Ephemeris"],
      liveLink: "https://www.astika.tech/",
      githubLink: "https://github.com/mejatinrajani/Astika.git"
    }
  ];

  return (
    <section id='projects' className="relative w-full bg-[#f4f7f9] py-24 px-6 lg:px-16 font-sans text-slate-800 overflow-hidden min-h-screen">
      
      {/* Increased max-width slightly to accommodate the vertical text nicely */}
      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full relative mb-20">
          
          <div className="flex flex-col items-start max-w-xl relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] bg-slate-400 w-8"></div>
              <span className="text-[12px] font-bold text-slate-400 tracking-[0.3em] uppercase">
                SELECTED WORKS
              </span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-black text-[#1a202c] tracking-tight mb-6">
              Featured Projects
            </h2>
            
            <div className="border-l-2 border-slate-300 pl-5">
              <p className="text-slate-500 text-[15px] leading-relaxed">
                A showcase of AI integrations, cloud-native applications, and full-stack solutions built to solve complex, real-world problems.
              </p>
            </div>
          </div>

          {/* Giant Background '03' Fade in Header */}
          <div className="absolute top-0 right-0 lg:right-10 text-[12rem] xl:text-[15rem] font-black z-0 select-none pointer-events-none leading-none tracking-tighter bg-gradient-to-b from-slate-300/80 via-slate-300/40 to-transparent bg-clip-text text-transparent hidden md:block -mt-10 xl:-mt-16">
            03
          </div>

        </div>

        {/* ================= MAIN CONTENT LAYOUT ================= */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 w-full relative z-10">

          {/* LEFT COLUMN: Projects List */}
          <div className="flex-1 w-full flex flex-col">
            {/* Top Border for the first item */}
            <div className="w-full h-[1px] bg-slate-200"></div>

            {projects.map((project) => (
              <div 
                key={project.id} 
                className="py-16 border-b border-slate-200 flex flex-col xl:flex-row gap-10 xl:gap-20 hover:bg-slate-100/50 transition-colors duration-300 group"
              >
                
                {/* Left Side of Card: Number, Title, & Tech */}
                <div className="w-full xl:w-5/12 flex flex-col">
                  <span className="text-[14px] font-bold text-slate-400 mb-4 block">
                    {project.id} /
                  </span>
                  <h3 className="text-4xl font-black text-[#1a202c] tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase"
                      >
                        {tech}{index < project.tech.length - 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side of Card: Description & Buttons */}
                <div className="w-full xl:w-7/12 flex flex-col justify-between">
                  <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-8 mt-auto">
                    
                    {/* Custom SVG View Live Button */}
                    {project.liveLink && (
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[15px] font-bold text-[#1a202c] hover:text-blue-600 transition-colors"
                    >
                      View Live Project
                      <svg 
                        viewBox="0 0 24 24" 
                        width="18" height="18" 
                        stroke="currentColor" strokeWidth="2.5" 
                        fill="none" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                    )}
                    
                    {/* Custom SVG GitHub Button */}
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[15px] font-bold text-slate-500 hover:text-[#1a202c] transition-colors"
                    >
                      View on GitHub
                      <svg 
                        viewBox="0 0 24 24" 
                        width="18" height="18" 
                        stroke="currentColor" strokeWidth="2.5" 
                        fill="none" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            ))} 
          </div>

          {/* RIGHT COLUMN: Vertical 'WORK' Typography */}
          <div className="hidden lg:flex mt-20 w-24 xl:w-32 justify-center relative select-none pointer-events-none">
            {/* The 'sticky' class keeps the word anchored to the screen as you scroll past the projects */}
            <div className="sticky top-32 h-fit">
              <span className="block [writing-mode:vertical-rl] text-[18rem] xl:text-[11rem] font-black tracking-loose uppercase bg-gradient-to-b from-slate-300/80 via-slate-300/40 to-slate-200/50 bg-clip-text text-transparent leading-none">
                PROJECTS...
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Projects;