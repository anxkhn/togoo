import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#F5F3EF",
        surface: "#FFFFFF",
        "surface-alt": "#F9F8F5",
        border: "#E8E4DC",
        "border-strong": "#D5CFC4",
        text: "#1A1714",
        muted: "#7D7671",
        "muted-light": "#A09A94",
        accent: "#2F6844",
        "accent-hover": "#235133",
        "accent-light": "#D4EDDF",
        "accent-subtle": "#EBF5EF",
        warning: "#B45309",
        "warning-light": "#FEF3C7",
        danger: "#B91C1C",
        "danger-light": "#FEE2E2",
      },
      borderRadius: {
        card: "14px",
        input: "8px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(26, 23, 20, 0.06), 0 1px 2px -1px rgba(26, 23, 20, 0.04)",
        "card-hover": "0 4px 12px 0 rgba(26, 23, 20, 0.10), 0 2px 4px -1px rgba(26, 23, 20, 0.06)",
        "card-elevated": "0 8px 24px 0 rgba(26, 23, 20, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(0.97)" }, "100%": { opacity: "1", transform: "scale(1)" } },
      },
    },
  },
  plugins: [],
};

export default config;
