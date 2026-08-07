export const ORDER_STATUSES = ["pending", "processing", "hold", "completed", "failed"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type Order = {
  id: string;
  order_code: string;
  game: string;
  game_id: string;
  in_game_name: string | null;
  plan_title: string;
  plan_price: number;
  payment_method: string;
  transaction_id: string;
  upi_id_used: string | null;
  status: string;
  created_at: string;
};

export const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-sky-100 text-sky-700",
  hold: "bg-neutral-200 text-neutral-700",
  completed: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
};

export const GAME_LABEL: Record<string, string> = {
  weplay: "WePlay",
  jackaroo: "Jackaroo King",
  bgmi: "BGMI",
  freefire: "Free Fire",
};

export const GAME_CURRENCY: Record<string, string> = {
  weplay: "Coins",
  jackaroo: "Diamonds",
  bgmi: "UC",
  freefire: "Diamonds",
};
