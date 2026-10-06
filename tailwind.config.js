/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4EE',
        'ivory-deep': '#F0EDE5',
        beige: '#E8E2D6',
        'beige-light': '#EDE8DD',
        'beige-dark': '#D6CFBF',
        sage: '#8A9A82',
        'sage-light': '#A8B5A0',
        'sage-dark': '#6B7B62',
        'sage-muted': '#B5C0AD',
        charcoal: '#2D2A26',
        'charcoal-light': '#4A463F',
        'charcoal-muted': '#6B665E',
        'warm-orange': '#D97D54',
        'warm-orange-light': '#E89878',
        'warm-orange-dark': '#C26B45',
        'warm-orange-muted': '#F4DDD2',
        paper: '#FBF9F5',
        'paper-dark': '#F2EEE6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        editorial: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
