import { useCallback, useEffect, useState } from "react";
import { User, LogOut, Package, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { GameKey } from "@/lib/games";
import { SessionState } from "@/lib/session";
import { GAME_CURRENCY, GAME_LABEL, Order, STATUS_STYLES } from "@/lib/orders";

type Props = {
  session: SessionState;
  activeGame: GameKey;
  onLogout: () => void;
};

const ProfileMenu = ({ session, activeGame, onLogout }: Props) => {
  const [open, setOpen] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const account = session[activeGame] ?? Object.values(session)[0];
  const gameKey = (session[activeGame] ? activeGame : (Object.keys(session)[0] as GameKey)) ?? activeGame;

  const ids = Object.values(session).map((a) => a!.id);

  const loadOrders = useCallback(async () => {
    if (ids.length === 0) return;
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("id, order_code, game, game_id, in_game_name, plan_title, plan_price, payment_method, transaction_id, upi_id_used, status, created_at")
      .in("game_id", ids)
      .order("created_at", { ascending: false })
      .limit(100);
    setOrders((data as Order[]) ?? []);
    setLoading(false);
  }, [ids.join(",")]);

  useEffect(() => {
    if (open) loadOrders();
  }, [open, loadOrders]);

  if (!account) return null;

  const totalUnits = orders
    .filter((o) => o.game === gameKey)
    .reduce((n, o) => n + (parseInt(o.plan_title.replace(/[^0-9]/g, ""), 10) || 0), 0);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Your profile"
        className="w-10 h-10 md:w-11 md:h-11 shrink-0 grid place-items-center rounded-full gradient-bg text-primary-foreground font-bold shadow-glow hover:scale-105 transition"
      >
        {(account.name || account.id).charAt(0).toUpperCase()}
      </button>

      {open && (
        <div className="fixed inset-0 z-[70]" onClick={() => { setOpen(false); setShowOrders(false); }}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-3 top-20 w-[min(92vw,380px)] glass-strong rounded-[24px] p-5 shadow-premium max-h-[75dvh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 shrink-0 rounded-full gradient-bg grid place-items-center text-primary-foreground">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold truncate">Welcome back, {account.name || account.id}!</p>
                  <p className="text-xs text-muted-foreground truncate">{GAME_LABEL[gameKey]}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close profile" className="w-9 h-9 grid place-items-center rounded-full hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-2xl border border-border p-3">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Game ID</p>
                <p className="font-mono text-xs font-bold break-all mt-1">{account.id}</p>
              </div>
              <div className="rounded-2xl border border-border p-3">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Total Orders</p>
                <p className="font-extrabold text-lg mt-1">{orders.length}</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-border p-3">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">
                  Total {GAME_CURRENCY[gameKey]}
                </p>
                <p className="font-extrabold text-lg mt-1 gradient-text">{totalUnits.toLocaleString("en-IN")}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowOrders((v) => !v)}
                className="flex-1 btn-gradient font-semibold text-sm py-3 min-h-11 inline-flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" /> My Orders
              </button>
              <button
                onClick={() => { onLogout(); setOpen(false); }}
                className="glass rounded-full font-semibold text-sm px-4 py-3 min-h-11 inline-flex items-center gap-2 border border-border"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>

            {showOrders && (
              <div className="mt-4 space-y-2">
                {loading ? (
                  <p className="text-xs text-muted-foreground">Loading…</p>
                ) : orders.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No orders yet.</p>
                ) : (
                  orders.map((o) => (
                    <div key={o.id} className="rounded-2xl border border-border p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-bold">{o.order_code}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_STYLES[o.status] ?? ""}`}>
                          {o.status}
                        </span>
                      </div>
                      <p className="text-xs mt-1 font-semibold">{GAME_LABEL[o.game] ?? o.game} · {o.plan_title}</p>
                      <p className="text-[11px] text-muted-foreground">₹{o.plan_price} · {new Date(o.created_at).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
