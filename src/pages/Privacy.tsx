import PageLayout from "@/components/kredcc/PageLayout";

const Privacy = () => (
  <PageLayout
    pageTitle="Privacy Policy"
    title="Privacy Policy"
    subtitle="Your privacy matters. Here's how we handle your data."
  >
    <div className="space-y-6 text-foreground/85 leading-relaxed">
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">1. Information We Collect</h2>
        <p>We collect minimal information required to process your top-up:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><strong>Game ID:</strong> Required to deliver your purchase.</li>
          <li><strong>Contact Info:</strong> Email or phone for order updates.</li>
          <li><strong>Payment Data:</strong> Processed securely by trusted payment gateways. We do not store card details.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">2. What We Never Ask</h2>
        <p className="font-semibold text-emerald-600">We will NEVER ask for your game password, OTP, or account login credentials. Anyone claiming to be from KredCC asking for these details is a scammer.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">3. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To process and deliver your orders.</li>
          <li>To send order confirmations and support messages.</li>
          <li>To improve our services and user experience.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">4. Data Sharing</h2>
        <p>We do not sell, rent, or share your personal information with third parties, except:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Payment processors to complete transactions.</li>
          <li>When required by law or legal process.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">5. Data Security</h2>
        <p>We implement industry-standard security measures including SSL encryption, secure servers, and limited access controls to protect your data.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">6. Cookies</h2>
        <p>We use cookies to enhance your browsing experience, remember preferences, and analyze site traffic. You can disable cookies through your browser settings.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Opt-out of marketing communications.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2 text-foreground">8. Contact Us</h2>
        <p>For privacy-related queries, email us at <span className="text-primary font-semibold">privacy@kredcc.com</span>.</p>
      </section>
    </div>
  </PageLayout>
);

export default Privacy;
