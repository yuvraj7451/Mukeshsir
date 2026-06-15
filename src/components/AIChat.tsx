import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, X, MessageSquare, Code, Terminal, Brain, ArrowUpRight, HelpCircle, User } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIChatProps {
  isDarkMode: boolean;
}

export default function AIChat({ isDarkMode }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: 'assistant',
      text: "Namaste! I am Mukesh Sir's AI Coding Assistant. Ask me anything about Python, C Programming, Web Development, SQL, or binary logic! How can I help you master technology today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionActive, setSuggestionActive] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { text: "Explain pointers in C programming", tag: "C Language" },
    { text: "Give me an example of an SQL INNER JOIN query", tag: "Databases" },
    { text: "What is the difference between a list and tuple in Python?", tag: "Python" },
    { text: "Explain Boolean Logic laws for Chapter 1 Class 11", tag: "Boolean" }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setSuggestionActive(false);

    try {
      // Structure the chat history correctly for the server's endpoint
      const chatHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        text: msg.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: chatHistory
        })
      });

      if (!res.ok) {
        throw new Error('Server returned an error');
      }

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        text: data.reply || "I am currently having difficulty routing the question. Please ask standard academic questions during Mukesh Sir's theory hour!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        text: "I encountered a processing timeout. Make sure GEMINI_API_KEY is configured in your Secrets panel or try again in a few moments.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-tr from-brand-blue via-blue-950 to-brand-gold hover:to-amber-500 text-white p-4 rounded-full shadow-2xl shadow-brand-gold/20 flex items-center gap-2 group transition-all duration-300 transform hover:scale-105 border border-brand-gold/50"
        id="ai-floating-trigger"
      >
        <Sparkles className="w-6 h-6 text-brand-gold group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-sm font-bold uppercase tracking-wider font-display shrink-0 whitespace-nowrap">
          AI Doubt Assistant
        </span>
      </button>

      {/* Main Panel Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-y-0 right-0 w-full sm:w-[480px] z-50 bg-[#051124] text-white shadow-2xl flex flex-col border-l border-white/10"
          id="ai-study-chat-panel"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-brand-blue to-slate-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-gold flex items-center justify-center">
                <Brain className="w-5 h-5 text-slate-950 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base tracking-tight flex items-center gap-1.5 text-white">
                  Doubt Solver <span className="text-xs text-brand-gold font-mono border border-brand-gold/30 px-1.5 py-0.5 rounded uppercase font-semibold">AI Assistant</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">Powered by Mukesh Sir's Curriculum</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              id="ai-close-chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Context Tip */}
          <div className="p-3 bg-brand-gold/10 border-b border-brand-gold/20 px-5 text-xs text-brand-gold flex items-start gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Need immediate exam advice? Try typing high-scoring Class 12 board topics or request C codes!</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4" id="ai-chat-messages">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isAssistant 
                      ? 'bg-brand-blue border border-brand-gold/30 text-brand-gold' 
                      : 'bg-brand-gold text-slate-950'
                  }`}>
                    {isAssistant ? <Terminal className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isAssistant 
                        ? 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none font-sans' 
                        : 'bg-brand-gold text-slate-950 font-semibold rounded-tr-none'
                    }`}>
                      {msg.text.split('\n').map((line, idx) => (
                        <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block px-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Simulated Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-lg bg-brand-blue border border-brand-gold/30 text-brand-gold flex items-center justify-center">
                  <Terminal className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce delay-300"></span>
                  <span className="text-xs font-mono">Mukesh Assistant is writing code...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Tray */}
          {suggestionActive && (
            <div className="px-5 py-3 bg-slate-950/40 border-t border-white/5" id="ai-chat-suggestions">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-2 font-bold">Standard Syllabus Queries:</span>
              <div className="grid grid-cols-1 gap-1.5">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s.text)}
                    className="text-left text-xs bg-white/5 hover:bg-brand-gold/10 hover:text-brand-gold border border-white/10 p-2.5 rounded-xl transition-all flex items-center justify-between"
                  >
                    <span>{s.text}</span>
                    <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded font-mono text-slate-300 uppercase shrink-0 ml-2">
                      {s.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-4 bg-slate-950 border-t border-white/10 flex items-center gap-2"
            id="ai-chat-form"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask an academic CS query..."
              className="flex-1 bg-white/5 focus:bg-white/10 border border-white/10 focus:border-brand-gold/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none transition-all"
              id="ai-chat-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-brand-gold hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 rounded-xl transition-all shadow-md shrink-0"
              id="ai-send-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
