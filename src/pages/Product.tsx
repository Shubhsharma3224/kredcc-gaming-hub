import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ShieldCheck, Zap, Clock, Star } from "lucide-react";
import Blobs from "@/components/kredcc/Blobs";
import Seo from "@/components/Seo";
import { ALL_PRODUCTS, findProduct, GAME_META } from "@/lib/products";
import { IMAGES } from "@/lib/games";
import NotFound from "./NotFound";

const SITE = "https://kredcc.lovable.app";

const Product = () => {
  const { slug = "" } = useParams();
  const product = findProduct(slug);

  if (!product) return <NotFound />;

  const { plan, gameName, sectionTitle, image, game, url } = product;
  const meta = GAME_META[game];

  const title = `${plan.title} — ${gameName} Top-Up at ₹${plan.price} | KredCC`;
  const description = `Buy ${plan.title} (${plan.desc}) for ${gameName} at the lowest price ₹${plan.price}. Instant 1–2 minute delivery, 100% safe top-up in India. Order on KredCC.`;

  // Related products from the same game
  const related = ALL_PRODUCTS.filter((p) => p.game === game && p.slug !== slug).slice(0, 6);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${plan.title} - ${gameName}`,
    description,
    image,
    brand: { "@type": "Brand", name: gameName },
    sku: product.slug,
    category: meta.keyword,
    offers: {
      "@type": "Offer",
      url: `${SITE}${url}`,
      priceCurrency: "INR",
      price: plan.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "KredCC" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1280",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: gameName, item: `${SITE}/#games` },
      { "@type": "ListItem", position: 3, name: plan.title, item: `${SITE}${url}` },
    ],
  };

  return (
    <div className="relative min-h-screen">
      <Seo
        title={title}
        description={description}
        canonical={url}
        image={image}
        type="product"
        jsonLd={[productSchema, breadcrumbSchema]}
      />
      <Blobs />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full">
        <div className="container py-4">
          <div className="glass-strong rounded-full px-5 py-2.5 flex items-center justify-between shadow-card">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img src={IMAGES.logo} alt="KredCC logo" className="w-9 h-9 rounded-xl object-cover" />
              <span className="font-extrabold text-lg tracking-tight">
                Kred<span className="gradient-text">CC</span>
              </span>
            </Link>
            <Link to="/" className="text-sm font-semibold flex items-center gap-1.5 hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="container pt-2 pb-4">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link to="/#games" className="hover:text-primary">{gameName}</Link></li>
            <li>/</li>
            <li className="text-foreground font-semibold">{plan.title}</li>
          </ol>
        </nav>
      </div>

      {/* Product hero */}
      <section className="container pb-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Image */}
          <div className="glass-strong rounded-[28px] p-8 shadow-card grid place-items-center aspect-square md:aspect-auto md:min-h-[420px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-30 gradient-bg blur-3xl" />
            <img
              src={image}
              alt={`${plan.title} - ${gameName} top-up`}
              className="relative w-56 h-56 md:w-72 md:h-72 object-contain animate-float-y"
            />
            {plan.badge && (
              <span className="absolute top-5 right-5 text-[11px] font-bold uppercase tracking-wider gradient-bg text-primary-foreground px-3 py-1.5 rounded-full shadow-glow">
                {plan.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {gameName} · {sectionTitle}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {plan.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">{plan.desc}</p>

            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-2">4.9 / 5 · 1,280+ reviews</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-5xl font-extrabold gradient-text">₹{plan.price}</span>
              <span className="text-lg text-muted-foreground line-through">₹{Math.round(plan.price * 1.5)}</span>
              <span className="text-xs font-bold uppercase px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                Save 33%
              </span>
            </div>

            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient ripple mt-6 inline-flex items-center justify-center w-full md:w-auto font-semibold px-8 py-4 text-base"
            >
              ⚡ Buy {plan.title} Now
            </a>

            <p className="mt-3 text-xs text-muted-foreground">
              Verify your {gameName} ID on the{" "}
              <Link to="/#verify" className="text-primary font-semibold story-link">homepage</Link> before placing the order.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { icon: <Zap className="w-4 h-4" />, label: "Instant Delivery" },
                { icon: <ShieldCheck className="w-4 h-4" />, label: "100% Safe" },
                { icon: <Clock className="w-4 h-4" />, label: "1–2 min Top-Up" },
                { icon: <Check className="w-4 h-4" />, label: "Lowest Price" },
              ].map((t) => (
                <div key={t.label} className="glass rounded-2xl p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl gradient-bg grid place-items-center text-primary-foreground shrink-0">
                    {t.icon}
                  </div>
                  <span className="text-sm font-semibold">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Description / SEO content */}
      <section className="container pb-12">
        <div className="glass-strong rounded-[28px] p-6 md:p-8 shadow-card max-w-3xl">
          <h2 className="text-2xl font-extrabold mb-3">About {plan.title}</h2>
          <p className="text-muted-foreground leading-relaxed">
            Get <strong>{plan.title}</strong> for <strong>{gameName}</strong> at the lowest price in India — just <strong>₹{plan.price}</strong>.
            This pack includes <strong>{plan.desc}</strong>, delivered to your account within 1–2 minutes after payment.
            KredCC is India's most trusted <strong>{meta.keyword}</strong> store, used by 50,000+ gamers with instant delivery and 24/7 support.
          </p>
          <h3 className="text-lg font-bold mt-6 mb-2">How to order</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Click the "Buy Now" button above and complete the secure payment.</li>
            <li>Verify your {gameName} ID on the homepage if you haven't already.</li>
            <li>We deliver your {plan.title} pack within 1–2 minutes — guaranteed.</li>
          </ol>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container pb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-8 rounded-full gradient-bg" />
            <h2 className="text-2xl font-extrabold">More {gameName} Top-Ups</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={r.url}
                className="plan-card glow-border group block relative"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-soft grid place-items-center overflow-hidden">
                    <img src={r.image} alt={r.plan.title} loading="lazy" className="w-12 h-12 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition">{r.plan.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{r.plan.desc}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-extrabold gradient-text">₹{r.plan.price}</span>
                      <span className="text-xs font-semibold text-primary">View →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="container py-8 text-center text-xs text-muted-foreground">
        © 2025 KredCC — India's Fastest Gaming Top-Up.
      </footer>
    </div>
  );
};

export default Product;
