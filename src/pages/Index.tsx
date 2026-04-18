import { useEffect, useState } from "react";
import { Star, Zap, ShieldCheck, Headphones, RefreshCcw, ChevronDown, MessageCircle, Send, Instagram } from "lucide-react";
import Blobs from "@/components/kredcc/Blobs";
import Reveal from "@/components/kredcc/Reveal";
import Counter from "@/components/kredcc/Counter";
import VerifyPanel from "@/components/kredcc/VerifyPanel";
import PlanCard from "@/components/kredcc/PlanCard";
import LiveVisitors from "@/components/kredcc/LiveVisitors";
import RecentOrders from "@/components/kredcc/RecentOrders";
import { GAME_DATA, GameKey, IMAGES, REVIEWS, TABS } from "@/lib/games";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "How long does delivery take?", a: "Instant delivery within 1-2 minutes after payment confirmation." },
  { q: "Is it safe to share my game ID?", a: "Yes, we only need your ID to send items. We never ask for your password." },
  { q: "What is your refund policy?", a: "Full refund processed instantly if order is not delivered within 30 minutes." },
];

const Index = () => {
  const [active, setActive] = useState<GameKey>("weplay");
  const [verified, setVerified] = useState<Record<GameKey, boolean>>({
    weplay: false, jackaroo: false, bgmi: false, freefire: false,
  });

  useEffect(() => {
    document.title = "KredCC — India's Fastest Gaming Top-Up | WePlay, BGMI, Free Fire";
  }, []);

  const data = GAME_DATA[active];
  const isVerified = verified[active];

  return (
    <div className="relative min-h-screen">
      <Blobs />
      <LiveVisitors />
      <RecentOrders />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full">
        <div className="container py-4">
          <div className="glass-strong rounded-full px-5 py-2.5 flex items-center justify-between shadow-card hover:shadow-glow transition-all duration-500">
            <a href="#top" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 gradient-bg rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                <img src={IMAGES.logo} alt="KredCC logo" className="relative w-9 h-9 rounded-xl object-cover" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">Kred<span className="gradient-text">CC</span></span>
            </a>
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              <a href="#games" className="hover:text-primary transition story-link">Games</a>
              <a href="#trust" className="hover:text-primary transition story-link">Why Us</a>
              <a href="#reviews" className="hover:text-primary transition story-link">Reviews</a>
              <a href="#faq" className="hover:text-primary transition story-link">FAQ</a>
            </nav>
            <a href="#games" className="btn-gradient ripple text-sm font-semibold px-5 py-2.5">Top-Up Now</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="container pt-10 pb-12 md:pt-16 md:pb-20 text-center relative">
        <div className="animate-hero-in">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold mb-6 hover:scale-105 transition">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            India's Fastest Gaming Top-Up · Live Now
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance">
            Premium Top-Ups for <br className="hidden md:block" />
            <span className="gradient-text inline-block">Every Gamer.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Instant delivery for WePlay, Jackaroo King, BGMI & Free Fire — at the lowest prices in India.
            Verified, secure and trusted by 50,000+ players.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#games" className="btn-gradient ripple font-semibold px-7 py-3.5">⚡ Start Top-Up</a>
            <a href="#reviews" className="glass-strong rounded-full font-semibold px-7 py-3.5 hover:scale-105 hover:shadow-glow transition-all duration-300">⭐ See Reviews</a>
          </div>

          {/* Trust badges row */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Instant Delivery</div>
            <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />
            <div className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> 100% Secure Payment</div>
            <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />
            <div className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> 24/7 Live Support</div>
            <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />
            <div className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Lowest Prices Guaranteed</div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="container pb-16">
        {/* Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center scrollbar-none">
          {TABS.map((t, i) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                style={{ animationDelay: `${i * 80}ms` }}
                className={`animate-slide-up shrink-0 flex items-center gap-3 px-5 py-3 rounded-full font-semibold text-sm transition-all ripple ${
                  isActive
                    ? "btn-gradient shadow-glow scale-105"
                    : "glass hover:scale-105"
                }`}
              >
                <img src={t.logo} alt={t.name} className="w-7 h-7 rounded-lg object-cover" />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Verify */}
        <div id="verify" className="mt-8 max-w-2xl mx-auto">
          <VerifyPanel
            key={active}
            game={active}
            verified={isVerified}
            onVerify={() => setVerified((v) => ({ ...v, [active]: true }))}
          />
        </div>

        {/* Plan Sections */}
        <div className="mt-12 space-y-14">
          {data.sections.map((section) => (
            <div key={section.title}>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1.5 h-8 rounded-full gradient-bg" />
                  <h2 className="text-2xl md:text-3xl font-extrabold">{section.title}</h2>
                </div>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.plans.map((p, i) => (
                  <PlanCard key={p.title} plan={p} image={section.image} verified={isVerified} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="container py-16">
        <Reveal>
          <h2 className="text-center text-3xl md:text-4xl font-extrabold">
            Trusted by <span className="gradient-text">India's Gamers</span>
          </h2>
          <p className="text-center text-muted-foreground mt-3">Real numbers, real trust.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {[
            { icon: <Zap className="w-6 h-6" />, value: 50000, suffix: "+", label: "Happy Customers" },
            { icon: <ShieldCheck className="w-6 h-6" />, value: 100000, suffix: "+", label: "Orders Completed" },
            { icon: <RefreshCcw className="w-6 h-6" />, value: 100, suffix: "%", label: "Instant Refund" },
            { icon: <Headphones className="w-6 h-6" />, value: 24, suffix: "/7", label: "Live Support" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="glass-strong rounded-[28px] p-6 text-center hover:scale-[1.03] transition shadow-card">
                <div className="w-12 h-12 mx-auto rounded-2xl gradient-bg grid place-items-center text-primary-foreground shadow-glow">
                  {s.icon}
                </div>
                <p className="mt-4 text-3xl md:text-4xl font-extrabold gradient-text">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="container py-16">
        <Reveal>
          <h2 className="text-center text-3xl md:text-4xl font-extrabold">
            What players are <span className="gradient-text">saying</span>
          </h2>
        </Reveal>
        <div className="mt-10 flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 60}>
              <div className="glass-strong rounded-[28px] p-6 min-w-[280px] md:min-w-0 snap-start hover:scale-[1.02] transition shadow-card h-full">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${r.color} grid place-items-center text-white font-bold text-lg shadow-soft`}>
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{r.name}</p>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      ✓ Verified Buyer
                    </span>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">"{r.text}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-16 max-w-3xl">
        <Reveal>
          <h2 className="text-center text-3xl md:text-4xl font-extrabold">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="glass-strong rounded-[28px] p-2 md:p-4 mt-10 shadow-card">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border last:border-0">
                  <AccordionTrigger className="text-left font-semibold text-base px-4 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4 pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="container py-12">
        <div className="glass-strong rounded-[28px] p-8 md:p-10 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={IMAGES.logo} alt="KredCC" className="w-10 h-10 rounded-xl" />
              <div>
                <p className="font-extrabold text-lg">Kred<span className="gradient-text">CC</span></p>
                <p className="text-xs text-muted-foreground">India's Fastest Gaming Top-Up</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
              <a href="#" className="hover:text-primary transition">Terms & Conditions</a>
              <a href="#" className="hover:text-primary transition">Refund Policy</a>
              <a href="#" className="hover:text-primary transition">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition">About Us</a>
              <a href="#" className="hover:text-primary transition">Contact</a>
            </nav>
            <div className="flex gap-3">
              {[
                { Icon: MessageCircle, label: "Discord" },
                { Icon: Send, label: "Telegram" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-10 h-10 rounded-full glass grid place-items-center hover:gradient-bg hover:text-primary-foreground transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground text-center space-y-1">
            <p>© 2025 KredCC — India's Fastest Gaming Top-Up. All rights reserved.</p>
            <p>Disclaimer: KredCC is an independent service and is not affiliated with, endorsed by, or sponsored by any game publisher.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
