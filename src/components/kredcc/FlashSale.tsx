import { useEffect, useMemo, useState } from "react";
import { Flame, Zap } from "lucide-react";

const TOTAL_PACKS = 500;
const STORAGE_KEY = "kredcc_flash_sale";

type SaleState = {
  endsAt: number;
  sold: number;
  startSold: number;
};

const randomDuration = () => {
  // 2 to 5 hours in ms
  return (2 * 60 * 60 * 1000) + Math.floor(Math.random() * (3 * 60 * 60 * 1000));
};

const initState = (): SaleState => {
  const startSold = 280 + Math.floor(Math.random() * 80); // 280–360
  return {
    endsAt: Date.now() + randomDuration(),
    sold: startSold,
    startSold,
  };
};

const loadState = (): SaleState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as SaleState;
      if (parsed.endsAt > Date.now()) return parsed;
    }
  } catch {}
  const fresh = initState();
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh)); } catch {}
  return fresh;
};

const pad = (n: number) => n.toString().padStart(2, "0");

const FlashSale = () => {
  const [state, setState] = useState<SaleState>(loadState);
  const [now, setNow] = useState(Date.now());

  // Tick countdown every second
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Reset when timer hits zero
  useEffect(() => {
    if (state.endsAt - now <= 0) {
      const fresh = initState();
      setState(fresh);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh)); } catch {}
    }
  }, [now, state.endsAt]);

  // Slowly increment sold count for FOMO (every 12-25s)
  useEffect(() => {
    const tick = () => {
      setState((s) => {
        if (s.sold >= TOTAL_PACKS - 8) return s;
        const next = { ...s, sold: s.sold + 1 };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
        return next;
      });
    };
    const schedule = () => {
      const delay = 12000 + Math.random() * 13000;
      return setTimeout(() => {
        tick();
        timer = schedule();
      }, delay);
    };
    let timer = schedule();
    return () => clearTimeout(timer);
  }, []);

  const remaining = Math.max(0, state.endsAt - now);
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  const left = Math.max(0, TOTAL_PACKS - state.sold);
  const percent = useMemo(() => Math.min(100, (state.sold / TOTAL_PACKS) * 100), [state.sold]);
  const isLow = left <= 80;

  return (
    <section className="container pt-2 pb-2">
      <div
        className="relative overflow-hidden rounded-[28px] p-5 md:p-6 shadow-card"
        style={{
          background: "linear-gradient(135deg, hsl(14 95% 55%), hsl(0 90% 58%), hsl(28 95% 55%))",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 6s ease infinite",
        }}
      >
        {/* Decorative shine sweep */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3.5s linear infinite",
          }}
        />
        {/* Soft corner glow */}
        <div aria-hidden className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-yellow-300/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-rose-500/40 blur-3xl" />

        <div className="relative grid md:grid-cols-[auto_1fr_auto] items-center gap-5">
          {/* Left: Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/20 backdrop-blur-sm grid place-items-center border border-white/30 animate-pulse-glow">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white text-rose-600 px-2 py-0.5 rounded-full">
                  Flash Sale
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-300 text-rose-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 fill-rose-700" /> Live
                </span>
              </div>
              <p className="mt-1 text-xl md:text-2xl font-extrabold leading-tight">
                70% OFF <span className="font-medium text-white/90 text-sm md:text-base">— ends in</span>
              </p>
            </div>
          </div>

          {/* Middle: Countdown */}
          <div className="flex items-center justify-center gap-2 md:gap-3">
            {[
              { v: pad(hours), l: "Hrs" },
              { v: pad(minutes), l: "Min" },
              { v: pad(seconds), l: "Sec" },
            ].map((t, i) => (
              <div key={t.l} className="flex items-center gap-2 md:gap-3">
                <div className="bg-white/95 backdrop-blur rounded-2xl px-3 py-2 md:px-4 md:py-2.5 min-w-[58px] md:min-w-[72px] text-center shadow-lg">
                  <div className="text-2xl md:text-3xl font-extrabold tabular-nums leading-none text-rose-600">
                    {t.v}
                  </div>
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-rose-500/80 mt-0.5">
                    {t.l}
                  </div>
                </div>
                {i < 2 && <span className="text-white text-2xl md:text-3xl font-extrabold animate-pulse">:</span>}
              </div>
            ))}
          </div>

          {/* Right: Stock progress */}
          <div className="text-white min-w-[200px] md:min-w-[240px]">
            <div className="flex items-center justify-between text-[11px] md:text-xs font-semibold mb-1.5">
              <span className="opacity-90">
                Sold today: <span className="font-extrabold tabular-nums">{state.sold}</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-extrabold tabular-nums ${
                  isLow ? "bg-yellow-300 text-rose-700 animate-pulse" : "bg-white/20"
                }`}
              >
                Only {left} left!
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-white/25 overflow-hidden relative">
              <div
                className="h-full rounded-full relative transition-all duration-700 ease-out"
                style={{
                  width: `${percent}%`,
                  background: "linear-gradient(90deg, #fde047, #fff, #fde047)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.2s linear infinite",
                  boxShadow: "0 0 12px rgba(253, 224, 71, 0.8)",
                }}
              />
            </div>
            <p className="mt-1.5 text-[10px] md:text-[11px] text-white/90 font-medium">
              🔥 Hurry! {Math.round(percent)}% claimed — offer auto-resets when timer ends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
