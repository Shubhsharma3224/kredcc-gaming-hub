import { useState } from "react";
import PageLayout from "@/components/kredcc/PageLayout";
import { Mail, MessageCircle, Send, Instagram, Phone, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent! We'll reply within 1 hour.", {
        description: "Check your email for our response.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 800);
  };

  return (
    <PageLayout
      pageTitle="Contact Us"
      title="Get in Touch"
      subtitle="We're here 24/7. Reach out via any channel — we usually reply within minutes."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-2">Contact Channels</h2>

          {[
            { icon: <Mail className="w-5 h-5" />, label: "Email", value: "support@kredcc.com", href: "mailto:support@kredcc.com" },
            { icon: <Phone className="w-5 h-5" />, label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
            { icon: <MessageCircle className="w-5 h-5" />, label: "Discord", value: "discord.gg/kredcc", href: "#" },
            { icon: <Send className="w-5 h-5" />, label: "Telegram", value: "@kredcc_support", href: "#" },
            { icon: <Instagram className="w-5 h-5" />, label: "Instagram", value: "@kredcc_official", href: "#" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="glass rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02] hover:shadow-glow transition-all group"
            >
              <div className="w-11 h-11 rounded-xl gradient-bg grid place-items-center text-primary-foreground shadow-glow shrink-0">
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="font-semibold text-foreground truncate group-hover:text-primary transition">{c.value}</p>
              </div>
            </a>
          ))}

          <div className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 grid place-items-center text-emerald-600 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Support Hours</p>
              <p className="font-semibold text-foreground">24/7 — Always Available</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-strong rounded-[24px] p-6 shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Order issue, refund, etc."
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help you?"
                className="mt-1.5"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-gradient ripple w-full font-semibold py-3 disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
