import PageLayout from "@/components/kredcc/PageLayout";
import { Zap, ShieldCheck, Heart, Trophy } from "lucide-react";

const About = () => (
  <PageLayout
    pageTitle="About Us"
    title="About KredCC"
    subtitle="India's most trusted gaming top-up platform — built by gamers, for gamers."
  >
    <div className="space-y-8 text-foreground/85 leading-relaxed">
      <section>
        <h2 className="text-2xl font-bold mb-3 text-foreground">Our Story</h2>
        <p>
          KredCC was founded in 2023 by a team of passionate gamers tired of slow, overpriced, and unreliable top-up services. We set out to build a platform that delivers <strong>instantly</strong>, charges <strong>fairly</strong>, and treats every player like a VIP.
        </p>
        <p className="mt-3">
          Today, we proudly serve over <strong>50,000+ happy gamers</strong> across India with lightning-fast top-ups for WePlay, Jackaroo King, BGMI, Free Fire, and more.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Why Choose KredCC?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "1-2 minute delivery, guaranteed." },
            { icon: <ShieldCheck className="w-6 h-6" />, title: "100% Secure", desc: "Bank-grade encryption on every transaction." },
            { icon: <Heart className="w-6 h-6" />, title: "Loved by Gamers", desc: "4.9/5 rating from 10,000+ reviews." },
            { icon: <Trophy className="w-6 h-6" />, title: "Best Prices", desc: "Lowest prices in India, guaranteed." },
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-5 flex gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg grid place-items-center text-primary-foreground shadow-glow shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="font-bold text-foreground">{f.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3 text-foreground">Our Mission</h2>
        <p>
          To empower every Indian gamer with affordable, instant, and secure access to in-game purchases — without hidden fees, fake delays, or shady practices.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3 text-foreground">By the Numbers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { v: "50K+", l: "Happy Customers" },
            { v: "100K+", l: "Orders Delivered" },
            { v: "4.9★", l: "Average Rating" },
            { v: "24/7", l: "Live Support" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-4 text-center">
              <p className="text-2xl md:text-3xl font-extrabold gradient-text">{s.v}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-sm italic text-muted-foreground border-l-4 border-primary pl-4">
          Disclaimer: KredCC is an independent service and is not affiliated with, endorsed by, or sponsored by any game publisher.
        </p>
      </section>
    </div>
  </PageLayout>
);

export default About;
