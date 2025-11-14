'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Calculator, Microscope, Code2, Languages,
  Home, Send, Clock, Loader2, BookOpen
} from 'lucide-react';

export default function StudyShack() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'subjects', 'chat'
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hey there! Welcome to The Study Shack. Pull up a chair and ask me anything about math, science, coding, or languages. Let\'s learn together!',
      time: 0
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('general');
  const messagesEndRef = useRef(null);

  const subjects = [
    { id: 'general', icon: Sparkles, label: 'General', color: 'from-orange-600 to-orange-700' },
    { id: 'math', icon: Calculator, label: 'Math', color: 'from-amber-700 to-orange-800' },
    { id: 'science', icon: Microscope, label: 'Science', color: 'from-teal-700 to-teal-800' },
    { id: 'coding', icon: Code2, label: 'Coding', color: 'from-slate-700 to-slate-800' },
    { id: 'language', icon: Languages, label: 'Language', color: 'from-orange-700 to-red-800' },
  ];

  const examplePrompts = [
    "Explain quantum entanglement simply",
    "Why does e^(iπ) = -1?",
    "How do I implement quicksort in Python?",
    "Teach me Spanish subjunctive mood",
    "What causes the greenhouse effect?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSubjectSystemPrompt = (subject) => {
    const prompts = {
      general: 'You are a friendly, helpful tutor at The Study Shack. Be warm and approachable while being concise and thorough. Keep responses under 150 words unless asked for more detail.',
      math: 'You are a friendly math tutor at The Study Shack. Explain concepts clearly with examples. Use markdown for equations. Break down complex problems step-by-step in an encouraging way.',
      science: 'You are a friendly science tutor at The Study Shack. Use analogies and real-world examples. Make complex concepts accessible and exciting.',
      coding: 'You are a friendly programming tutor at The Study Shack. Provide clean code examples with clear explanations. Focus on best practices while being encouraging.',
      language: 'You are a friendly language tutor at The Study Shack. Provide examples, pronunciation tips, and cultural context when relevant. Make learning fun and engaging.'
    };
    return prompts[subject] || prompts.general;
  };


  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const startTime = performance.now();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          systemPrompt: getSubjectSystemPrompt(subject)
        })
      });

      const data = await response.json();
      const endTime = performance.now();
      const responseTime = ((endTime - startTime) / 1000).toFixed(2);

      const assistantMessage = {
        role: 'assistant',
        content: data.content,
        time: parseFloat(responseTime)
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Oops! Something went wrong. Please try again.',
        time: 0
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url(/studyshack.png)',
          filter: 'brightness(0.7)'
        }}
      ></div>

      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-950/50 via-orange-900/45 to-amber-900/50 z-0"></div>

      <div className="relative z-10">
        {currentView === 'home' && (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center">
              {/* Welcome Text */}
              <div className="mb-8 bg-gradient-to-br from-orange-50/95 to-amber-100/95 backdrop-blur-md rounded-3xl p-12 border-4 border-orange-300 shadow-2xl">
                <h1 className="text-6xl font-bold text-orange-950 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  The Study Shack
                </h1>
                <p className="text-2xl text-orange-900 mb-3 font-serif">
                  Welcome, dear! Come on in...
                </p>
                <p className="text-lg text-orange-800 max-w-2xl mx-auto leading-relaxed">
                  Pull up a chair by the fireplace. Whether it's math homework, a science question,
                  or learning something new - we're here to help you understand it all.
                </p>
              </div>

              {/* Enter Button */}
              <button
                onClick={() => setCurrentView('subjects')}
                className="group bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white px-12 py-5 rounded-2xl text-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-amber-900"
              >
                <span className="flex items-center gap-3 justify-center">
                  <Home className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                  Come Inside
                </span>
              </button>

              <p className="mt-6 text-orange-100 text-sm italic font-semibold">
                Free forever • Made with love • Powered by Friendli AI
              </p>
            </div>
          </div>
        )}

        {currentView === 'subjects' && (
          <div className="min-h-screen p-8">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-orange-950 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  What would you like to learn today?
                </h1>
                <p className="text-xl text-orange-800">
                  Pick a subject and let's get started!
                </p>
              </div>

              {/* Subject Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {subjects.map(s => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSubject(s.id);
                        setCurrentView('chat');
                      }}
                      className="group bg-white hover:bg-orange-50 p-8 rounded-2xl border-4 border-orange-300 hover:border-orange-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}>
                        <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-950 mb-2">{s.label}</h3>
                      <p className="text-sm text-orange-800">
                        {s.id === 'math' && 'Numbers, equations & problem solving'}
                        {s.id === 'science' && 'Explore the wonders of nature'}
                        {s.id === 'coding' && 'Learn to create with code'}
                        {s.id === 'language' && 'Master new ways to communicate'}
                        {s.id === 'general' && 'Ask me anything you\'re curious about!'}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Back Button */}
              <div className="text-center">
                <button
                  onClick={() => setCurrentView('home')}
                  className="text-orange-800 hover:text-orange-950 font-semibold underline text-lg"
                >
                  ← Back to entrance
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'chat' && (
          <div className="min-h-screen p-4">
            <div className="max-w-5xl mx-auto">
              {/* Header with back button */}
              <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <button
                  onClick={() => setCurrentView('subjects')}
                  className="text-orange-800 hover:text-orange-950 font-semibold flex items-center gap-2 text-lg"
                >
                  ← Pick a different subject
                </button>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 px-4 py-2 rounded-full border-2 border-orange-300 shadow-md">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-900" strokeWidth={2.5} />
                    <span className="text-orange-950 text-sm font-semibold">
                      {messages.filter(m => m.role === 'user').length} questions asked
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Container */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 backdrop-blur-xl rounded-2xl border-4 border-orange-900/30 shadow-2xl overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(120, 53, 15, 0.2)' }}>
                {/* Messages */}
                <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/40 to-orange-50/40">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-xl p-4 shadow-md ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-br from-orange-700 to-orange-900 text-white border-2 border-orange-950'
                              : 'bg-gradient-to-br from-orange-50 to-orange-100 text-orange-950 border-2 border-orange-300'
                          }`}
                        >
                          <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                        </div>
                        {msg.role === 'assistant' && msg.time > 0 && (
                          <div className="flex gap-2 mt-2 text-xs">
                            <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-950 rounded-md font-semibold border border-orange-400">
                              <Clock className="w-3 h-3" />
                              {msg.time}s
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-300 shadow-md">
                        <div className="flex gap-1.5 items-center">
                          <Loader2 className="w-5 h-5 text-orange-800 animate-spin" />
                          <span className="text-orange-950 text-sm font-medium">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Example Prompts */}
                {messages.filter(m => m.role === 'user').length === 0 && (
                  <div className="px-6 pb-4 border-t-2 border-orange-300 pt-4 bg-orange-50/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-orange-800" strokeWidth={2.5} />
                      <p className="text-orange-950 text-sm font-bold">Try asking about:</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {examplePrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleExampleClick(prompt)}
                          className="px-3 py-2 bg-white hover:bg-orange-50 text-orange-950 rounded-lg text-sm transition-all duration-200 border-2 border-orange-300 hover:border-orange-500 font-medium shadow-sm"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="border-t-2 border-orange-300 p-4 bg-gradient-to-b from-orange-50/50 to-orange-100/50">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="What would you like to learn?"
                      className="flex-1 bg-white border-2 border-orange-300 rounded-xl px-5 py-3 text-orange-950 placeholder-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition-all shadow-sm"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="bg-gradient-to-br from-orange-700 to-orange-800 hover:from-orange-800 hover:to-orange-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center gap-2 border-2 border-orange-950"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Encouraging footer */}
              <div className="text-center mt-6 text-orange-800 text-sm">
                <p className="font-medium italic">You're doing great! Keep those questions coming!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
