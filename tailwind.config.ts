/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // só muda se você colocar "dark" manualmente no <html>
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", // azul fixo (exemplo) -> use aqui a sua cor padrão
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
