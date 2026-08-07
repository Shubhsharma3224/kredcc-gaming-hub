import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCcw } from "lucide-react";
import { GAME_LABEL, ORDER_STATUSES, Order, STATUS_STYLES } from "@/lib/orders";
import { toast } from "sonner";

type VerifiedUser = {
  id: string;
  game: string;
  game_id: string;
  in_game_name: string | null;
  created_at: string;
};

const GAMES = ["all", "weplay", "jackaroo", "bgmi", "freefire"] as const;

const AdminKredcc = () => {
  const [tab, setTab] = useState<"orders" | "users">("orders");
  const [gameFilter, setGameFilter] = useState<(typeof GAMES)[number]>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<VerifiedUser[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [o, u] = await Promise.all([
      supabase
        .from("orders")
        .select("id, order_code, game, game_id, in_game_name, plan_title, plan_price, payment_method, transaction_id, upi_id_used, status, created_at")
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase
        .from("verifications")
        .select("id, game, game_id, in_game_name, created_at")
        .eq("action", "verify")
        .order("created_at", { ascending: false })
        .limit(1000),
    ]);
    setOrders((o.data as Order[]) ?? []);
    setUsers((u.data as VerifiedUser[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = "KredCC Admin";
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return toast.error("Update failed");
    setOrders((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Marked ${status}`);
  };

  const { filteredOrders, filteredUsers, revenueByGame, totalRevenue } = useMemo(() => {
    const fo = gameFilter === "all" ? orders : orders.filter((o) => o.game === gameFilter);
    const fu = gameFilter === "all" ? users : users.filter((u) => u.game === gameFilter);
    const rev: Record<string, number> = {};
    let total = 0;
    for (const o of orders) {
      rev[o.game] = (rev[o.game] ?? 0) + Number(o.plan_price ?? 0);
      total += Number(o.plan_price ?? 0);
    }
    return { filteredOrders: fo, filteredUsers: fu, revenueByGame: rev, totalRevenue: total };
  }, [orders, users, gameFilter]);

  return (
    <div className="min-h-dvh bg-neutral-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">KredCC Admin</h1>
            <p className="text-sm text-neutral-500">Orders, verified users & revenue</p>
          </div>
          <button onClick={load} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black text-white text-sm font-semibold min-h-11">
            <RefreshCcw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { label: "Total Users", value: users.length },
            { label: "Total Orders", value: orders.length },
            { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
            { label: "Pending", value: orders.filter((o) => o.status === "pending").length },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-neutral-200 p-3 shadow-sm">
              <p className="text-[11px] text-neutral-500 font-semibold uppercase">{s.label}</p>
              <p className="text-lg md:text-2xl font-extrabold mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {(["weplay", "jackaroo", "bgmi", "freefire"] as const).map((g) => (
            <div key={g} className="bg-white rounded-xl border border-neutral-200 p-3 shadow-sm">
              <p className="text-[11px] text-neutral-500 font-semibold uppercase">{GAME_LABEL[g]} Revenue</p>
              <p className="text-base md:text-xl font-extrabold mt-1">₹{(revenueByGame[g] ?? 0).toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>

        {/* Tabs + filters */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          {(["orders", "users"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full font-semibold border ${tab === t ? "bg-black text-white border-black" : "bg-white border-neutral-200"}`}
            >
              {t === "orders" ? "Orders" : "Verified Users"}
            </button>
          ))}
          <span className="w-px bg-neutral-200 mx-1" />
          {GAMES.map((g) => (
            <button
              key={g}
              onClick={() => setGameFilter(g)}
              className={`px-3 py-1.5 rounded-full font-semibold border ${gameFilter === g ? "bg-indigo-600 text-white border-indigo-600" : "bg-white border-neutral-200"}`}
            >
              {g === "all" ? "All Games" : GAME_LABEL[g]}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-neutral-500">Loading…</p>
        ) : tab === "orders" ? (
          filteredOrders.length === 0 ? (
            <p className="text-sm text-neutral-500">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((o) => (
                <div key={o.id} className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold">{o.order_code}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${STATUS_STYLES[o.status] ?? ""}`}>{o.status}</span>
                    </div>
                    <span className="text-xs text-neutral-500">{new Date(o.created_at).toLocaleString()}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><p className="text-neutral-500">Game</p><p className="font-semibold">{GAME_LABEL[o.game] ?? o.game}</p></div>
                    <div><p className="text-neutral-500">Customer ID</p><p className="font-mono break-all">{o.game_id}</p></div>
                    <div><p className="text-neutral-500">Name</p><p>{o.in_game_name ?? "—"}</p></div>
                    <div><p className="text-neutral-500">Plan</p><p className="font-semibold">{o.plan_title}</p></div>
                    <div><p className="text-neutral-500">Amount</p><p className="font-bold">₹{o.plan_price}</p></div>
                    <div><p className="text-neutral-500">Method</p><p className="uppercase">{o.payment_method}</p></div>
                    <div><p className="text-neutral-500">Txn ID</p><p className="font-mono break-all">{o.transaction_id}</p></div>
                    <div><p className="text-neutral-500">UPI ID used</p><p className="font-mono break-all">{o.upi_id_used ?? "—"}</p></div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ORDER_STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(o.id, s)}
                        className={`text-[11px] font-bold uppercase px-2.5 py-1.5 rounded-full border ${
                          o.status === s ? "bg-black text-white border-black" : "bg-white border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : filteredUsers.length === 0 ? (
          <p className="text-sm text-neutral-500">No verified users yet.</p>
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 overflow-x-auto shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-neutral-100 text-neutral-600 text-xs uppercase">
                <tr>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Game</th>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-t border-neutral-100">
                    <td className="p-3 whitespace-nowrap text-neutral-600">{new Date(u.created_at).toLocaleString()}</td>
                    <td className="p-3 font-semibold">{GAME_LABEL[u.game] ?? u.game}</td>
                    <td className="p-3 font-mono text-xs break-all">{u.game_id}</td>
                    <td className="p-3">{u.in_game_name ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminKredcc;
