import Reveal from "./Reveal";

const ProofSection = () => (
  <section id="proof" className="container py-12 md:py-16">
    <Reveal>
      <div className="text-center max-w-2xl mx-auto">
        <span className="trust-badge mb-3"><span>📹</span> Real Deliveries</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3">
          📹 Proof of <span className="gradient-text">Delivery</span>
        </h2>
        <p className="text-sm md:text-base text-foreground/80 mt-2 md:mt-3">
          Watch real top-ups delivered to real players — recorded, unedited, instant.
        </p>
      </div>
    </Reveal>
    <Reveal delay={120}>
      <div className="mt-6 md:mt-10 max-w-[380px] mx-auto">
        <div className="premium-card rounded-[24px] p-2 overflow-hidden shadow-premium">
          <div className="relative rounded-[18px] overflow-hidden bg-black" style={{ aspectRatio: "9 / 16" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/HmUCGgfNFDg"
              title="KredCC Proof of Delivery"
              loading="lazy"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] md:text-xs font-semibold">
          <span className="trust-badge">✅ 100% Real</span>
          <span className="trust-badge">⚡ Instant Delivery</span>
          <span className="trust-badge">🔒 100% Safe</span>
        </div>
      </div>
    </Reveal>
  </section>
);

export default ProofSection;
