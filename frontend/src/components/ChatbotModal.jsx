import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage, isBackendAvailable } from '../services/chatApi';

const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
    <path d="M12 2v2" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const LoadingDots = () => (
  <div className="flex gap-1">
    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
  </div>
);

export default function ChatbotModal({ isOpen, onClose }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there. I'm Jatin's virtual assistant. How can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [backendOnline, setBackendOnline] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Check backend health on mount and periodically
  useEffect(() => {
    const checkBackendHealth = async () => {
      const available = await isBackendAvailable();
      setBackendOnline(available);
    };

    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    if (!backendOnline) {
      setError('Backend is offline. Please try again later.');
      return;
    }

    const userMessage = inputValue;
    const newUserMsg = { id: Date.now(), sender: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(userMessage, conversationId);

      // Update conversation ID
      if (response.conversation_id && !conversationId) {
        setConversationId(response.conversation_id);
      }

      // Format bot response with sources
      let botText = response.answer;

      // Add sources section if available
      // if (response.sources && response.sources.length > 0) {
      //   botText += "\n\n📚 Sources:";
      //   response.sources.forEach((source, idx) => {
      //     botText += `\n• ${source.section}${source.subsection ? ` - ${source.subsection}` : ''} (Relevance: ${source.relevance_score})`;
      //   });
      // }

      // Add confidence indicator if low
      // if (response.confidence_score < 0.5) {
      //   botText += "\n\n⚠️ Note: This response has lower confidence. Please verify important details.";
      // }

      const newBotMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botText,
        metadata: {
          confidence: response.confidence_score,
          retrievalCount: response.retrieval_details?.reranked_count || 0,
          responseTime: response.retrieval_details?.total_time || 0,
        }
      };

      setMessages(prev => [...prev, newBotMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage = err.message || 'Failed to get response from backend. Please try again.';
      setError(errorMessage);

      const errorBotMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Sorry, I encountered an error: ${errorMessage}. Please try rephrasing your question or check back later.`,
        isError: true
      };

      setMessages(prev => [...prev, errorBotMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/20 backdrop-blur-sm p-4 sm:p-6 transition-all">

      {/* Modal Container */}
      <div className="w-full md:w-[70vw] lg:w-[50vw] max-w-3xl h-[85vh] md:h-[75vh] bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-white/40 ring-1 ring-zinc-900/5">

        {/* Minimalist Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-zinc-100 z-10 bg-white/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-sm w-11 h-11 bg-zinc-900 text-white shadow-sm">
              <BotIcon />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[17px] font-semibold text-zinc-900 tracking-tight leading-tight">Portfolio Assistant</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`relative flex h-2 w-2 ${backendOnline ? 'animate-ping' : ''}`}>
                  <span className={`absolute inline-flex h-full w-full ${backendOnline ? 'bg-emerald-400 opacity-75' : 'bg-red-400 opacity-75'}`}></span>
                  <span className={`relative inline-flex h-2 w-2 ${backendOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                </span>
                <span className="text-xs text-zinc-500 font-medium">{backendOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-all duration-200"
            aria-label="Close Chat"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-200 [&::-webkit-scrollbar-track]:bg-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
            >
              <div
                className={`px-5 py-3.5 text-[15px] rounded-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-zinc-900 text-white'
                    : msg.isError
                    ? 'bg-red-50 text-red-800 border border-red-200/50'
                    : 'bg-zinc-100/80 text-zinc-800 border border-zinc-200/50'
                }`}
              >
                {msg.text}
              </div>
              {msg.metadata && (
                <div className="text-xs text-zinc-400 mt-1.5">
                  Confidence: {(msg.metadata.confidence * 100).toFixed(0)}% • {msg.metadata.retrievalCount} sources
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 self-start">
              <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-zinc-900 text-white flex-shrink-0">
                <BotIcon />
              </div>
              <div className="px-5 py-3.5 bg-zinc-100/80 rounded-sm border border-zinc-200/50">
                <LoadingDots />
              </div>
            </div>
          )}

          {error && (
            <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-sm text-sm text-amber-800">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 sm:p-5 bg-white/80 border-t border-zinc-100">
          <form
            onSubmit={handleSend}
            className="relative flex rounded-md items-center bg-zinc-50 p-1.5 border border-zinc-200/60 focus-within:border-zinc-300 focus-within:bg-white focus-within:shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition-all duration-300"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading || !backendOnline}
              placeholder={backendOnline ? "Type your message..." : "Backend is offline..."}
              className="flex-1 rounded-md bg-transparent border-none outline-none text-zinc-800 px-5 py-2.5 placeholder-zinc-400 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading || !backendOnline}
              className="flex items-center rounded-md justify-center w-10 h-10 bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-900 transition-all flex-shrink-0"
            >
              <SendIcon />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}