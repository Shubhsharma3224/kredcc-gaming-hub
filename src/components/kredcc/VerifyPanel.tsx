import { useState } from "react";
import { toast } from "sonner";
import { Check, ShieldCheck, Copy } from "lucide-react";
import { GameKey, GAME_DATA } from "@/lib/games";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  game: GameKey;
  verified: boolean;
  onVerify: (data: { id: string; name?: string }) => void;
};

const VerifyPanel = ({ game, verified, onVerify }: Props) => {
  const needsName = GAME_DATA[game].needsName;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = id.trim();
    const trimmedName = name.trim();
    if (!trimmedId) return toast.error("Please enter your Game ID");
    if (trimmedId.length < 3 || trimmedId.length > 64) {
      return toast.error("Game ID must be 3–64 characters");
    }
    if (needsName && !trimmedName) return toast.error("Please enter your Name");
    if (needsName && trimmedName.length > 64) {
      return toast.error("Name is too long");
    }

    setBusy(true);
    try {
      const { error } = await supabase.from("verifications").insert({
        game,
        game_id: trimmedId,
        in_game_name: needsName ? trimmedName : null,
        user_agent: navigator.userAgent.slice(0, 512),
      });
      if (error) throw error;

      setConfetti(true);
      onVerify({ id: trimmedId, name: trimmedName });
      toast.success("✅ ID Verified! Plans unlocked.");
      setTimeout(() => setConfetti(false), 1500);
    } catch (err) {
      console.error("Verification save failed", err);
      toast.error("Could not save verification. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const copyId = async () => {
    if (!id) return toast.error("Enter your ID first");
    await navigator.clipboard.writeText(id);
    toast.success("ID copied!");
  };

  return (
    <div className="glass-strong rounded-[28px] p-6 md:p-8 shadow-soft relative overflow-hidden">
      {confetti && (
        <div className="absolute inset-0 pointer-events-none flex justify-center">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: "60%",
                background: ["#6366f1", "#8b5cf6", "#d946ef", "#fbbf24"][i % 4],
                animation: `confetti ${0.9 + Math.random()}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {verified ? (
        <div className="flex items-center gap-4 animate-bounce-in">
          <div className="w-14 h-14 rounded-full gradient-bg grid place-items-center shadow-glow">
            <Check className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold text-lg">ID Verified Successfully</p>
            <p className="text-sm text-muted-foreground">All plans unlocked. Choose your top-up below ↓</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl gradient-bg grid place-items-center">
              <ShieldCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Verify your Game ID</h3>
              <p className="text-xs text-muted-foreground">🔒 We never ask for password. Only ID needed for instant delivery.</p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="grid gap-4">
            <div className="float-field">
              <input
                id="game-id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder=" "
                autoComplete="off"
                className="!pr-12"
              />
              <label htmlFor="game-id">Game ID</label>
              <button
                type="button"
                onClick={copyId}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-muted transition"
                aria-label="Copy ID"
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {needsName && (
              <div className="float-field">
                <input
                  id="game-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                />
                <label htmlFor="game-name">In-game Name</label>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="btn-gradient ripple animate-pulse-glow font-semibold py-4 px-8 text-base"
            >
              {busy ? "Verifying..." : "Verify & Unlock Plans"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default VerifyPanel;
