import { Plan } from "@/lib/games";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { slugify } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  plan: Plan;
  image: string;
  verified: boolean;
  index: number;
  game: string;
  verifiedInfo?: { id: string; name?: string };
};

const PlanCard = ({ plan, image, verified, index, game, verifiedInfo }: Props) => {
  const slug = `${game}-${slugify(plan.title)}`;
  const productUrl = `/product/${slug}`;

  const handleBuyClick = (e: React.MouseEvent) => {
    if (!verified) {
      e.preventDefault();
      toast.warning("⚠️ Please verify your ID first");
      document.getElementById("verify")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    supabase.from("verifications").insert({
      game,
      game_id: verifiedInfo?.id ?? "",
      in_game_name: verifiedInfo?.name || null,
      plan_title: plan.title,
      plan_price: plan.price,
      action: "buy_click",
      user_agent: navigator.userAgent.slice(0, 512),
    }).then(({ error }) => {
      if (error) console.error("Buy log failed", error);
    });
  };

  return (
    <Reveal delay={index * 60}>
      <div className="plan-card glow-border ripple group block relative">
        {plan.badge && (
          <span className="absolute top-3 right-3 md:top-4 md:right-4 z-10 text-[9px] md:text-[10px] font-bold uppercase tracking-wider gradient-bg text-primary-foreground px-2.5 py-1 md:px-3 rounded-full shadow-soft animate-float-y">
            {plan.badge}
          </span>
        )}
        <div className="flex items-center gap-3 md:gap-4 relative z-[1]">
          <Link to={productUrl} className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl bg-gradient-soft grid place-items-center overflow-hidden relative" aria-label={`View ${plan.title}`}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-bg blur-xl scale-75" />
            <img
              src={image}
              alt={plan.title}
              loading="lazy"
              className="relative w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={productUrl} className="block">
              <h4 className="font-bold text-sm md:text-base leading-tight group-hover:text-primary transition-colors line-clamp-2 pr-16 md:pr-20">{plan.title}</h4>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-1 line-clamp-2">{plan.desc}</p>
            </Link>
            <div className="mt-2.5 md:mt-3 flex items-center justify-between gap-2">
              <span className="text-xl md:text-2xl font-extrabold gradient-text tabular-nums">₹{plan.price}</span>
              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBuyClick}
                aria-label={`Buy ${plan.title} for ₹${plan.price}`}
                className="text-xs font-semibold px-4 py-2 min-h-11 inline-flex items-center rounded-full glass border border-border group-hover:gradient-bg group-hover:text-primary-foreground group-hover:border-transparent group-hover:shadow-glow transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Buy Now →
              </a>

            </div>
            <Link to={productUrl} className="text-[11px] text-muted-foreground hover:text-primary transition mt-1.5 inline-block story-link">
              View details
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
};
export default PlanCard;
