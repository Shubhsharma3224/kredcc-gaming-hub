import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCcw } from "lucide-react";

type Row = {
  id: string;
  game: string;
  game_id: string;
  in_game_name: string | null;
  plan_title: string | null;
  plan_price: number | null;
  action: string | null;
  user_agent: string | null;
  created_at: string;
};

const gameLabel: Record<string, string> = {
  weplay: "WePlay",
  jackaroo: "Jackaroo King",
  bgmi: "BGMI",
  freefire: "Free Fire",
};

const AdminDashboard = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "verify" | "buy_click">("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    // Select only the columns the UI actually renders — avoids shipping
    // large `user_agent` blobs the dashboard never reads.
    const { data, error } = await supabase
      .from("verifications")
      .select("id, game, game_id, in_game_name, plan_title, plan_price, action, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) setError(error.message);
    else setRows((data as Row[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = "Admin Dashboard — KredCC";
    load();
  }, [load]);

  // Compute all derived stats in a single pass, memoized on `rows`.
  const { filtered, totalBuys, totalVerify, totalRevenue } = useMemo(() => {
    let buys = 0;
    let verify = 0;
    let revenue = 0;
    for (const r of rows) {
      const action = r.action ?? "verify";
      if (action === "buy_click") {
        buys++;
        revenue += Number(r.plan_price ?? 0);
      } else if (action === "verify") {
        verify++;
      }
    }
    const filteredRows =
      filter === "all" ? rows : rows.filter((r) => (r.action ?? "verify") === filter);
    return { filtered: filteredRows, totalBuys: buys, totalVerify: verify, totalRevenue: revenue };
  }, [rows, filter]);

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">KredCC Admin</h1>
            <p className="text-sm text-neutral-500">Verifications & buy-click log</p>
          </div>
          <button
            onClick={load}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:opacity-90"
          >
            <RefreshCcw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {[
            { label: "Total Records", value: rows.length },
            { label: "Verifications", value: totalVerify },
            { label: "Buy Clicks", value: totalBuys },
            { label: "Est. Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-neutral-200 p-3 md:p-4 shadow-sm">
              <p className="text-[11px] md:text-xs text-neutral-500 font-semibold uppercase">{s.label}</p>
              <p className="text-lg md:text-2xl font-extrabold mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 text-sm">
          {(["all", "verify", "buy_click"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full font-semibold border ${
                filter === f
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {f === "all" ? "All" : f === "verify" ? "Verifications" : "Buy Clicks"}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm mb-4">Error: {error}</div>
        )}

        {loading ? (
          <p className="text-neutral-500 text-sm">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-neutral-500 text-sm">No records yet.</p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-100 text-neutral-600 text-xs uppercase">
                    <tr>
                      <th className="text-left p-3">When</th>
                      <th className="text-left p-3">Game</th>
                      <th className="text-left p-3">User ID</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Plan</th>
                      <th className="text-right p-3">Price</th>
                      <th className="text-left p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                        <td className="p-3 whitespace-nowrap text-neutral-600">
                          {new Date(r.created_at).toLocaleString()}
                        </td>
                        <td className="p-3 font-semibold">{gameLabel[r.game] ?? r.game}</td>
                        <td className="p-3 font-mono text-xs">{r.game_id}</td>
                        <td className="p-3">{r.in_game_name ?? "—"}</td>
                        <td className="p-3">{r.plan_title ?? "—"}</td>
                        <td className="p-3 text-right tabular-nums">
                          {r.plan_price != null ? `₹${r.plan_price}` : "—"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                              r.action === "buy_click"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-indigo-100 text-indigo-700"
                            }`}
                          >
                            {r.action ?? "verify"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((r) => (
                <div key={r.id} className="bg-white rounded-xl border border-neutral-200 p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{gameLabel[r.game] ?? r.game}</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        r.action === "buy_click"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {r.action ?? "verify"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {new Date(r.created_at).toLocaleString()}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-neutral-500">User ID</p>
                      <p className="font-mono break-all">{r.game_id}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Name</p>
                      <p>{r.in_game_name ?? "—"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-neutral-500">Plan</p>
                      <p className="font-semibold">
                        {r.plan_title ?? "—"}
                        {r.plan_price != null && (
                          <span className="ml-2 text-emerald-600">₹{r.plan_price}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
