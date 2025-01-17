/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      screens: {
        sm: "700px",
        md: "1024px",
        lg: "1440px",
      },
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

