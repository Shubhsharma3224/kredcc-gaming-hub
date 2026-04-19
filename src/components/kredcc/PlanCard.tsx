import { Plan } from "@/lib/games";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { slugify } from "@/lib/products";

type Props = {
  plan: Plan;
  image: string;
  verified: boolean;
  index: number;
  game: string;
};

const PlanCard = ({ plan, image, verified, index, game }: Props) => {
  const slug = `${game}-${slugify(plan.title)}`;
  const productUrl = `/product/${slug}`;

  const handleBuyClick = (e: React.MouseEvent) => {
    if (!verified) {
      e.preventDefault();
      toast.warning("⚠️ Please verify your ID first");
      document.getElementById("verify")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Reveal delay={index * 60}>
      <div className="plan-card glow-border ripple group block relative">
        {plan.badge && (
          <span className="absolute top-4 right-4 z-10 text-[10px] font-bold uppercase tracking-wider gradient-bg text-primary-foreground px-3 py-1 rounded-full shadow-soft animate-float-y">
            {plan.badge}
          </span>
        )}
        <div className="flex items-center gap-4 relative z-[1]">
          <Link to={productUrl} className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-soft grid place-items-center overflow-hidden relative" aria-label={`View ${plan.title}`}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-bg blur-xl scale-75" />
            <img
              src={image}
              alt={plan.title}
              loading="lazy"
              className="relative w-16 h-16 object-contain group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={productUrl} className="block">
              <h4 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">{plan.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{plan.desc}</p>
            </Link>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-2xl font-extrabold gradient-text">₹{plan.price}</span>
              <a
                href={plan.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBuyClick}
                className="text-xs font-semibold px-3 py-1.5 rounded-full glass border border-border group-hover:gradient-bg group-hover:text-primary-foreground group-hover:border-transparent group-hover:shadow-glow transition-all duration-300"
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
