/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hsb: {
          DEFAULT: '#004B93',   // Official HSB Brand Blue from logo
          primary: '#004B93',   // Primary brand blue (#004B93)
          hover: '#003870',     // Deep Cobalt Blue hover state
          deep: '#002B5B',      // Institutional deep gradient anchor
          dark: '#001D3D',      // Darkest corporate anchor
          tint: '#EBF3FA',      // Soft tint / badge surface accent
          tintBorder: '#D6E6F5',// Soft border accent
          canvas: '#F4F7FA',    // Main app background (cool academic slate)
          navy: '#002B5B',      // Deep navy alias
          royal: '#004B93',     // Royal blue alias mapped to official #004B93
          blue: '#004B93',      // Primary blue alias
          sky: '#0284C7',       // Sky blue highlight
          cyan: '#38BDF8',      // Bright sky accent
          ice: '#EBF3FA',       // Soft tint surface
        },
        slate: {
          850: '#111B2E',
          900: '#0F172A',
          950: '#070C18',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'hsb': '0 4px 20px -2px rgba(10, 37, 64, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'hsb-lg': '0 10px 30px -4px rgba(10, 37, 64, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
        'hsb-glow': '0 0 20px -3px rgba(37, 99, 235, 0.35)',
      }
    },
  },
  plugins: [],
}
