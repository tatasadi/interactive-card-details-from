import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "gradient-start": "hsl(249, 99%, 64%)",
        "gradient-end": "hsl(278, 94%, 30%)",
        red: "hsl(0, 100%, 66%)",
        "light-grayish-violet": "hsl(270, 3%, 87%)",
        "dark-grayish-violet": "hsl(279, 6%, 55%)",
        "very-dark-violet": "hsl(278, 68%, 11%)",
      },
    },
  },
  plugins: [],
}
export default config
