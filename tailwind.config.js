/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        // Surfaces
        ink: {
          950: "#060914",
          900: "#0B1222",
          850: "#0F182B",
        },
        rule: {
          DEFAULT: "#1C283B",
          strong: "#2B3B54",
        },
        // Text
        fg: {
          DEFAULT: "#E6EDF7",
          muted: "#9AABC3",
          faint: "#6B7C96",
        },
        // Semantic accents: proposal / interactive, verified by code, waiting on a person
        signal: "#38BDF8",
        verified: "#2DD4BF",
        hold: "#FBBF24",
      },
      fontSize: {
        label: ["0.78125rem", { lineHeight: "1.4" }],
        lead: ["1.0625rem", { lineHeight: "1.6" }],
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};
