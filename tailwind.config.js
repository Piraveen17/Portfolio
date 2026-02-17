/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        bg: {
          950: "#060814",
          900: "#0a0f24",
          800: "#111a3a"
        },
        blueglow: {
          500: "#2f7cff",
          400: "#5aa0ff"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(47,124,255,.25), 0 10px 30px rgba(47,124,255,.18)",
        glowStrong: "0 0 0 1px rgba(47,124,255,.35), 0 18px 60px rgba(47,124,255,.25)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        shimmer: "shimmer 10s ease-in-out infinite",
        floaty: "floaty 7s ease-in-out infinite"
      }
    },
  },
  plugins: [],
};
