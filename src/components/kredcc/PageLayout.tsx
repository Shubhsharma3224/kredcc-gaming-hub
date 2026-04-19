import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Blobs from "@/components/kredcc/Blobs";
import { IMAGES } from "@/lib/games";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  pageTitle: string;
}

const PageLayout = ({ title, subtitle, children, pageTitle }: PageLayoutProps) => {
  useEffect(() => {
    document.title = `${pageTitle} — KredCC`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pageTitle]);

  return (
    <div className="relative min-h-screen">
      <Blobs />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full">
        <div className="container py-4">
          <div className="glass-strong rounded-full px-5 py-2.5 flex items-center justify-between shadow-card">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 gradient-bg rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                <img src={IMAGES.logo} alt="KredCC logo" className="relative w-9 h-9 rounded-xl object-cover" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                Kred<span className="gradient-text">CC</span>
              </span>
            </Link>
            <Link
              to="/"
              className="glass rounded-full text-sm font-semibold px-4 py-2 hover:scale-105 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Page header */}
      <section className="container pt-10 pb-6 md:pt-16 md:pb-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="gradient-text">{title}</span>
        </h1>
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">Last updated: April 2026</p>
      </section>

      {/* Content */}
      <section className="container pb-16 max-w-4xl">
        <article className="glass-strong rounded-[28px] p-6 md:p-10 shadow-card prose-content">
          {children}
        </article>
      </section>

      {/* Footer */}
      <footer className="container py-10">
        <div className="glass-strong rounded-[28px] p-6 md:p-8 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={IMAGES.logo} alt="KredCC" className="w-10 h-10 rounded-xl" />
              <div>
                <p className="font-extrabold text-lg">
                  Kred<span className="gradient-text">CC</span>
                </p>
                <p className="text-xs text-muted-foreground">India's Fastest Gaming Top-Up</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
              <Link to="/terms" className="hover:text-primary transition">Terms</Link>
              <Link to="/refund" className="hover:text-primary transition">Refund</Link>
              <Link to="/privacy" className="hover:text-primary transition">Privacy</Link>
              <Link to="/about" className="hover:text-primary transition">About</Link>
              <Link to="/contact" className="hover:text-primary transition">Contact</Link>
            </nav>
          </div>
          <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground text-center">
            © 2026 KredCC — India's Fastest Gaming Top-Up. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
