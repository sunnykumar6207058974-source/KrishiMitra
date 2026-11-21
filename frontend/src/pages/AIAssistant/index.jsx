import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareText, Send, Sparkles, Bot, User, BookOpen, AlertCircle,
  Mic, MicOff, Volume2, VolumeX, Trash2, CheckCircle2, RefreshCw, ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import assistantService from '../../services/assistantService';
import AIOrb from '../../components/assistant/AIOrb';

export default function AIAssistant() {
  const { lang, setLang, t } = useLanguage();
  const { user } = useAuth();

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: t('assistantPage.greeting'),
      sources: [
        {
          title: "Package of Practices for Kharif & Rabi Crops",
          organization: "Assam Agricultural University (AAU)",
          document_type: "Official Research Bulletin",
          source_url: "http://www.aau.ac.in"
        },
        {
          title: "National Rice & Soil Acidity Guidelines",
          organization: "ICAR-NRRI & KVK Cachar",
          document_type: "ICAR Advisory Bulletin",
          source_url: "https://nrri.icar.gov.in"
        }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [orbState, setOrbState] = useState('idle'); // idle | listening | thinking | speaking
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [voiceNotification, setVoiceNotification] = useState('');
  const [voiceAudioActive, setVoiceAudioActive] = useState(false);

  const chatBottomRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Update welcome message if language changes and chat is fresh
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{
          ...prev[0],
          content: t('assistantPage.greeting')
        }];
      }
      return prev;
    });
  }, [lang]);

  // Setup Browser Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setOrbState('listening');
        setVoiceNotification(t('assistantPage.listening'));
      };

      recognition.onresult = (event) => {
        const spokenQuery = event.results[0][0].transcript;
        if (spokenQuery) {
          setInput(spokenQuery);
          setVoiceNotification('');
          handleSend(null, spokenQuery);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition warning:', event.error);
        setOrbState('idle');
        setVoiceNotification('');
      };

      recognition.onend = () => {
        if (orbState === 'listening') {
          setOrbState('idle');
          setVoiceNotification('');
        }
      };

      recognitionRef.current = recognition;
    } else {
      setVoiceSupported(false);
    }
  }, [lang, orbState]);

  // Text to speech voice synthesis
  const speakText = (text) => {
    if (!('speechSynthesis' in window) || !voiceAudioActive) return;
    window.speechSynthesis.cancel();

    // Remove disclaimers for spoken audio brevity
    const speakable = text.split('Notice:')[0].replace(/\*/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(speakable);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setOrbState('speaking');
    utterance.onend = () => setOrbState('idle');
    utterance.onerror = () => setOrbState('idle');

    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceToggle = () => {
    if (!voiceSupported) {
      alert(t('assistantPage.voiceUnsupported'));
      return;
    }

    if (orbState === 'listening') {
      recognitionRef.current?.stop();
      setOrbState('idle');
      setVoiceNotification('');
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSend = async (e, directText = null) => {
    if (e) e.preventDefault();
    const query = (directText || input).trim();
    if (!query) return;

    setInput('');
    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message immediately
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        content: query,
        timestamp: userTimestamp
      }
    ]);

    setLoading(true);
    setOrbState('thinking');

    try {
      const result = await assistantService.sendMessage({
        message: query,
        conversationId: conversationId,
        language: lang,
        location: user?.district ? `${user.district}, ${user.state}` : 'Assam, India',
        crop: 'Rice'
      });

      if (result.conversation_id && !conversationId) {
        setConversationId(result.conversation_id);
      }

      const assistantTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: result.answer,
          sources: result.sources || [],
          disclaimer: result.disclaimer,
          followups: result.suggested_followups || [],
          timestamp: assistantTimestamp
        }
      ]);

      if (voiceAudioActive) {
        speakText(result.answer);
      } else {
        setOrbState('idle');
      }
    } catch (err) {
      console.error('AI assistant query error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: lang === 'hi'
            ? "क्षमा करें, कृषि परामर्श प्राप्त करने में तकनीकी समस्या आई। कृपया अपना इंटरनेट कनेक्शन जांचें या पुनः प्रयास करें।"
            : "Sorry, a technical error occurred while retrieving agricultural guidance. Please check your network and try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setOrbState('idle');
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm(t('assistantPage.clearConfirm'))) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setConversationId(null);
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: t('assistantPage.greeting'),
          sources: [
            {
              title: "Package of Practices for Kharif & Rabi Crops",
              organization: "Assam Agricultural University (AAU)",
              document_type: "Official Research Bulletin"
            }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setOrbState('idle');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const suggestedQuestions = t('assistantPage.suggestedQuestions', { returnObjects: true }) || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* A. Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('assistantPage.badge')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {t('assistantPage.title')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            {t('assistantPage.subtitle')}
          </p>
        </div>

        {/* Language Selector & Controls */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 shadow-xs">
            <span>🌐</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer font-bold text-gray-900"
            >
              <option value="en">English Response</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="as">অসমীয়া (Assamese)</option>
            </select>
          </div>

          <button
            onClick={() => setVoiceAudioActive(!voiceAudioActive)}
            className={`p-2 rounded-xl border transition-colors ${
              voiceAudioActive
                ? 'bg-leaf-100 border-leaf-300 text-forest-900'
                : 'bg-white border-gray-200 text-gray-400 hover:text-gray-700'
            }`}
            title={voiceAudioActive ? 'Voice narration active' : 'Click to enable voice narration'}
          >
            {voiceAudioActive ? <Volume2 className="w-4 h-4 text-forest-800" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors"
            title={t('assistantPage.btnClear')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* B. AI Identity Section with Glowing Multicolour Orb (Reference A) */}
      <div className="bg-gradient-to-r from-forest-950 via-slate-900 to-forest-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-forest-800/80 flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden">
        <div className="space-y-3 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/80 border border-forest-700 text-xs font-semibold text-leaf-300">
            <span className="w-2 h-2 rounded-full bg-leaf-400 animate-ping" />
            <span>{t('assistantPage.statusReady')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            KrishiMitra Neural Agronomy Copilot
          </h2>
          <p className="text-xs text-gray-300 max-w-lg leading-relaxed">
            {t('assistantPage.greeting')}
          </p>
        </div>

        {/* Multicolour Floating Orb Canvas */}
        <div className="z-10 flex flex-col items-center">
          <AIOrb state={orbState} size={150} onClick={handleVoiceToggle} />
          <span className="text-[11px] font-semibold text-gray-400 mt-1">
            {orbState === 'listening' ? t('assistantPage.listening') : orbState === 'thinking' ? t('assistantPage.thinking') : t('assistantPage.voiceSupported')}
          </span>
        </div>
      </div>

      {/* C. Conversation Area */}
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-4 sm:p-6 min-h-[440px] max-h-[580px] overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-9 h-9 rounded-2xl bg-forest-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-5 h-5 text-leaf-400" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[78%] space-y-2.5 ${
                m.role === 'user'
                  ? 'bg-forest-800 text-white rounded-2xl rounded-tr-xs p-4 text-xs shadow-sm leading-relaxed'
                  : 'bg-agriBg text-gray-900 rounded-2xl rounded-tl-xs p-4 sm:p-5 text-xs border border-gray-200/80 leading-relaxed shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-black/5 pb-1 text-[10px] text-gray-400 font-medium">
                <span className="font-bold">{m.role === 'user' ? (user?.full_name || 'Farmer') : 'KrishiMitra AI'}</span>
                <span>{m.timestamp}</span>
              </div>

              {/* Formatted Message Body */}
              <div className="whitespace-pre-wrap font-medium">
                {m.content}
              </div>

              {/* F. Knowledge Sources Attribution */}
              {m.sources && m.sources.length > 0 && (
                <div className="pt-2 border-t border-gray-200/70 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-forest-800 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-forest-700" />
                    <span>{t('assistantPage.sourcesLabel')}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {m.sources.map((s, idx) => (
                      <div
                        key={idx}
                        className="bg-white px-2.5 py-1 rounded-lg border border-gray-200 text-[10px] text-gray-700 font-semibold shadow-2xs flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-forest-600 shrink-0" />
                        <span className="truncate max-w-[220px]">{s.organization} - {s.title}</span>
                        {s.source_url && (
                          <a href={s.source_url} target="_blank" rel="noreferrer" className="text-forest-700 hover:text-forest-900 ml-0.5">
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              {m.disclaimer && (
                <div className="text-[10px] text-amber-900 bg-amber-50/80 border border-amber-200/60 p-2 rounded-lg leading-tight">
                  {m.disclaimer}
                </div>
              )}
            </div>

            {m.role === 'user' && (
              <div className="w-9 h-9 rounded-2xl bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 font-bold text-xs">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {/* Loading / Thinking Indicator */}
        {loading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-9 h-9 rounded-2xl bg-forest-800 text-white flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin text-leaf-400" />
            </div>
            <div className="bg-agriBg p-3.5 rounded-2xl rounded-tl-xs border border-gray-200 text-xs text-gray-600 flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-forest-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-forest-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-forest-600 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="font-semibold">{t('assistantPage.thinking')}</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* D. Suggested Farming Questions (Section 4D) */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-800 block">
          {t('assistantPage.suggestedHeading')}
        </span>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(suggestedQuestions) && suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(null, q)}
              className="text-xs bg-white border border-gray-200 hover:border-forest-600 hover:bg-forest-50/50 text-gray-800 px-3.5 py-2 rounded-xl shadow-xs transition-all text-left font-medium"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* E. Message Composer */}
      <form onSubmit={handleSend} className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('assistantPage.inputPlaceholder')}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-forest-700 text-xs text-gray-900 shadow-sm font-medium resize-none"
            />
            {voiceNotification && (
              <span className="absolute right-3 bottom-3 text-[10px] font-bold text-sky-600 animate-pulse">
                {voiceNotification}
              </span>
            )}
          </div>

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`px-3.5 py-3 rounded-2xl border transition-colors flex items-center justify-center ${
              orbState === 'listening'
                ? 'bg-red-500 text-white border-red-600 shadow-md animate-pulse'
                : 'bg-white border-gray-200 text-gray-600 hover:text-forest-800 hover:border-forest-300'
            }`}
            title={voiceSupported ? t('assistantPage.voiceSupported') : t('assistantPage.voiceUnsupported')}
          >
            {orbState === 'listening' ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-2xl text-xs shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5 self-stretch"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t('assistantPage.btnSend')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
