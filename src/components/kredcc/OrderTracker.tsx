import { useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { GAME_LABEL, Order, STATUS_STYLES } from "@/lib/orders";

const OrderTracker = () => {
  const [gameId, setGameId] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [busy, setBusy] = useState(false);

  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = gameId.trim();
    if (id.length < 3) return toast.error("Enter your Game ID");
    setBusy(true);
    const { data, error } = await supabase
      .from("orders")
      .select("id, order_code, game, game_id, in_game_name, plan_title, plan_price, payment_method, transaction_id, upi_id_used, status, created_at")
      .eq("game_id", id)
      .order("created_at", { ascending: false })
      .limit(50);
    setBusy(false);
    if (error) return toast.error("Could not fetch orders");
    setOrders((data as Order[]) ?? []);
  };

  return (
    <section id="orders" className="container py-12 md:py-16 max-w-3xl">
      <Reveal>
        <div className="text-center">
          <span className="trust-badge mb-3"><span>📦</span> Track Order</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3">
            Check your <span className="gradient-text">order status</span>
          </h2>
          <p className="text-sm text-foreground/80 mt-2">Enter the Game ID you used at checkout.</p>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <form onSubmit={search} className="mt-6 flex flex-col sm:flex-row gap-2">
          <input
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Your Game ID"
            aria-label="Game ID"
            maxLength={64}
            className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm min-h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button disabled={busy} className="btn-gradient font-semibold px-6 py-3 min-h-12 inline-flex items-center justify-center gap-2 disabled:opacity-70">
            <Search className="w-4 h-4" /> {busy ? "Searching…" : "Find Orders"}
          </button>
        </form>

        {orders && (
          <div className="mt-5 space-y-3">
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center">No orders found for this Game ID.</p>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="premium-card rounded-[20px] p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] font-bold text-muted-foreground">{o.order_code}</p>
                    <p className="font-bold text-sm">{GAME_LABEL[o.game] ?? o.game} · {o.plan_title}</p>
                    <p className="text-xs text-muted-foreground">₹{o.plan_price} · {new Date(o.created_at).toLocaleString()}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full ${STATUS_STYLES[o.status] ?? ""}`}>
                    {o.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </Reveal>
    </section>
  );
};

export default OrderTracker;
