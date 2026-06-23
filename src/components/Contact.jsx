import React from 'react';
import { Send, ChevronUp } from 'lucide-react';

const Contact = () => {
  return (
    <section className="relative w-full bg-[#f4f7f9] py-24 px-6 lg:px-16 font-sans text-slate-800 overflow-hidden min-h-screen flex flex-col justify-center">
      
      <div className="max-w-[1300px] mx-auto w-full relative z-10">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full relative">
          
          {/* Left: Title & Description */}
          <div className="flex flex-col items-start max-w-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] bg-slate-400 w-8"></div>
              <span className="text-[12px] font-bold text-slate-400 tracking-[0.3em] uppercase">
                LET'S WORK TOGETHER
              </span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-black text-[#1a202c] tracking-tight mb-6">
              Get in Touch
            </h2>
            
            <div className="border-l-2 border-slate-300 pl-5">
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Have a project in mind or just want to chat? I'm always open to discussing 
                new opportunities, creative ideas, or partnerships.
              </p>
            </div>
          </div>

          {/* Right: Email & Giant 05 */}
          <div className="mt-16 lg:mt-0 relative flex flex-col lg:items-end">
            {/* Giant Background '05' */}
            <div className="absolute bottom-4 left-0 lg:left-auto lg:right-0 text-[15rem] font-black z-0 select-none pointer-events-none leading-none tracking-tighter bg-gradient-to-b from-slate-300/60 from 20% to-transparent bg-clip-text text-transparent">
              04
            </div>
            
            <div className="relative z-10 flex flex-col lg:items-end">
              <span className="text-[12px] font-bold text-slate-400 tracking-[0.3em] uppercase mb-3">
                OR REACH ME DIRECTLY AT
              </span>
              <a href="mailto:work.j471n@gmail.com" className="text-[20px] font-bold text-[#1a202c] hover:underline underline-offset-4">
                mejatinrajani.tech@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <span className="text-[12px] font-bold text-slate-400 tracking-[0.3em] uppercase whitespace-nowrap">
            SEND A MESSAGE
          </span>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-32">
          
          {/* --- LEFT: Form --- */}
          <div className="w-full">
            <form className="flex flex-col gap-8">
              
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[15px] font-bold text-slate-400 tracking-[0.3em] uppercase">FIRST NAME</label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a202c] transition-colors text-[20px]"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[15px] font-bold text-slate-400 tracking-[0.3em] uppercase">LAST NAME</label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a202c] transition-colors text-[20px]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3">
                <label className="text-[15px] font-bold text-slate-400 tracking-[0.3em] uppercase">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  placeholder="john.doe@example.com" 
                  className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a202c] transition-colors text-[20px]"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-3">
                <label className="text-[15px] font-bold text-slate-400 tracking-[0.3em] uppercase">SUBJECT</label>
                <input 
                  type="text" 
                  placeholder="Project Discussion" 
                  className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a202c] transition-colors text-[20px]"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-3">
                <label className="text-[15px] font-bold text-slate-400 tracking-[0.3em] uppercase">MESSAGE</label>
                <textarea 
                  placeholder="Tell me about your project or idea..." 
                  rows="4" 
                  className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a202c] transition-colors text-[20px] resize-none"
                ></textarea>
              </div>

              {/* Submit Button & Disclaimer */}
              <div className="mt-4 flex flex-col items-start gap-6">
                <button 
                  type="submit" 
                  className="flex items-center gap-3 bg-transparent border border-[#1a202c] text-[#1a202c] px-6 py-3 text-lg font-bold hover:bg-[#1a202c] hover:text-white transition-colors"
                >
                  Send Message
                  <Send size={20} strokeWidth={2.5} />
                </button>
                <span className="text-[12px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                  YOUR INFORMATION IS SAFE AND WILL NEVER BE SHARED WITH THIRD PARTIES.
                </span>
              </div>

            </form>
          </div>

          {/* --- RIGHT: Status & Typography --- */}
          <div className="w-full flex flex-col">
            
            {/* Status Table */}
            <div className="flex flex-col w-full mb-16">
              
              <div className="flex justify-between items-center py-4 border-b border-slate-200">
                <span className="text-[12px] font-bold text-slate-400 tracking-[0.3em] uppercase">CURRENT STATUS</span>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-[15px] font-bold text-[#1a202c]">Available for Work</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-slate-200">
                <span className="text-[12px] font-bold text-slate-400 tracking-[0.3em] uppercase">RESPONSE TIME</span>
                <span className="text-[15px] font-medium text-slate-800">&lt; 4 hours</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-slate-200">
                <span className="text-[12px] font-bold text-slate-400 tracking-[0.3em] uppercase">TIMEZONE</span>
                <span className="text-[15px] font-medium text-slate-800">IST • UTC +5:30</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-slate-200">
                <span className="text-[12px] font-bold text-slate-400 tracking-[0.3em] uppercase">PREFERRED</span>
                <span className="text-[15px] font-medium text-slate-800">Email / LinkedIn</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-slate-200">
                <span className="text-[12px] font-bold text-slate-400 tracking-[0.3em] uppercase">WORK TYPE</span>
                <span className="text-[15px] font-medium text-slate-800">Remote / Contract</span>
              </div>

            </div>

            {/* Giant Typography */}
            <div className="flex flex-col leading-[0.85] select-none pointer-events-none ">
              <div className="leading-[0.85] bg-gradient-to-b from-slate-400 via-slate-300/50 to-transparent bg-clip-text text-transparent">
                <span className="block text-[5rem] sm:text-[5rem] lg:text-[8rem] font-black text-slate-200/70 tracking-tighter uppercase ">LET'S</span>
                <span className="block text-[5rem] sm:text-[5rem] lg:text-[8rem] font-black text-slate-200/70 tracking-tighter uppercase">BUILD</span>
                <span className="block text-[5rem] sm:text-[5rem] lg:text-[8rem] font-black text-slate-200/70 tracking-tighter uppercase">TOGETHER</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Contact;