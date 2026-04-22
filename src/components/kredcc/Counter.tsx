import { useEffect, useRef, useState } from "react";

const Counter = ({
  to,
  suffix = "",
  duration = 2000,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * to));
            if (p < 1) {
              requestAnimationFrame(tick);
            } else {
              setVal(to);
              setDone(true);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums will-change-transform ${done ? "animate-counter-pop" : ""} ${className}`}
    >
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

export default Counter;
