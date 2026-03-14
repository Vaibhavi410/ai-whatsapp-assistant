import { useState, useEffect } from "react";

const initialOrders = [
  {
    id: 1023,
    items: 'Pizza x2, Coke x1',
    status: 'Pending',
    time: 'Today • 7:12 PM',
    customer: 'Sarah Johnson',
  },
  {
    id: 1024,
    items: 'Burger x3',
    status: 'Completed',
    time: 'Today • 6:45 PM',
    customer: 'Michael Lee',
  },
  {
    id: 1025,
    items: 'Pizza x1, Garlic Bread x1',
    status: 'In Progress',
    time: 'Today • 6:30 PM',
    customer: 'David Kim',
  },
  {
    id: 1026,
    items: 'Pasta x2, Coke x2',
    status: 'Completed',
    time: 'Yesterday • 8:10 PM',
    customer: 'Aisha Patel',
  },
];

const customers = [
  {
    name: 'Sarah Johnson',
    phone: '+1 555 123 4567',
    totalOrders: 12,
    favorite: 'Margherita Pizza',
  },
  {
    name: 'Michael Lee',
    phone: '+1 555 987 6543',
    totalOrders: 9,
    favorite: 'Classic Burger',
  },
  {
    name: 'David Kim',
    phone: '+1 555 555 0088',
    totalOrders: 6,
    favorite: 'Pepperoni Pizza',
  },
  {
    name: 'Aisha Patel',
    phone: '+1 555 444 2211',
    totalOrders: 15,
    favorite: 'Veggie Pizza',
  },
];

const insights = [
  {
    label: "Top Product",
    value: "Pizza",
    description: "48% of all orders this week",
    trend: "up",
    trendValue: "48%",
    trendLabel: "orders this week",
    sparkline: [28, 32, 38, 42, 45, 48],
    icon: "🍕",
    accent: "amber",
  },
  {
    label: "Peak Order Time",
    value: "7–9 PM",
    description: "Evening rush from repeat customers",
    trend: "neutral",
    trendValue: null,
    trendLabel: "Evening rush",
    sparkline: [15, 35, 55, 75, 90, 85],
    icon: "⏰",
    accent: "violet",
  },
  {
    label: "Repeat Customers",
    value: "32%",
    description: "Up 8% vs last week",
    trend: "up",
    trendValue: "8%",
    trendLabel: "vs last week",
    sparkline: [22, 24, 26, 28, 30, 32],
    icon: "👥",
    accent: "teal",
  },
];

function Sparkline({ data, color = "teal", className = "" }) {
  if (!data || data.length < 2) return null;
  const w = 56;
  const h = 20;
  const pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => {
    const x = pad + i * step;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const d = `M ${points.join(" L ")}`;
  const strokeClass =
    color === "amber"
      ? "stroke-amber-500 dark:stroke-amber-400"
      : color === "violet"
        ? "stroke-violet-500 dark:stroke-violet-400"
        : "stroke-teal-500 dark:stroke-teal-400";
  return (
    <svg width={w} height={h} className={className} aria-hidden>
      <path
        d={d}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={strokeClass}
      />
    </svg>
  );
}

function TrendBadge({ trend, value }) {
  if (!value) return null;
  const isUp = trend === "up";
  const isDown = trend === "down";
  const className = isUp
    ? "text-emerald-600 dark:text-emerald-400"
    : isDown
      ? "text-red-600 dark:text-red-400"
      : "text-slate-500 dark:text-slate-400";
  const arrow = isUp ? "↑" : isDown ? "↓" : "—";
  return (
    <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${className}`}>
      {arrow} {value}
    </span>
  );
}

const suggestions = [
  {
    title: 'Weekend Pizza Offer',
    description:
      'Pizza demand is high this week. Send a 10% weekend pizza offer to repeat customers.',
    impact: 'High impact',
    type: 'Campaign',
  },
  {
    title: 'Upsell Drinks',
    description:
      'Customers ordering pizza often add soft drinks. Suggest adding a 2-for-1 drinks bundle at checkout.',
    impact: 'Medium impact',
    type: 'Upsell',
  },
];

function StatusBadge({ status }) {
  const config = {
    Completed:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30 dark:ring-emerald-400/40",
    Pending:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/30 dark:ring-amber-400/40",
    "In Progress":
      "bg-sky-500/15 text-sky-600 dark:text-sky-400 ring-1 ring-sky-500/30 dark:ring-sky-400/40",
  };
  const style = config[status] || config.Pending;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm transition-all duration-300 ${style}`}
    >
      {status}
    </span>
  );
}

