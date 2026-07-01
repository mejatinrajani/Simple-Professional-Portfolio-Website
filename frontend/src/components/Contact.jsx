import React, { useState } from 'react';
import { Send, ChevronUp } from 'lucide-react';

const Contact = () => {
  // 1. Setup state to hold the form data and submission status
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Smooth scroll helper for the "Back to Home" button
  const scrollToHome = () => {
    setIsSubmitted(false);
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 4. Handle the form submission
  const onSubmit = async (event) => {
    event.preventDefault();
    
    const payload = {
      ...formData,
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();

      if (data.success) {
        // Trigger the success modal instead of the alert
        setIsSubmitted(true);
        
        // Clear the form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert("Something went wrong. Please try again or email me directly.");
      }
    } catch (error) {
      alert("Error submitting the form. Please check your connection.");
    }
  };

  return (
    <section id='contact' className="relative w-full bg-[#f4f7f9] py-24 px-6 lg:px-16 font-sans text-slate-800 overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* ================= SUCCESS MODAL OVERLAY ================= */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm px-4">
          <div className="bg-[#f4f7f9] border-2 border-[#1a202c] p-8 md:p-12 max-w-lg w-full flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            
            {/* Animated Checkmark */}
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 animate-bounce shadow-lg shadow-emerald-500/30">
              <svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            
            <h3 className="text-3xl font-black text-[#1a202c] tracking-tight mb-4 uppercase">
              Message Sent!
            </h3>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Thank you for reaching out. I've received your message and will get back to you as soon as possible.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <button 
                onClick={() => setIsSubmitted(false)}
                className="flex-1 flex justify-center items-center bg-transparent border border-[#1a202c] text-[#1a202c] px-6 py-4 text-[14px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors"
              >
                Send Another
              </button>
              <button 
                onClick={scrollToHome}
                className="flex-1 flex justify-center items-center bg-[#1a202c] border border-[#1a202c] text-white px-6 py-4 text-[14px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-md"
              >
                Back to Home
              </button>
            </div>
            
          </div>
        </div>
      )}

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

          {/* Right: Email & Giant 04 */}
          <div className="mt-16 lg:mt-0 relative flex flex-col lg:items-end">
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
            <form className="flex flex-col gap-8" onSubmit={onSubmit}>
              
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[15px] font-bold text-slate-400 tracking-[0.3em] uppercase">FIRST NAME</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John" 
                    className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a202c] transition-colors text-[20px]"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[15px] font-bold text-slate-400 tracking-[0.3em] uppercase">LAST NAME</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john.doe@example.com" 
                  className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a202c] transition-colors text-[20px]"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-3">
                <label className="text-[15px] font-bold text-slate-400 tracking-[0.3em] uppercase">SUBJECT</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Discussion" 
                  className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a202c] transition-colors text-[20px]"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-3">
                <label className="text-[15px] font-bold text-slate-400 tracking-[0.3em] uppercase">MESSAGE</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or idea..." 
                  rows="4" 
                  className="w-full bg-transparent border-0 border-b border-slate-300 pb-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1a202c] transition-colors text-[20px] resize-none"
                ></textarea>
              </div>

              {/* Submit Button & Disclaimer */}
              <div className="mt-4 flex flex-col items-start gap-6">
                <button 
                  type="submit" 
                  className="flex items-center gap-3 bg-transparent hover:rounded-xl border border-[#1a202c] text-[#1a202c] px-6 py-3 text-lg font-bold hover:bg-[#1a202c] hover:text-white transition-colors"
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