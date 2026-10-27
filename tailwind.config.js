/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          '"IBM Plex Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      colors: {
        paper: "#ECEFEA",
        surface: "#F6F8F5",
        ink: "#16201C",
        mute: "#4B5A54",
        line: "#C3CCC5",
        // Semantic states. Each has a text color, a soft fill, and a console variant.
        proposed: { DEFAULT: "#7A4E00", soft: "#F2E4BD", console: "#E8B84A" },
        committed: { DEFAULT: "#0E6B58", soft: "#CFE6DE", console: "#4FD1B0" },
        sourced: { DEFAULT: "#274A85", soft: "#D3DDEF", console: "#8FB2F2" },
        rejected: { DEFAULT: "#A32F2A", soft: "#F1D3CF", console: "#F08A82" },
        // Dark console (system trace)
        console: { DEFAULT: "#16201C", raised: "#1F2C27", line: "#33443D", text: "#E3EAE5", mute: "#9DB0A6" },
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
      },
      fontSize: {
        label: ["0.8125rem", { lineHeight: "1.25rem" }],
        code: ["0.9375rem", { lineHeight: "1.5rem" }],
        body: ["1.0625rem", { lineHeight: "1.65rem" }],
        lead: ["1.25rem", { lineHeight: "1.85rem" }],
      },
    },
  },
  plugins: [],
};