const NavIcons = {
  Dashboard: (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Orders: (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Customers: (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Insights: (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

const HERO_IMAGE = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80";
const TIP_IMAGE = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80";

function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-[280px] border-r border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-200/20 dark:border-slate-800/60 dark:bg-slate-900/80 dark:shadow-none transition-all duration-300 relative z-20">
      <div className="flex items-center gap-4 px-6 pt-8 pb-6 bg-slate-900 dark:bg-slate-950/50 backdrop-blur-xl border-b border-indigo-500/10">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] bg-gradient-to-b from-indigo-500 to-indigo-700 text-white font-serif font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_16px_rgba(79,70,229,0.3)] ring-1 ring-white/10 overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 text-xl tracking-tighter group-hover:scale-105 transition-transform duration-500">
             <span className="text-indigo-100">A</span>I
          </span>
        </div>
        <div className="animate-fade-in min-w-0">
          <h2 className="text-[15px] font-black text-white tracking-tight flex items-center gap-1.5 truncate">
            WhatsApp Pro
            <span className="inline-flex items-center justify-center rounded bg-indigo-500/20 px-1 py-0.5 text-[8px] font-black tracking-widest text-indigo-300 uppercase ring-1 ring-indigo-500/30">
              Beta
            </span>
          </h2>
          <p className="text-[10px] font-medium tracking-wide text-indigo-200 mt-1 opacity-80">
            Powered by Antigravity™
          </p>
        </div>
      </div>
      
      <div className="px-4 mb-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      </div>

      <nav className="flex-1 space-y-1.5 px-4 overflow-y-auto">
        <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 mt-2">Menu</p>
        <NavItem label="Dashboard" icon={NavIcons.Dashboard} active />
        <NavItem label="Orders" icon={NavIcons.Orders} badge="12" />
        <NavItem label="Customers" icon={NavIcons.Customers} />
        <NavItem label="Insights" icon={NavIcons.Insights} />
        
        <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 mt-8">Settings</p>
        <NavItem label="Integrations" icon={
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        } />
        <NavItem label="Account" icon={
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        } />
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/50 dark:from-slate-800 dark:to-slate-800/50 p-4 border border-slate-200/60 dark:border-slate-700/60 shadow-inner relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur animate-pulse" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 relative" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">API Connected</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">WhatsApp Business</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ label, icon, active = false, badge }) {
  return (
    <button
      className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ease-out border overflow-hidden relative ${
        active
          ? "bg-slate-900 text-white border-slate-900 shadow-md dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/20 dark:shadow-none"
          : "text-slate-600 border-transparent hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-400 rounded-r-full dark:bg-teal-400" />
      )}
      <span className="flex items-center gap-3 min-w-0 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        <span className={`transition-colors duration-300 ${active ? "text-teal-400 dark:text-teal-300" : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"}`}>
          {icon}
        </span>
        <span className="truncate font-bold">{label}</span>
      </span>
      {badge && (
        <span className={`relative z-10 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold shadow-sm transition-colors duration-300 ${
          active 
            ? "bg-teal-500 text-white dark:bg-teal-500/30 dark:text-teal-300" 
            : "bg-slate-200/90 text-slate-700 dark:bg-slate-800 dark:text-slate-300 group-hover:bg-slate-200 group-hover:text-slate-900 dark:group-hover:bg-slate-700 dark:group-hover:text-white"
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function App() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      return stored !== "light";
    } catch {
      return true;
    }
  });

  const [activeVoicemail, setActiveVoicemail] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceDetected, setVoiceDetected] = useState(false);

  const [campaignPreview, setCampaignPreview] = useState(null);
  
  const [conversationView, setConversationView] = useState(false);

  // Hackathon Wow-Factor States
  const [ordersList, setOrdersList] = useState(initialOrders);
  const [translationState, setTranslationState] = useState("idle"); // idle, processing, complete
  const [showToast, setShowToast] = useState(false);

  const handleInjectOrder = () => {
    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      items: "1x Chicken Tikka, Garlic Naan",
      customer: "Priya Singh",
      time: "Just now",
      status: "pending",
    };
    setOrdersList((prevOrders) => [newOrder, ...prevOrders]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Trigger webhook mock on pressing 'w'
      if (e.key === "w" || e.key === "W") {
        handleInjectOrder();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleVoiceDemo = () => {
    setActiveVoicemail(true);
    setIsListening(true);
    setVoiceDetected(false);
    setTimeout(() => {
      setIsListening(false);
      setVoiceDetected(true);
    }, 2500);
  };

  const handleInterceptTranslation = () => {
    setTranslationState("processing");
    setTimeout(() => {
      setTranslationState("complete");
    }, 1800);
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 relative bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      {/* Decorative ambient background for glassmorphism to pop */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-400/10 dark:bg-teal-500/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-amber-400/10 dark:bg-amber-500/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-emerald-400/10 dark:bg-emerald-500/5 blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="flex min-h-screen relative z-10">
        <Sidebar />

        <main className="flex-1 relative pb-10 h-screen overflow-y-auto w-full max-w-[100vw]">


          {/* Glassmorphic Top Bar */}
          <div className="relative overflow-hidden border-b border-white/40 bg-white/60 backdrop-blur-md shadow-sm dark:border-white/5 dark:bg-slate-900/60 transition-colors duration-300">
            <div className="relative flex flex-col gap-5 px-4 py-6 md:px-8 md:py-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="animate-fade-in-up">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl flex items-center gap-2">
                    AI WhatsApp Assistant
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 ring-1 ring-amber-500/30 dark:from-amber-500/20 dark:to-orange-500/20 dark:text-amber-400">
                      <span>✨</span> AI Powered
                    </span>
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                    Track WhatsApp orders, understand your customers, and act on AI-powered suggestions.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 animate-fade-in-up animate-delay-100 flex-wrap">
                  <button
                    onClick={handleVoiceDemo}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-bold text-teal-700 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-teal-100 hover:shadow dark:border-teal-900 dark:bg-teal-900/30 dark:text-teal-300 dark:hover:bg-teal-900/50"
                  >
                    <span>🎤</span> Voice Orders
                  </button>
                  <button onClick={() => setConversationView(true)} className="inline-flex items-center justify-center rounded-2xl border border-white/50 bg-white/70 backdrop-blur px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 hover:shadow dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700/80">
                    View Conversations
                  </button>

                  <button
                    type="button"
                    onClick={() => setDark((d) => !d)}
                    className="rounded-2xl border border-white/50 bg-white/70 backdrop-blur p-2.5 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white/90 dark:border-white/10 dark:bg-slate-800/60 dark:hover:bg-slate-700/80"
                    title={dark ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {dark ? <span>☀️</span> : <span>🌙</span>}
                  </button>
                  <div className="relative ml-2 p-2 rounded-full cursor-pointer hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
                    <span className="text-xl">🔔</span>
                    {showToast && <span className="absolute top-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-red-500 dark:border-slate-900 animate-pulse"></span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-6 md:px-8 md:py-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <section className="lg:col-span-2 space-y-6">
                
                {/* Insights Row */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { ...insights[0], delay: "animate-delay-100" },
                    { ...insights[1], delay: "animate-delay-200" },
                    { ...insights[2], delay: "animate-delay-300" },
                  ].map((insight) => (
                    <div
                      key={insight.label}
                      className={`opacity-0 rounded-3xl bg-white/60 backdrop-blur-lg dark:bg-slate-800/40 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-white/10 animate-fade-in-up ${insight.delay} transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:bg-white/80 dark:hover:bg-slate-800/60 ${
                        insight.accent === "amber"
                          ? "border-l-[6px] border-l-amber-400/80 dark:border-l-amber-500/60"
                          : insight.accent === "violet"
                          ? "border-l-[6px] border-l-violet-400/80 dark:border-l-violet-500/60"
                          : "border-l-[6px] border-l-teal-400/80 dark:border-l-teal-500/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl shadow-sm ${
                            insight.accent === "amber"
                              ? "bg-amber-500/15 dark:bg-amber-500/25 text-amber-600 dark:text-amber-400"
                              : insight.accent === "violet"
                              ? "bg-violet-500/15 dark:bg-violet-500/25 text-violet-600 dark:text-violet-400"
                              : "bg-teal-500/15 dark:bg-teal-500/25 text-teal-600 dark:text-teal-400"
                          }`}
                        >
                          {insight.icon}
                        </span>
                        <TrendBadge trend={insight.trend} value={insight.trendValue} />
                      </div>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        {insight.label}
                      </p>
                      <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                        {insight.value}
                      </p>
                      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 opacity-90">
                        {insight.trendValue && insight.trend === "up" ? (
                          <>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">↑ {insight.trendValue}</span> {insight.trendLabel}
                          </>
                        ) : insight.trendLabel ? (
                          insight.trendLabel
                        ) : (
                          insight.description
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Multilingual & Live Orders */}
                <div className="grid lg:grid-cols-2 gap-6">
                  
                  {/* Multilingual Translation Card Demo */}
                  <section className="animate-fade-in-up animate-delay-200 h-full">
                     <div className="rounded-3xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100/50 dark:border-indigo-500/20 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-lg h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>🌍</span> Multilingual Orders
                            <span className="inline-flex rounded bg-indigo-100 dark:bg-indigo-900/50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">✨ AI Translated</span>
                          </h2>
                          {translationState === "idle" && (
                            <button onClick={handleInterceptTranslation} className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-2.5 py-1.5 shadow-sm transition-colors cursor-pointer">
                              Intercept & Analyze
                            </button>
                          )}
                        </div>
                        
                        <div className="space-y-3 flex-1">
                          <div className={`bg-white/80 dark:bg-slate-800/80 rounded-2xl p-4 border border-indigo-50 dark:border-slate-700 shadow-sm transition-all duration-500 ${translationState !== "idle" ? "opacity-100" : "opacity-30 blur-[2px]"}`}>
                             <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Incoming Webhook (Marathi)</p>
                             <p className="text-sm font-medium text-slate-800 dark:text-slate-200">"मला दोन पिझ्झा हवेत आणि एक कोक"</p>
                             
                             <div className="flex justify-center my-2 text-indigo-300 dark:text-indigo-700 relative h-6">
                               {translationState === "processing" ? (
                                 <span className="absolute inset-x-0 mx-auto text-[10px] font-bold text-indigo-500 animate-pulse bg-indigo-50 dark:bg-indigo-900/30 rounded-full px-2 py-0.5 flex items-center justify-center gap-1 w-[120px]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping"></span> Processing NLP
                                 </span>
                               ) : (
                                 <span className="transition-opacity duration-300">↓</span>
                               )}
                             </div>
                             
                             <div className={`transition-all duration-500 ${translationState === "complete" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                               <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Translated Intent</p>
                               <div className="flex items-center justify-between">
                                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">"I want 2 pizzas and 1 coke"</p>
                                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800/50">Confidence: 99%</span>
                               </div>
                               
                               <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2">
                                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs px-2 py-1 rounded-md font-bold border border-emerald-200 dark:border-emerald-800">🍕 Pizza ×2</span>
                                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs px-2 py-1 rounded-md font-bold border border-emerald-200 dark:border-emerald-800">🥤 Coke ×1</span>
                               </div>
                             </div>
                          </div>
                        </div>
                     </div>
                  </section>

                  {/* Live Orders Component */}
                  <section className="animate-fade-in-up animate-delay-200 space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 flex items-center gap-2">
                          Live Orders
                        </h2>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      {ordersList.slice(0, 3).map((order) => {
                        const confidence = order.id % 2 === 0 ? "98%" : "94%";
                        const confBg = order.id % 2 === 0 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
                        
                        return (
                        <div key={order.id} className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-lg dark:bg-slate-800/40 border border-white/50 dark:border-white/10 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-slate-800/60 dark:hover:border-teal-500/30 animate-fade-in-up">
                          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100/80 to-slate-200/80 dark:from-slate-700/50 dark:to-slate-800/50 text-slate-600 dark:text-slate-300 font-mono text-sm font-bold shadow-inner border border-white/60 dark:border-white/5 group-hover:scale-105 transition-transform duration-300">
                                #{order.id.toString().slice(-3)}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                 <p className="font-bold text-slate-900 dark:text-white truncate text-base group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
                                   {order.items}
                                 </p>
                                 <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                                   <span className="font-medium text-slate-700 dark:text-slate-300 truncate">{order.customer}</span>
                                   <span className="opacity-50">•</span>
                                   <span className={`inline-flex px-1.5 py-0.5 rounded font-bold ${confBg}`}>✨ AI Conf: {confidence}</span>
                                 </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )})}
                    </div>
                  </section>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <section className="animate-fade-in-up animate-delay-300 space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                          Top Customers
                        </h2>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      {customers.slice(0,2).map((customer) => (
                        <div key={customer.phone} className="group relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-lg dark:bg-slate-800/40 border border-white/50 dark:border-white/10 p-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-slate-800/60 dark:hover:border-white/20">
                           <div className="relative flex flex-col gap-3">
                             <div className="flex items-start justify-between">
                               <div className="flex items-center gap-3">
                                 <div className="relative group-hover:scale-105 transition-transform duration-300">
                                   <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${customer.name.replace(' ','')}&backgroundColor=0d9488`} alt={customer.name} className="relative w-10 h-10 rounded-full border-2 border-white/80 dark:border-white/10 object-cover shadow-sm bg-teal-600" />
                                 </div>
                                 <div>
                                   <h3 className="font-bold text-sm text-slate-900 dark:text-white">{customer.name}</h3>
                                   <p className="text-[10px] text-slate-500 font-mono mt-0.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{customer.phone}</p>
                                 </div>
                               </div>
                               <div className="text-right">
                                  <span className="text-lg font-black text-teal-600 dark:text-teal-400">{customer.totalOrders}</span>
                                  <p className="text-[9px] text-slate-500 uppercase font-bold">Orders</p>
                               </div>
                             </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* AI Live Activity Feed Demo */}
                  <section className="animate-fade-in-up animate-delay-400 space-y-4">
                      <div className="flex items-center justify-between px-1">
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 flex items-center gap-2">
                           <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          Live AI Activity
                        </h2>
                      </div>
                      
                      <div className="rounded-3xl bg-slate-900 dark:bg-slate-950 border border-slate-800 p-4 shadow-xl overflow-hidden relative">
                         <div className="absolute inset-0 bg-grid-slate-800/[0.2] bg-[size:16px_16px]"></div>
                         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
                         
                         <div className="relative space-y-4 font-mono text-[11px] h-[190px] overflow-hidden">
                            <div className="flex gap-3 text-slate-300 animate-slide-up">
                               <span className="text-slate-500 shrink-0">10:48:12</span>
                               <span className="text-emerald-400 shrink-0">▶ Intent Parsed</span>
                               <span className="truncate">"Order Pizza x2" detected from David Kim</span>
                            </div>
                            <div className="flex gap-3 text-slate-300 animate-slide-up animate-delay-100">
                               <span className="text-slate-500 shrink-0">10:48:11</span>
                               <span className="text-indigo-400 shrink-0">▶ Auto-Translate</span>
                               <span className="truncate">Translated Marathi → English (Customer: Aisha)</span>
                            </div>
                            <div className="flex gap-3 text-slate-300 animate-slide-up animate-delay-200">
                               <span className="text-slate-500 shrink-0">10:42:05</span>
                               <span className="text-amber-400 shrink-0">▶ Insights Gen</span>
                               <span className="truncate">Generated "Weekend Pizza" campaign</span>
                            </div>
                            <div className="flex gap-3 text-slate-300 animate-slide-up animate-delay-300">
                               <span className="text-slate-500 shrink-0">10:30:11</span>
                               <span className="text-blue-400 shrink-0">▶ Audio Process</span>
                               <span className="truncate">Transcribed voice note (Success: 99%)</span>
                            </div>
                            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-900 dark:from-slate-950 to-transparent"></div>
                         </div>
                      </div>
                  </section>
                </div>

              </section>

              <section className="space-y-4">
                <div className="opacity-0 rounded-[28px] border border-white/60 bg-gradient-to-br from-teal-500/10 via-white/40 to-emerald-500/5 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-in-up animate-delay-400 dark:border-white/10 dark:from-teal-500/10 dark:via-slate-800/40 dark:to-emerald-500/5 dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 ease-out hover:shadow-xl hover:shadow-teal-500/15 dark:hover:shadow-teal-900/30">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-lg animate-float" aria-hidden>✨</span> AI Suggestions
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 opacity-90">
                    Data-backed ideas you can apply in one click.
                  </p>
                  <div className="mt-4 space-y-3">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.title}
                        className="rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md dark:bg-slate-900/40 dark:border-white/10 p-4 transition-all duration-300 ease-out hover:border-teal-300/50 dark:hover:border-teal-500/50 hover:shadow-lg hover:-translate-y-0.5 hover:bg-white/80 dark:hover:bg-slate-900/60"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {suggestion.title}
                          </p>
                          <span className="rounded-full bg-teal-500/15 px-2.5 py-0.5 text-[11px] font-bold text-teal-700 ring-1 ring-teal-500/25 dark:bg-teal-500/25 dark:text-teal-300 dark:ring-teal-400/30">
                            {suggestion.type}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed opacity-95">
                          {suggestion.description}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <button 
                            onClick={() => setCampaignPreview(suggestion)}
                            className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-teal-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"
                          >
                            Apply suggestion →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Voice Demo Modal */}
      {activeVoicemail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in p-4">
           <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transform transition-all">
              <div className="p-6 text-center space-y-6">
                 <div className="flex justify-center">
                    <div className={`h-24 w-24 rounded-full flex items-center justify-center ${isListening ? 'bg-teal-500/20 animate-pulse' : 'bg-emerald-500/20'}`}>
                       <span className={`text-4xl ${isListening ? 'animate-bounce' : ''}`}>🎤</span>
                    </div>
                 </div>
                 
                 {isListening ? (
                   <div className="space-y-2">
                     <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-600">Listening to WhatsApp Audio...</h3>
                     <p className="text-slate-500 dark:text-slate-400 italic">"Bhaiya 2 paneer rolls bhejna..."</p>
                     
                     <div className="flex justify-center gap-1 mt-4">
                       {[1,2,3,4,5].map(i => (
                         <div key={i} className="w-1.5 h-6 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                       ))}
                     </div>
                   </div>
                 ) : voiceDetected ? (
                   <div className="space-y-4 animate-fade-in-up">
                     <div className="inline-flex rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                       ✨ Order Detected Successfully
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 text-left border border-slate-100 dark:border-slate-700">
                        <p className="text-xs text-slate-500 font-bold uppercase mb-2">Extracted Info</p>
                        <p className="font-bold text-slate-900 dark:text-white text-lg">Paneer Roll ×2</p>
                        <p className="text-xs text-slate-500 mt-1">Intent Confidence: <span className="text-emerald-500 font-bold">98.5%</span></p>
                     </div>
                     <button onClick={() => setActiveVoicemail(false)} className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl py-3 font-bold hover:scale-[1.02] transition-transform">Add to Orders</button>
                   </div>
                 ) : null}
              </div>
           </div>
        </div>
      )}

      {/* Campaign Preview Modal */}
      {campaignPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in p-4">
           <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
             <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-6 py-4 flex justify-between items-center text-white">
                <h3 className="font-bold">✨ Campaign Preview</h3>
                <button onClick={() => setCampaignPreview(null)} className="opacity-80 hover:opacity-100 font-bold">✕</button>
             </div>
             <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Target Audience</p>
                  <p className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg inline-block">👥 32 Repeat Customers</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">AI Generated Message</p>
                  <div className="bg-[#e6f4f1] dark:bg-[#e6f4f1]/10 rounded-2xl rounded-tl-none p-4 text-slate-800 dark:text-slate-200 border border-teal-100 dark:border-teal-900/50 shadow-sm relative">
                    <p className="whitespace-pre-line">
                      Hi Sarah! 🍕{"\n"}
                      Special Weekend Offer just for you:{"\n"}
                      *Buy 1 Pizza, Get 10% Off!*{"\n\n"}
                      Reply with "ORDER" to claim.
                    </p>
                    <span className="absolute bottom-2 right-2 text-[10px] text-teal-600/50 font-bold">✨ AI Generated</span>
                  </div>
                </div>
                
                <button onClick={() => setCampaignPreview(null)} className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all text-sm">
                  🚀 Send Campaign via WhatsApp
                </button>
             </div>
           </div>
        </div>
      )}

      {/* Conversation Viewer Modal */}
      {conversationView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in p-4">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row h-[500px]">
             
             <div className="w-full md:w-3/5 bg-[#efeae2] dark:bg-slate-950 flex flex-col h-full border-r border-slate-200 dark:border-slate-800 relative">
               <div className="bg-slate-100 dark:bg-slate-900 p-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=MichaelLee" alt="Avatar" className="w-10 h-10 rounded-full bg-white" />
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Michael Lee</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">● Online</p>
                  </div>
               </div>
               
               <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                 <div className="flex flex-col gap-1 items-start">
                   <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 max-w-[85%]">
                     Do you have burgers?
                   </div>
                   <span className="text-[10px] text-slate-500 px-1">10:42 AM</span>
                 </div>
                 
                 <div className="flex flex-col gap-1 items-end">
                   <div className="bg-[#dcf8c6] dark:bg-[#128c7e]/80 p-3 rounded-2xl rounded-tr-none text-sm text-slate-900 dark:text-white shadow-sm max-w-[85%]">
                     Yes Michael! We have Classic, Cheese, and Veg burgers. What would you like? 🍔
                   </div>
                   <span className="text-[10px] text-slate-500 px-1">10:43 AM <span className="text-blue-500">✓✓</span></span>
                 </div>
                 
                 <div className="flex flex-col gap-1 items-start">
                   <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 max-w-[85%]">
                     2 burgers please with cheese.
                   </div>
                   <span className="text-[10px] text-slate-500 px-1">10:44 AM</span>
                 </div>
               </div>
             </div>
             
             <div className="w-full md:w-2/5 bg-white dark:bg-slate-900 p-5 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900 dark:text-white">🧠 AI Assistant</h3>
                  <button onClick={() => setConversationView(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">✕</button>
                </div>
                
                <div className="flex-1 space-y-4">
                   <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                     <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Detected Intent</p>
                     <p className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">NEW_ORDER_REQUEST</p>
                   </div>
                   
                   <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                     <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Entity Extraction</p>
                     <ul className="space-y-2 text-sm">
                       <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                         <span className="text-slate-600 dark:text-slate-400">Item</span>
                         <span className="font-bold text-slate-900 dark:text-white">Burger</span>
                       </li>
                       <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                         <span className="text-slate-600 dark:text-slate-400">Quantity</span>
                         <span className="font-bold text-slate-900 dark:text-white">2</span>
                       </li>
                       <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                         <span className="text-slate-600 dark:text-slate-400">Add-ons</span>
                         <span className="font-bold text-slate-900 dark:text-white">Cheese</span>
                       </li>
                     </ul>
                   </div>
                </div>
                
                <button onClick={() => setConversationView(false)} className="mt-4 w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl py-3 font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg">Confirm & Create Order</button>
             </div>
           </div>
        </div>
      )}

      {/* Success Webhook Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
           <div className="bg-slate-900 dark:bg-slate-800 text-white shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-3 border border-slate-700">
             <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 relative">
               <span className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ping"></span>
               ✓
             </div>
             <div>
               <p className="text-sm font-bold">New Webhook Received</p>
               <p className="text-[11px] text-slate-400">Order intercepted & processed by AI in 143ms</p>
             </div>
           </div>
        </div>
      )}

    </div>
  );
}

export default App;
