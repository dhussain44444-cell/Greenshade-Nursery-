import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Sparkles, Send, Stethoscope, Bot, User, RefreshCw, PhoneCall, Check, Leaf } from 'lucide-react';

interface AIPlantDoctorProps {
  initialPlantName?: string;
}

export const AIPlantDoctor: React.FC<AIPlantDoctorProps> = ({ initialPlantName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'doctor',
      text: `Hello! I am Dr. Green, the Master Botanist at Amar Gaon Nursery, Rani Gate, Azara, Guwahati. 🌿\n\nHow can I help your plants thrive today? Ask me about leaf yellowing, pest remedies, Assam orchids (Kapou Phool), watering schedules, or recommended organic fertilizers for our humid Assam climate.`,
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Why are my Monstera leaves turning yellow?',
    'How to care for Kapou Phool (Assam Orchid)?',
    'Best low-light indoor plants for Guwahati homes?',
    'Natural organic remedy for mealybugs on Hibiscus?',
    'How often to water Kaji Nemu (Assam Lemon)?',
  ];

  useEffect(() => {
    if (initialPlantName) {
      handleSend(`How do I care for my ${initialPlantName} in Guwahati weather?`, initialPlantName);
    }
  }, [initialPlantName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string, contextPlant?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/plant-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          plantContext: contextPlant,
        }),
      });

      const data = await res.json();
      const botReply = data.reply || 'Thank you! For immediate hands-on diagnosis, please call our Amar Gaon Nursery agronomists at 080112 53258.';

      const docMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, docMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        text: '🌿 **Dr. Green Tip**:\n\n• Check for proper drainage holes in clay pots.\n• Apply diluted Neem oil solution (5ml/L) every 5 days for pests.\n• Feed with Bio-Organic Vermicompost once a month.\n\nCall our Rani gate, Azara nursery at **080112 53258** for personal plant health advice!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="plant-doctor" className="py-20 bg-slate-100 text-slate-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Botanical Doctor</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
            Ask Dr. Green • Plant Care Assistant
          </h2>
          <p className="text-slate-600 text-sm">
            Instant diagnostic advice tailored to Assam’s humid subtropical weather, soil conditions, and pest types.
          </p>
        </div>

        {/* Chat Window Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[580px]">
          {/* Chat Header */}
          <div className="bg-emerald-900 text-white p-4 px-6 flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900" />
              </div>
              <div>
                <div className="font-serif font-bold text-base text-white flex items-center gap-2">
                  <span>Dr. Green</span>
                  <span className="text-[10px] bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                    Guwahati Expert
                  </span>
                </div>
                <div className="text-xs text-emerald-300">
                  Certified Nursery Agronomist • Active
                </div>
              </div>
            </div>

            <a
              href="tel:08011253258"
              className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-700 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Call Nursery: 080112 53258</span>
            </a>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-800 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[10px] mt-2 text-right ${
                      msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 mr-auto max-w-[75%] items-center text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200">
                <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>Dr. Green is examining plant symptoms...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-3 bg-white border-t border-slate-200 overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 uppercase tracking-wider pl-1">
              Popular:
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 text-xs text-slate-700 whitespace-nowrap transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about plant yellowing, watering, pests, orchids..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 transition-colors shadow"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
