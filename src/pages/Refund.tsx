import PageLayout from "@/components/kredcc/PageLayout";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const Refund = () => (
  <PageLayout
    pageTitle="Refund Policy"
    title="Refund Policy"
    subtitle="100% money-back guarantee — no questions asked if we fail to deliver."
  >
    <div className="space-y-6 text-foreground/85 leading-relaxed">
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-2xl p-5 text-center">
          <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
          <p className="font-bold text-foreground">Instant Refund</p>
          <p className="text-xs text-muted-foreground mt-1">Processed within minutes</p>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <Clock className="w-8 h-8 mx-auto text-amber-500 mb-2" />
          <p className="font-bold text-foreground">30-Min Window</p>
          <p className="text-xs text-muted-foreground mt-1">Auto-refund if not delivered</p>
        </div>
        <div className="glass rounded-2xl p-5 text-center">
          <XCircle className="w-8 h-8 mx-auto text-rose-500 mb-2" />
          <p className="font-bold text-foreground">No Hassle</p>
          <p className="text-xs text-muted-foreground mt-1">Zero documentation required</p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">1. Eligibility for Refund</h2>
        <p>You are eligible for a 100% refund in the following cases:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Order not delivered within 30 minutes of payment confirmation.</li>
          <li>Wrong item delivered due to our error.</li>
          <li>Duplicate payment made for the same order.</li>
          <li>Service unavailability after payment.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">2. Non-Refundable Cases</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Wrong game ID or server provided by the user.</li>
          <li>Order successfully delivered to the provided ID.</li>
          <li>Account bans or restrictions imposed by the game publisher.</li>
          <li>Change of mind after successful delivery.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">3. Refund Process</h2>
        <p>To request a refund:</p>
        <ol className="list-decimal pl-6 space-y-1 mt-2">
          <li>Contact our 24/7 support via WhatsApp, Telegram, or email.</li>
          <li>Share your order ID and payment screenshot.</li>
          <li>Our team will verify and process the refund within 5-10 minutes.</li>
        </ol>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">4. Refund Timeline</h2>
        <p>Refunds are processed instantly to the original payment method. Depending on your bank, it may take 1-7 business days to reflect in your account.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">5. Need Help?</h2>
        <p>Our support team is available 24/7 to assist with any refund queries. Contact us at <span className="text-primary font-semibold">support@kredcc.com</span> or via the chat widget.</p>
      </section>
    </div>
  </PageLayout>
);

export default Refund;
