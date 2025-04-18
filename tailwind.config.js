/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        background: "#F5F6FA",
        bgla: {
          bg: "#F5F6FA",
        },
        primary: {
          DEFAULT: "#1677FF",
          light: "#4096FF",
          lighter: "#91CAFF",
          dark: "#0056b3",
        },
        secondary: {
          DEFAULT: "#001529",
          light: "#1D2939",
        },
        success: {
          DEFAULT: "#52C41A",
          light: "#D9F7BE",
          border: "#B7EB8F",
        },
        warning: {
          DEFAULT: "#FAAD14",
          light: "#FFF1B8",
          border: "#FFE58F",
        },
        error: {
          DEFAULT: "#FF4D4F",
          light: "#FFCCC7",
          border: "#FFA39E",
        },
        pending: {
          DEFAULT: "#1677FF",
          light: "#E6F4FF",
          border: "#91CAFF",
        },
        neutral: {
          DEFAULT: "rgba(0, 0, 0, 0.88)",
          secondary: "rgba(0, 0, 0, 0.65)",
          tertiary: "rgba(0, 0, 0, 0.45)",
          quaternary: "rgba(0, 0, 0, 0.25)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Text", "sans-serif"],
      },
      boxShadow: {
        card: "0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.03)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};