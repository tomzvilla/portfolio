/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0aff9d',
        darker: '#111111',
        secondary: '#232323',
        // primary: '#4CCD99',
        // darker: '#222831',
        // secondary: '#2C323C'
      },
      fontFamily: {
        'hack-nerd': ['"Hack Nerd Mono"', "sans-serif"],
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        },
        underlined: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%"
          }
        }
      },
      animation: {
        typing: "typing 2.2s steps(25) infinite alternate, blink .7s infinite",
        underlined: "underlined 0.5s ease-in"
      }
    },
  },
  plugins: [],
}

