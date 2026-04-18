const Blobs = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="blob animate-blob-float" style={{ top: "-10%", left: "-10%", width: 500, height: 500, background: "hsl(234 89% 66%)" }} />
    <div className="blob animate-blob-float" style={{ top: "30%", right: "-15%", width: 600, height: 600, background: "hsl(292 84% 61%)", animationDelay: "-6s" }} />
    <div className="blob animate-blob-float" style={{ bottom: "-15%", left: "20%", width: 550, height: 550, background: "hsl(262 83% 64%)", animationDelay: "-12s" }} />
  </div>
);
export default Blobs;
