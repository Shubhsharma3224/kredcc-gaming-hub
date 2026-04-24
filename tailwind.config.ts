import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-soft": "var(--gradient-soft)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        "glow-lg": "var(--shadow-glow-lg)",
        "glow-gold": "var(--shadow-glow-gold)",
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        premium: "var(--shadow-premium)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "hero-in": { "0%": { opacity: "0", transform: "translateY(20px) scale(0.96)" }, "100%": { opacity: "1", transform: "translateY(0) scale(1)" } },
        "slide-up": { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "blob-float": { "0%,100%": { transform: "translate(0,0) scale(1)" }, "33%": { transform: "translate(40px,-50px) scale(1.1)" }, "66%": { transform: "translate(-30px,30px) scale(0.95)" } },
        "pulse-glow": { "0%,100%": { boxShadow: "0 20px 60px -15px hsl(262 83% 64% / 0.45)" }, "50%": { boxShadow: "0 25px 80px -10px hsl(292 84% 61% / 0.7)" } },
        "bounce-in": { "0%": { opacity: "0", transform: "scale(0.5)" }, "60%": { opacity: "1", transform: "scale(1.08)" }, "100%": { transform: "scale(1)" } },
        "fade-in": { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "float-y": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        "gradient-shift": { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        "shimmer": { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "counter-pop": { "0%": { transform: "scale(1)" }, "40%": { transform: "scale(1.18)" }, "70%": { transform: "scale(0.96)" }, "100%": { transform: "scale(1)" } },
        "sparkle-twinkle": { "0%,100%": { opacity: "0", transform: "scale(0.6) rotate(0deg)" }, "50%": { opacity: "0.9", transform: "scale(1.2) rotate(180deg)" } },
        "float-slow": { "0%,100%": { transform: "translateY(0) rotate(0deg)" }, "50%": { transform: "translateY(-14px) rotate(2deg)" } },
        "glow-pulse-soft": { "0%,100%": { boxShadow: "0 0 0 0 hsl(262 88% 62% / 0.4)" }, "50%": { boxShadow: "0 0 30px 8px hsl(292 90% 60% / 0.25)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "hero-in": "hero-in 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "blob-float": "blob-float 18s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "bounce-in": "bounce-in 0.6s cubic-bezier(0.34,1.56,0.64,1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "float-y": "float-y 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 5s ease infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "counter-pop": "counter-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
