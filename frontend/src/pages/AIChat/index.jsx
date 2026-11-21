import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareText, Send, Sparkles, Bot, User, BookOpen, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Namaste! I am KrishiMitra, your AI agricultural assistant specialized in Assam crops, soil acidity, weather risks, and ICAR cultivation practices. How can I assist you with your field today?',
      sources: ['Assam Agricultural University Package of Practices', 'Barak Valley KVK Bulletin']
    }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const query = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: query }]);

    setTimeout(() => {
      let replyText = '';
      if (query.toLowerCase().includes('acid') || query.toLowerCase().includes('ph')) {
        replyText = 'For managing acidic soils in Assam (pH 5.0 - 5.6): Apply Agricultural Lime (calcium carbonate) @ 250-350 kg/Bigha once every 3 years. This neutralizes active aluminium toxicity and allows paddy roots to absorb applied phosphate fertilizers.';
      } else if (query.toLowerCase().includes('paddy') || query.toLowerCase().includes('sali')) {
        replyText = 'For Sali paddy in Barak & Brahmaputra valleys: Transplant 25-day old seedlings at 2-3 per hill. Apply 50% nitrogen as basal dose, 25% at active tillering, and 25% at panicle initiation for optimal yield.';
      } else {
        replyText = `Based on ICAR and Assam Agricultural University guidelines: Ensure well-drained seedbed preparation and use certified seed varieties suitable for local soil conditions. Consult your local Krishi Vigyan Kendra for lab-tested fertilizer dosages.`;
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: replyText,
          sources: ['ICAR-NRRI Rice Guide', 'Assam Agro-Advisory Division'],
          disclaimer: 'Notice: Responses are verified demonstration agronomic guidance. Always confirm chemical sprays with your local block agriculture officer.'
        }
      ]);
    }, 600);
  };

  const sampleQuestions = [
    "How should I manage soil acidity (pH 5.4) in my Cachar farm?",
    "What is the best sowing time and variety for Sali Paddy in Assam?",
    "How to cultivate yellow mustard (Toria TS-38) post-paddy harvest?",
    "Why are my crop lower leaves showing brown elliptical spots?"
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        badge="RAG Advisory Copilot"
        title="Krishi AI Farming Assistant"
        subtitle="Ask agricultural questions grounded in verified ICAR research publications and Assam agronomy standards."
        actionButton={
          <div className="bg-km-surface px-3 py-1.5 rounded-2xl border border-km-border text-xs font-bold text-km-dark">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="en">English Response</option>
              <option value="as">অসমীয়া (Assamese)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>
        }
      />

      {/* Chat Container */}
      <div className="bg-km-surface rounded-3xl border border-km-border shadow-subtle p-5 sm:p-6 min-h-[460px] max-h-[580px] overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-km-deep text-white flex items-center justify-center shrink-0 text-xs font-bold">
                <Bot className="w-4 h-4 text-leaf-400" />
              </div>
            )}

            <div className={`max-w-[85%] space-y-2 ${
              m.role === 'user'
                ? 'bg-km-deep text-white rounded-2xl rounded-tr-xs p-3.5 text-xs shadow-sm'
                : 'bg-km-bg text-km-dark rounded-2xl rounded-tl-xs p-4 text-xs border border-km-border'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

              {m.sources?.length > 0 && (
                <div className="pt-2 border-t border-km-border/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-km-subtext flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-km-sage" />
                    <span>Knowledge Sources:</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {m.sources.map((s, i) => (
                      <span key={i} className="text-[9px] bg-white border border-km-border px-2 py-0.5 rounded-md text-km-subtext font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {m.disclaimer && (
                <div className="pt-1.5 text-[9px] text-amber-800 leading-tight">
                  {m.disclaimer}
                </div>
              )}
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-km-border text-km-dark flex items-center justify-center shrink-0 text-xs font-bold">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Chips */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-km-dark">Suggested Farming Questions:</span>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setInput(q)}
              className="text-xs bg-km-surface border border-km-border hover:border-km-sage text-km-dark px-3 py-1.5 rounded-xl shadow-xs transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your crops, soil pH, fertilizer or weather..."
          className="flex-1 px-4 py-3 rounded-2xl border border-km-border bg-km-surface focus:outline-none focus:border-km-sage text-xs text-km-dark shadow-subtle font-medium"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-6 py-3 bg-km-deep hover:bg-km-sage text-white font-bold rounded-2xl text-xs shadow-subtle transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>
    </div>
  );
}
