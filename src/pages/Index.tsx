import { useEffect, useMemo, useState } from "react";
import { Star, Zap, ShieldCheck, Headphones, RefreshCcw, ChevronDown, Mail, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Blobs from "@/components/kredcc/Blobs";
import Reveal from "@/components/kredcc/Reveal";
import Counter from "@/components/kredcc/Counter";
import VerifyPanel from "@/components/kredcc/VerifyPanel";
import PlanCard from "@/components/kredcc/PlanCard";
import LiveVisitors from "@/components/kredcc/LiveVisitors";
import RecentOrders from "@/components/kredcc/RecentOrders";
import FlashSale from "@/components/kredcc/FlashSale";
import ProofSection from "@/components/kredcc/ProofSection";
import OrderTracker from "@/components/kredcc/OrderTracker";
import ProfileMenu from "@/components/kredcc/ProfileMenu";
import VerifyOverlay from "@/components/kredcc/VerifyOverlay";
import { GAME_DATA, GameKey, IMAGES, REVIEWS, TABS } from "@/lib/games";
import { clearSession, loadSession, saveSession, SessionState, touchSession } from "@/lib/session";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "How long does delivery take?", a: "Instant delivery within 1-2 minutes after payment confirmation." },
  { q: "Is it safe to share my game ID?", a: "Yes, we only need your ID to send items. We never ask for your password." },
  { q: "What is your refund policy?", a: "Full refund processed instantly if order is not delivered within 30 minutes." },
];

