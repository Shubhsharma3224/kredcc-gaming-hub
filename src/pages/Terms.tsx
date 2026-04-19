import PageLayout from "@/components/kredcc/PageLayout";

const Terms = () => (
  <PageLayout
    pageTitle="Terms & Conditions"
    title="Terms & Conditions"
    subtitle="Please read these terms carefully before using KredCC services."
  >
    <div className="space-y-6 text-foreground/85 leading-relaxed">
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">1. Acceptance of Terms</h2>
        <p>By accessing or using KredCC ("the Service"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our service.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">2. Service Description</h2>
        <p>KredCC provides digital top-up services for various games including WePlay, Jackaroo King, BGMI, and Free Fire. We act as an independent reseller and are not affiliated with any game publisher.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You must provide accurate game ID and account information.</li>
          <li>You are responsible for verifying your details before completing payment.</li>
          <li>You must be at least 13 years old to use this service. Minors require parental consent.</li>
          <li>You agree not to use the service for fraudulent or illegal activities.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">4. Payment & Pricing</h2>
        <p>All prices are listed in Indian Rupees (INR) and include applicable taxes. Payment is required upfront. We reserve the right to change prices at any time without notice.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">5. Delivery</h2>
        <p>We aim to deliver all top-ups within 1-2 minutes of payment confirmation. In rare cases, delivery may take up to 30 minutes due to game server issues. If delivery exceeds 30 minutes, you are eligible for a full refund.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">6. Account Bans & Penalties</h2>
        <p>KredCC is not responsible for any account bans, suspensions, or penalties imposed by game publishers. Users top-up at their own risk.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">7. Limitation of Liability</h2>
        <p>KredCC's liability is limited to the amount paid by the user for the specific transaction. We are not liable for any indirect, incidental, or consequential damages.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">8. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">9. Contact</h2>
        <p>For any questions regarding these terms, please contact us at <span className="text-primary font-semibold">support@kredcc.com</span>.</p>
      </section>
    </div>
  </PageLayout>
);

export default Terms;
