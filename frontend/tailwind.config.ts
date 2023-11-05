/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  darkMode: "class",
  plugins: [require("tailwindcss-animate")],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pop-in": "popInBounce 1s ease-out forwards"
      },
      backgroundImage: {
        "auth-dark": "url('/images/auth-background-dark.svg')",
        "auth-light": "url('/images/auth-background-light.svg')"
      },
      borderRadius: {
        "2lg": "10px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)"
      },
      boxShadow: {
        autofill: "0 0 0 30px #161B22 inset",
        "homepage-glow":
          "0px 25.03851890563965px 54.95192337036133px 0px rgba(40, 49, 60, 0.30)",
        "homepage-user":
          "17.30769157409668px 20.769229888916016px 34.61538314819336px 0px rgba(57, 57, 188, 0.16)",
        navbar: "0px 3px 20px 0px rgba(29, 35, 44, 0.23)",
        "price-card": "0px 10px 40px 0px rgba(40, 49, 60, 0.30)",
        "video-card": "7.55442px 10.57619px 37.77213px 0px rgba(40, 49, 60, 0.10)"
      },
      colors: {
        black: {
          100: "#0D1117",
          200: "#161B22",
          300: "#1F2428",
          400: "#242C38",
          DEFAULT: "#000"
        },
        grey: {
          100: "#969BA5",
          200: "#55616D"
        },
        primary: "#79B4A9",
        primaryHover: "#619087",
        secondary: "#EE7674",
        text: "#424B54",
        white: {
          400: "#A3B3BC",
          500: "#A4B8D5",
          800: "#D0DFFF",
          DEFAULT: "#FFF"
        }
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"]
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      },
      maxWidth: {
        "8xl": "1440px"
      }
    },
    screens: {
      "3xl": "1700px",
      lg: "1024px",
      md: "768px",
      sm: "640px",
      xl: "1220px",
      xs: "400px"
    }
  }
};