const Index = () => {
  const [active, setActive] = useState<GameKey>("weplay");
  const [session, setSession] = useState<SessionState>(() => touchSession(loadSession()));
  const [showOverlay, setShowOverlay] = useState(() => Object.keys(loadSession()).length === 0);

  useEffect(() => {
    document.title = "KredCC — India's Fastest Gaming Top-Up | WePlay, BGMI, Free Fire";
  }, []);

  const handleVerify = (game: GameKey, info: { id: string; name?: string }) => {
    setSession((s) => {
      const next: SessionState = { ...s, [game]: { ...info, lastSeen: Date.now() } };
      saveSession(next);
      return next;
    });
    setActive(game);
    setShowOverlay(false);
  };

  const logout = () => {
    clearSession();
    setSession({});
    setShowOverlay(true);
  };

  const data = GAME_DATA[active];
  const account = session[active];
  const isVerified = Boolean(account);
  const activeInfo = useMemo(
    () => (account ? { id: account.id, name: account.name } : { id: "" }),
    [account?.id, account?.name]
  );
  const loggedIn = Object.keys(session).length > 0;


  return (
    <div className="relative min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:btn-gradient focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>
      <Blobs />
      <LiveVisitors />
      <RecentOrders />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full">
        <div className="container py-3 md:py-4 px-3 sm:px-4">
          <div className="glass-strong rounded-full pl-3 pr-2 py-2 md:px-5 md:py-2.5 flex items-center justify-between gap-2 shadow-card hover:shadow-glow transition-all duration-500">
            <a href="#top" className="flex items-center gap-2 md:gap-2.5 group min-w-0" aria-label="KredCC home">
              <div className="relative shrink-0">
                <div className="absolute inset-0 gradient-bg rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                <img src={IMAGES.logo} alt="" aria-hidden="true" className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl object-cover" />
              </div>
              <span className="font-extrabold text-base md:text-lg tracking-tight truncate">Kred<span className="gradient-text">CC</span></span>
            </a>
            <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm font-medium">
              <a href="#games" className="hover:text-primary transition story-link">Games</a>
              <a href="#trust" className="hover:text-primary transition story-link">Why Us</a>
              <a href="#reviews" className="hover:text-primary transition story-link">Reviews</a>
              <a href="#faq" className="hover:text-primary transition story-link">FAQ</a>
            </nav>
            <a href="#games" className="btn-gradient ripple text-xs md:text-sm font-semibold px-3.5 py-2 md:px-5 md:py-2.5 shrink-0 whitespace-nowrap min-h-11 inline-flex items-center">Top-Up</a>
          </div>
        </div>
      </header>

      <main id="main">


      {/* Flash Sale Bar */}
      <FlashSale />

      {/* Hero */}
      <section id="top" className="container pt-8 pb-10 md:pt-16 md:pb-20 text-center relative">
        <div className="animate-hero-in">
          <div className="inline-flex items-center gap-2 glass-strong px-3 py-1.5 md:px-4 rounded-full text-[11px] md:text-xs font-semibold mb-5 md:mb-6 hover:scale-105 transition shine-overlay animate-glow-pulse-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>India's Fastest Gaming Top-Up · Live Now</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] md:leading-[1.05] text-balance">
            Premium Top-Ups for <br className="hidden md:block" />
            <span className="gradient-text inline-block sparkle-bg">Every Gamer.</span>
          </h1>
          <p className="mt-4 md:mt-6 md:text-lg max-w-2xl mx-auto text-balance px-2 text-foreground/80">
            Instant delivery for WePlay, Jackaroo King, BGMI & Free Fire — at the lowest prices in India.
            Verified, secure and trusted by 50,000+ players.
          </p>

          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2.5 md:gap-3">
            <a href="#games" className="btn-gradient ripple shine-overlay font-semibold px-5 py-3 md:px-7 md:py-3.5 text-sm md:text-base min-h-11 inline-flex items-center">⚡ Start Top-Up</a>
            <a href="#reviews" className="glass-strong rounded-full font-semibold px-5 py-3 md:px-7 md:py-3.5 text-sm md:text-base hover:scale-105 hover:shadow-glow transition-all duration-300 min-h-11 inline-flex items-center">⭐ See Reviews</a>

          </div>

          {/* Premium trust row */}
          <div className="mt-7 md:mt-9 flex flex-wrap justify-center items-center gap-2 md:gap-3">
            {[
              { icon: "🏆", label: "Trusted Since 2022" },
              { icon: "🔒", label: "256-bit Secured" },
              { icon: "⚡", label: "1-Min Delivery" },
              { icon: "💰", label: "Lowest Prices" },
            ].map((b, i) => (
              <span key={b.label} className="trust-badge shine-overlay animate-fade-in" style={{ animationDelay: `${400 + i * 100}ms`, animationFillMode: "both" }}>
                <span>{b.icon}</span> {b.label}
              </span>
            ))}
          </div>

          {/* Trust badges row */}
          <ul className="mt-6 md:mt-8 flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4 gap-y-2 md:gap-y-3 text-[11px] md:text-xs font-semibold text-foreground/85 list-none p-0">
            {[
              "Instant Delivery",
              "100% Secure Payment",
              "24/7 Live Support",
              "Lowest Prices Guaranteed",
            ].map((label) => (
              <li key={label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-emerald-500/20 shadow-sm backdrop-blur-sm">
                <span aria-hidden="true" className="grid place-items-center w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold">✓</span>
                <span>{label}</span>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="container py-12 md:py-16">
        <Reveal>
          <div className="text-center">
            <span className="trust-badge mb-3"><span>✨</span> Proven Track Record</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3">
              Trusted by <span className="gradient-text">India's Gamers</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2 md:mt-3">Real numbers, real trust — built over years of instant service.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-6 md:mt-10">
          {[
            { icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />, value: 50000, suffix: "+", label: "Happy Customers" },
            { icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />, value: 100000, suffix: "+", label: "Orders Completed" },
            { icon: <RefreshCcw className="w-5 h-5 md:w-6 md:h-6" />, value: 100, suffix: "%", label: "Instant Refund" },
            { icon: <Headphones className="w-5 h-5 md:w-6 md:h-6" />, value: 24, suffix: "/7", label: "Live Support" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="relative premium-card rounded-[22px] md:rounded-[28px] p-4 md:p-6 text-center h-full overflow-hidden group">
                <div aria-hidden className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
                <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, hsl(var(--grad-1) / 0.08), hsl(var(--grad-3) / 0.08))" }} />
                <div className="relative w-11 h-11 md:w-14 md:h-14 mx-auto rounded-2xl gradient-bg grid place-items-center text-primary-foreground shadow-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {s.icon}
                </div>
                <p className="relative mt-3 md:mt-4 text-2xl md:text-4xl font-extrabold">
                  <Counter to={s.value} suffix={s.suffix} className="gradient-text" />
                </p>
                <p className="relative mt-1 text-[11px] md:text-sm font-semibold text-muted-foreground leading-tight">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quick Guide Video */}
      <section id="guide" className="container py-10 md:py-14">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="trust-badge mb-3"><span>🎬</span> Watch & Learn</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3">
              Quick <span className="gradient-text">Guide Video</span>
            </h2>
            <p className="text-sm md:text-base text-foreground/80 mt-2 md:mt-3">
              Watch this short walkthrough and learn how to top-up your favourite game in under a minute.
            </p>

          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-6 md:mt-10 max-w-4xl mx-auto">
            <div className="relative premium-card rounded-[22px] md:rounded-[28px] p-2 md:p-3 overflow-hidden shadow-premium">
              <div className="relative aspect-video rounded-[18px] md:rounded-[22px] overflow-hidden bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/HmUCGgfNFDg?si=a7X3UqHTo0JHV1hM"
                  title="KredCC Quick Guide Video"
                  loading="lazy"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Games Section */}
      <section id="games" className="container pb-12 md:pb-16">
        {/* Tabs */}
        <div role="tablist" aria-label="Choose game" className="flex gap-2 md:gap-3 overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center scrollbar-none snap-x snap-mandatory">
          {TABS.map((t, i) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                style={{ animationDelay: `${i * 110}ms` }}
                className={`tab-enter shrink-0 snap-start flex items-center gap-2 md:gap-3 px-3.5 py-2.5 md:px-5 md:py-3 rounded-full font-semibold text-xs md:text-sm ripple transition-all duration-500 ease-out min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "btn-gradient scale-105 tab-active-glow"
                    : "glass hover:scale-105 hover:shadow-soft"
                }`}
                role="tab"
                aria-selected={isActive}
                aria-label={`Select ${t.name}`}
              >
                <img src={t.logo} alt="" aria-hidden="true" className={`w-6 h-6 md:w-7 md:h-7 rounded-lg object-cover transition-transform duration-500 ${isActive ? "scale-110" : ""}`} />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>


        {/* Cross-fade content wrapper — keyed on active game */}
        <div key={active} className="content-crossfade">
          {/* Verify */}
          <div id="verify" className="mt-6 md:mt-8 max-w-2xl mx-auto">
            <VerifyPanel
              game={active}
              verified={isVerified}
              onVerify={(info) => {
                setVerified((v) => ({ ...v, [active]: true }));
                setVerifiedInfo((vi) => ({ ...vi, [active]: info }));
              }}
            />
          </div>

          {/* Plan Sections */}
          <div className="mt-10 md:mt-12 space-y-10 md:space-y-14">
            {data.sections.map((section) => (
              <div key={section.title}>
                <Reveal>
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className="w-1.5 h-7 md:h-8 rounded-full gradient-bg" />
                    <h2 className="text-xl md:text-3xl font-extrabold">{section.title}</h2>
                  </div>
                </Reveal>
                <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {section.plans.map((p, i) => (
                    <PlanCard key={p.title} plan={p} image={section.image} verified={isVerified} index={i} game={active} verifiedInfo={activeInfo} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="container py-12 md:py-16">
        <Reveal>
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold">
            What players are <span className="gradient-text">saying</span>
          </h2>
        </Reveal>
        <div className="mt-6 md:mt-10 flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-none">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 60}>
              <div className="premium-card rounded-[24px] md:rounded-[28px] p-5 md:p-6 w-[78vw] sm:w-[60vw] md:w-auto md:min-w-0 snap-start h-full">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 md:w-12 md:h-12 shrink-0 rounded-full bg-gradient-to-br ${r.color} grid place-items-center text-white font-bold text-lg shadow-soft`}>
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{r.name}</p>
                    <span className="inline-block text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      ✓ Verified Buyer
                    </span>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-3 md:mt-4">
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
      <section id="faq" className="container py-12 md:py-16 max-w-3xl">
        <Reveal>
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="glass-strong rounded-[24px] md:rounded-[28px] p-2 md:p-4 mt-6 md:mt-10 shadow-card">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border last:border-0">
                  <AccordionTrigger className="text-left font-semibold text-sm md:text-base px-3 md:px-4 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground px-3 md:px-4 pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </section>

      </main>

      {/* Footer */}

      <footer className="container py-10 md:py-12 pb-24 md:pb-12">
        <div className="glass-strong rounded-[24px] md:rounded-[28px] p-6 md:p-10 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-6">
            <div className="flex items-center gap-3">
              <img src={IMAGES.logo} alt="KredCC" className="w-10 h-10 rounded-xl" />
              <div>
                <p className="font-extrabold text-lg">Kred<span className="gradient-text">CC</span></p>
                <p className="text-xs text-muted-foreground">India's Fastest Gaming Top-Up</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-4 md:gap-x-5 gap-y-2 text-xs md:text-sm font-medium text-muted-foreground">
              <Link to="/terms" className="hover:text-primary transition">Terms & Conditions</Link>
              <Link to="/refund" className="hover:text-primary transition">Refund Policy</Link>
              <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
              <Link to="/about" className="hover:text-primary transition">About Us</Link>
              <Link to="/contact" className="hover:text-primary transition">Contact</Link>
            </nav>
            <div className="flex gap-3">
              {[
                { Icon: Mail, label: "Email", href: "mailto:fluxfindindia@gmail.com" },
                { Icon: Instagram, label: "Instagram", href: "https://instagram.com/lowestweplay" },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="w-10 h-10 rounded-full glass grid place-items-center hover:gradient-bg hover:text-primary-foreground transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-border text-[11px] md:text-xs text-muted-foreground text-center space-y-1">
            <p>© 2025 KredCC — India's Fastest Gaming Top-Up. All rights reserved.</p>
            <p>Disclaimer: KredCC is an independent service and is not affiliated with, endorsed by, or sponsored by any game publisher.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
