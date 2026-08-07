import { useState } from "react";
import { X } from "lucide-react";
import { GameKey, TABS } from "@/lib/games";
import VerifyPanel from "./VerifyPanel";

type Props = {
  onVerify: (game: GameKey, info: { id: string; name?: string }) => void;
  onClose: () => void;
};

const VerifyOverlay = ({ onVerify, onClose }: Props) => {
  const [game, setGame] = useState<GameKey>("weplay");

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 backdrop-blur-xl bg-background/60 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-lg my-auto">
        <div className="relative">
          <button
            onClick={onClose}
            aria-label="Close verification"
            className="absolute -top-2 -right-1 z-10 w-11 h-11 grid place-items-center rounded-full glass-strong hover:shadow-glow transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Verify to <span className="gradient-text">unlock plans</span>
            </h2>
            <p className="text-sm text-foreground/80 mt-1">Choose your game and enter your ID to continue.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none justify-center">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setGame(t.key)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full font-semibold text-xs min-h-11 transition ${
                  game === t.key ? "btn-gradient" : "glass"
                }`}
              >
                <img src={t.logo} alt="" aria-hidden className="w-5 h-5 rounded-md object-cover" />
                {t.name}
              </button>
            ))}
          </div>
          <VerifyPanel game={game} verified={false} onVerify={(info) => onVerify(game, info)} />
        </div>
      </div>
    </div>
  );
};

export default VerifyOverlay;
