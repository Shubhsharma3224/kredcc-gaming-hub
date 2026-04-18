import { Plan } from "@/lib/games";
import { toast } from "sonner";
import Reveal from "./Reveal";

type Props = { plan: Plan; image: string; verified: boolean; index: number };

const PlanCard = ({ plan, image, verified, index }: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!verified) {
      e.preventDefault();
      toast.warning("⚠️ Please verify your ID first");
      document.getElementById("verify")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <Reveal delay={index * 60}>
      <a
        href={plan.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="plan-card ripple group block relative"
      >
        {plan.badge && (
          <span className="absolute top-4 right-4 z-10 text-[10px] font-bold uppercase tracking-wider gradient-bg text-primary-foreground px-3 py-1 rounded-full shadow-soft">
            {plan.badge}
          </span>
        )}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-soft grid place-items-center overflow-hidden">
            <img
              src={image}
              alt={plan.title}
              loading="lazy"
              className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-base leading-tight">{plan.title}</h4>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{plan.desc}</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-2xl font-extrabold gradient-text">₹{plan.price}</span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full glass border border-border group-hover:gradient-bg group-hover:text-primary-foreground transition-all">
                Buy Now →
              </span>
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
};
export default PlanCard;
