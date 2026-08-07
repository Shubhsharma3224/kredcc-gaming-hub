CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code text NOT NULL UNIQUE DEFAULT ('KC' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
  game text NOT NULL,
  game_id text NOT NULL,
  in_game_name text,
  plan_title text NOT NULL,
  plan_price numeric NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'upi',
  transaction_id text NOT NULL,
  upi_id_used text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.orders TO anon;
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read orders" ON public.orders FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can update order status" ON public.orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE INDEX orders_game_id_idx ON public.orders (game_id);
CREATE INDEX orders_created_at_idx ON public.orders (created_at DESC);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();