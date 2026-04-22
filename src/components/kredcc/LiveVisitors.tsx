import { useEffect, useState } from "react";

const LiveVisitors = () => {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 200) + 150);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(Math.floor(Math.random() * 200) + 150);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed safe-bottom left-3 md:left-5 z-40 glass-strong rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-card flex items-center gap-2 md:gap-2.5 text-[11px] md:text-sm font-semibold animate-fade-in max-w-[55vw]">
      <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500" />
      </span>
      <span className="truncate">
        <span className="gradient-text font-extrabold tabular-nums">{count}</span>
        <span className="text-muted-foreground font-medium"> viewing</span>
      </span>
    </div>
  );
};

export default LiveVisitors;
