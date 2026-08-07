import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, ShieldCheck, Zap, Headphones, CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Plan, GameKey } from "@/lib/games";
import { SESSION_UPI_ID, UPI_APPS, buildUpiUri, qrImageUrl } from "@/lib/upi";
import { supabase } from "@/integrations/supabase/client";
import { GAME_LABEL } from "@/lib/orders";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  plan: Plan;
  game: GameKey;
  account: { id: string; name?: string };
};

const PaymentModal = ({ open, onOpenChange, plan, game, account }: Props) => {
  const [method, setMethod] = useState<"upi" | "razorpay">("upi");
  const [txn, setTxn] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const note = `${GAME_LABEL[game]} ${plan.title}`;
  const upiUri = useMemo(
    () => buildUpiUri({ upiId: SESSION_UPI_ID, amount: plan.price, note }),
    [plan.price, note]
  );

  const copyUpi = async () => {
    await navigator.clipboard.writeText(SESSION_UPI_ID);
    toast.success("UPI ID copied!");
  };

  const verifyPayment = async () => {
    const t = txn.trim();
    if (t.length < 6 || t.length > 64) {
      toast.error("Enter a valid Transaction ID / UTR (6–64 characters)");
      return;
    }
    setBusy(true);
    const { data, error } = await supabase
      .from("orders")
      .insert({
        game,
        game_id: account.id,
        in_game_name: account.name || null,
        plan_title: plan.title,
        plan_price: plan.price,
        payment_method: method,
        transaction_id: t,
        upi_id_used: method === "upi" ? SESSION_UPI_ID : null,
      })
      .select("order_code")
      .single();
    setBusy(false);
    if (error) {
      toast.error("Could not submit order. Please try again.");
      return;
    }
    setDone(data.order_code);
    toast.success("✅ Payment submitted! Order created.");
  };

  const close = () => {
    onOpenChange(false);
    setTimeout(() => {
      setDone(null);
      setTxn("");
    }, 250);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? onOpenChange(true) : close())}>
      <DialogContent className="max-w-2xl max-h-[90dvh] overflow-y-auto rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">
            {plan.title} · <span className="gradient-text">₹{plan.price}</span>
          </DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-500" />
            <p className="mt-4 font-bold text-lg">Order placed!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Order ID <span className="font-mono font-bold text-foreground">{done}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Status: Pending — track it anytime from your profile → My Orders.
            </p>
            <button onClick={close} className="btn-gradient font-semibold px-6 py-3 mt-6 min-h-11">
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Method switch */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMethod("upi")}
                className={`rounded-2xl px-3 py-3 text-sm font-bold border transition ${
                  method === "upi" ? "btn-gradient border-transparent" : "glass border-border"
                }`}
              >
                ⚡ UPI Payment
                <span className="block text-[10px] font-semibold opacity-80">Fastest</span>
              </button>
              <button
                onClick={() => setMethod("razorpay")}
                className={`rounded-2xl px-3 py-3 text-sm font-bold border transition ${
                  method === "razorpay" ? "btn-gradient border-transparent" : "glass border-border"
                }`}
              >
                💳 Razorpay
                <span className="block text-[10px] font-semibold opacity-80">Cards / Netbanking</span>
              </button>
            </div>

            {method === "upi" ? (
              <div className="mt-2 space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {UPI_APPS.map((app) => (
                    <a
                      key={app.name}
                      href={buildUpiUri({ upiId: SESSION_UPI_ID, amount: plan.price, note, scheme: app.scheme })}
                      className="glass rounded-2xl p-2.5 flex flex-col items-center gap-1.5 border border-border hover:shadow-glow transition min-h-11"
                    >
                      <img src={app.logo} alt={app.name} className="w-7 h-7 object-contain" loading="lazy" />
                      <span className="text-[10px] font-semibold text-center leading-tight">{app.name}</span>
                    </a>
                  ))}
                </div>

                <div className="rounded-2xl p-4 border-2 border-primary/30 bg-primary/5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Pay to this UPI ID</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="flex-1 font-mono font-bold text-sm md:text-base break-all">{SESSION_UPI_ID}</span>
                    <button
                      onClick={copyUpi}
                      className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 min-h-11 rounded-xl btn-gradient"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src={qrImageUrl(upiUri)}
                    alt="UPI QR code"
                    width={200}
                    height={200}
                    className="rounded-2xl border border-border bg-white p-2"
                    loading="lazy"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Scan to pay ₹{plan.price}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 text-[11px] font-semibold">
                  <span className="trust-badge"><ShieldCheck className="w-3.5 h-3.5" /> 100% Secure</span>
                  <span className="trust-badge"><Zap className="w-3.5 h-3.5" /> Instant Delivery</span>
                  <span className="trust-badge"><Headphones className="w-3.5 h-3.5" /> 24/7 Support</span>
                </div>
              </div>
            ) : (
              <div className="mt-2 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pay securely via Razorpay (UPI, cards, netbanking & wallets). After paying, come back and verify your Transaction ID.
                </p>
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient font-semibold px-6 py-3.5 min-h-12 w-full inline-flex items-center justify-center gap-2"
                >
                  Continue to Payment <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Transaction verification */}
            <div className="mt-4 rounded-2xl border border-border p-4">
              <p className="font-bold text-sm">Verify your payment</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Enter the {method === "upi" ? "UTR / Transaction ID" : "Razorpay Transaction ID"} to create your order.
              </p>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <input
                  value={txn}
                  onChange={(e) => setTxn(e.target.value)}
                  placeholder="e.g. 4839201XXXXX"
                  maxLength={64}
                  aria-label="Transaction ID"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  onClick={verifyPayment}
                  disabled={busy}
                  className="btn-gradient font-semibold px-5 py-3 min-h-11 disabled:opacity-70"
                >
                  {busy ? "Verifying…" : "Verify Payment"}
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
