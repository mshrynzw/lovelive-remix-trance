import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        night: {
          deep: "#06182F", // deepest background
          base: "#0C274A", // mid background
          horizon: "#0F3D63", // lightest background layer
        },
        aurora: {
          cyan: "#00E5FF",
          mint: "#4FFFB0",
          ice: "#A6FFFF",
        },
        ink: {
          light: "#FFFFFF",
          soft: "#D8E6F8",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        jp: ["var(--font-noto-jp)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
        widest3: "0.5em",
      },
      backgroundImage: {
        "night-gradient":
          "linear-gradient(180deg, #06182F 0%, #0C274A 55%, #0F3D63 100%)",
        "aurora-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(79,255,176,0.18) 0%, rgba(0,229,255,0.10) 35%, rgba(6,24,47,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,229,255,0.25)",
        "glow-mint": "0 0 40px rgba(79,255,176,0.22)",
        card: "0 8px 32px rgba(0,10,25,0.45)",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scaleY(1)" },
          "50%": { transform: "translate3d(2%,-2%,0) scaleY(1.05)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        aurora: "aurora 14s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        "fade-in": "fade-in 1s ease-out forwards",
        "slide-up": "slide-up 1s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 3s linear infinite",
      },
      transitionTimingFunction: {
        "aurora-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
