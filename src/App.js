import { useState, useEffect } from "react";

const orders = [
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
    <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-slate-200 bg-white shadow-xl shadow-slate-200/30 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none transition-colors duration-300">
      <div className="flex items-center gap-3 px-5 pt-6 pb-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-base font-bold shadow-lg shadow-teal-500/25 dark:shadow-teal-500/20">
          AI
        </div>
        <div className="animate-fade-in min-w-0">
          <p className="text-sm font-bold text-slate-900 tracking-tight dark:text-slate-100 truncate">
            WhatsApp Assistant
          </p>
          <p className="text-xs text-slate-600 mt-0.5 dark:text-slate-400">For Small Businesses</p>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-3">
        <NavItem label="Dashboard" icon={NavIcons.Dashboard} active />
        <NavItem label="Orders" icon={NavIcons.Orders} badge="12" />
        <NavItem label="Customers" icon={NavIcons.Customers} />
        <NavItem label="Insights" icon={NavIcons.Insights} />
      </nav>
      <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">
        <p className="text-xs font-medium text-slate-600 flex items-center gap-2 dark:text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Connected to WhatsApp Business
        </p>
      </div>
    </aside>
  );
}

function NavItem({ label, icon, active = false, badge }) {
  return (
    <button
      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-out border-l-4 -ml-px pl-[13px] ${
        active
          ? "bg-gradient-to-r from-teal-500/10 to-emerald-500/10 text-teal-700 dark:text-teal-300 border-teal-500 dark:border-teal-400 shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      }`}
    >
      <span className="flex items-center gap-3 min-w-0">
        {icon}
        <span className="truncate">{label}</span>
      </span>
      {badge && (
        <span className="rounded-full bg-slate-200/90 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300 shrink-0">
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1">
          <div className="relative overflow-hidden border-b border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="absolute inset-0 opacity-20 dark:opacity-[0.06]" aria-hidden>
              <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover scale-105 transition-transform duration-700 hover:scale-110" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/90 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/95" />
            <div className="relative flex flex-col gap-5 px-4 py-6 md:px-8 md:py-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="animate-fade-in-up">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                    AI WhatsApp Business Assistant
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-500 max-w-xl">
                    Track WhatsApp orders, understand your customers, and act on
                    AI-powered suggestions.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 animate-fade-in-up animate-delay-100">
                  <button
                    type="button"
                    onClick={() => setDark((d) => !d)}
                    className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm transition-all duration-300 hover:scale-105 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                    title={dark ? "Switch to light mode" : "Switch to dark mode"}
                    aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {dark ? <span className="text-lg">☀️</span> : <span className="text-lg">🌙</span>}
                  </button>
                  <button className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:bg-slate-50 hover:shadow dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    View Conversations
                  </button>
                  <button className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/30">
                    New Broadcast
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-6 md:px-8 md:py-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <section className="lg:col-span-2 space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { ...insights[0], delay: "animate-delay-100" },
                    { ...insights[1], delay: "animate-delay-200" },
                    { ...insights[2], delay: "animate-delay-300" },
                  ].map((insight) => (
                    <div
                      key={insight.label}
                      className={`opacity-0 rounded-[14px] border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/40 dark:border-slate-700/80 dark:shadow-slate-950/40 animate-fade-in-up ${insight.delay} transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 ${
                        insight.accent === "amber"
                          ? "bg-gradient-to-br from-amber-500/5 to-orange-500/10 dark:from-amber-500/10 dark:to-slate-800/90 border-l-4 border-l-amber-400 dark:border-l-amber-500/80"
                          : insight.accent === "violet"
                          ? "bg-gradient-to-br from-violet-500/5 to-purple-500/10 dark:from-violet-500/10 dark:to-slate-800/90 border-l-4 border-l-violet-400 dark:border-l-violet-500/80"
                          : "bg-gradient-to-br from-teal-500/5 to-emerald-500/10 dark:from-teal-500/10 dark:to-slate-800/90 border-l-4 border-l-teal-400 dark:border-l-teal-500/80"
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
                          aria-hidden
                        >
                          {insight.icon}
                        </span>
                        <TrendBadge trend={insight.trend} value={insight.trendValue} />
                      </div>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                        {insight.label}
                      </p>
                      <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                        {insight.value}
                      </p>
                      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-500 opacity-90">
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
                      <div className="mt-3 flex items-center justify-end">
                        <Sparkline data={insight.sparkline} color={insight.accent} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <section className="opacity-0 rounded-[14px] border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/40 animate-fade-in-up animate-delay-200 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-800/60 dark:shadow-slate-950/40 dark:hover:shadow-slate-950/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          Orders from WhatsApp
                        </h2>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500 opacity-90">
                          Detected orders from your latest WhatsApp conversations.
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 transition-all duration-300 ease-out hover:bg-slate-100/80 hover:border-slate-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600/80 dark:bg-slate-700/40 dark:hover:bg-slate-700/60 dark:hover:border-slate-600"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                              Order #{order.id}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                              {order.items}
                            </p>
                            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                              {order.customer} • {order.time}
                            </p>
                          </div>
                          <StatusBadge status={order.status} />
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="opacity-0 rounded-[14px] border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/40 animate-fade-in-up animate-delay-300 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-800/60 dark:shadow-slate-950/40 dark:hover:shadow-slate-950/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          Customer Profiles
                        </h2>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500 opacity-90">
                          AI-enriched profiles from WhatsApp conversations.
                        </p>
                      </div>
                      <button className="rounded-xl px-2.5 py-1 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-all duration-300 dark:text-teal-400 dark:hover:text-teal-300">
                        View all →
                      </button>
                    </div>
                    <div className="mt-4 space-y-3">
                      {customers.map((customer) => (
                        <div
                          key={customer.phone}
                          className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 transition-all duration-300 ease-out hover:bg-slate-100/80 hover:border-slate-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600/80 dark:bg-slate-700/40 dark:hover:bg-slate-700/60 dark:hover:border-slate-600"
                        >
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                              {customer.name}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                              {customer.phone}
                            </p>
                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                              Total orders:{' '}
                              <span className="font-bold">
                                {customer.totalOrders}
                              </span>
                            </p>
                            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-500">
                              Favorite: {customer.favorite}
                            </p>
                          </div>
                          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-600 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-600/80 dark:text-slate-200 dark:ring-slate-500/50">
                            Repeat
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </section>

              <section className="space-y-4">
                <div className="opacity-0 rounded-[14px] border border-teal-500/30 bg-gradient-to-br from-teal-500/5 via-white to-emerald-500/5 p-5 shadow-lg shadow-teal-500/10 animate-fade-in-up animate-delay-400 dark:border-teal-400/25 dark:from-teal-500/10 dark:via-slate-800/80 dark:to-emerald-500/10 dark:shadow-teal-500/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-500/15 dark:hover:shadow-teal-500/20">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-lg animate-float" aria-hidden>✨</span> AI Suggestions
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-500 opacity-90">
                    Data-backed ideas you can apply in one click.
                  </p>
                  <div className="mt-4 space-y-3">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.title}
                        className="rounded-xl border border-slate-200/80 bg-white/80 dark:bg-slate-700/40 dark:border-slate-600/80 p-4 transition-all duration-300 ease-out hover:border-teal-300 dark:hover:border-teal-500/50 hover:shadow-md hover:-translate-y-0.5"
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
                          <span className="text-[11px] font-semibold text-amber-700 bg-amber-500/15 px-2 py-0.5 rounded-md dark:text-amber-300 dark:bg-amber-500/20">
                            {suggestion.impact}
                          </span>
                          <button className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-teal-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5">
                            Apply suggestion →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="opacity-0 rounded-[14px] border-2 border-dashed border-teal-300/60 dark:border-teal-600/50 bg-gradient-to-br from-teal-50/80 to-emerald-50/60 dark:from-teal-900/30 dark:to-emerald-900/30 p-0 text-xs text-teal-900 dark:text-teal-100 shadow-sm overflow-hidden animate-fade-in-up animate-delay-500">
                  <div className="relative h-28 w-full overflow-hidden">
                    <img src={TIP_IMAGE} alt="" className="h-full w-full object-cover opacity-80 dark:opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 via-transparent to-transparent" />
                    <p className="absolute bottom-3 left-4 right-4 font-bold flex items-center gap-2 text-white drop-shadow">
                      <span className="text-base">💡</span> Tip for SMEs
                    </p>
                  </div>
                  <p className="p-4 pt-3 leading-relaxed text-slate-700 dark:text-slate-300">
                    Connect your WhatsApp Business number to automatically
                    detect orders, update statuses, and keep your customer
                    profiles in sync.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
