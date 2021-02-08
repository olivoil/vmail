/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const typography = require('@tailwindcss/typography')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.vue',
      './src/**/*.md',
      './src/**/*.js',
      './src/**/*.ts',
    ],
    options: {
      safelist: ['prose', 'prose-sm', 'm-auto'],
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      backgroundColor: ['disabled'],
      borderColor: ['active', 'disabled'],
      textColor: ['active', 'disabled'],
      opacity: ['dark', 'active', 'disabled'],
    }
  },
  darkMode: 'class',
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,

        dark: {
          "almost-black": "rgb(27, 39, 51)",
          "gray": "rgb(116, 116, 128)",
          "medium-gray": "rgb(51, 60, 71)",
          "light-gray": "rgb(39, 50, 62)",
          "neutral-light-gray": "rgb(39, 50, 62)",
          "blue": "rgb(80, 162, 255)",
          "purple": "rgb(134, 126, 255)",
          "peach": "rgb(242, 165, 117)",
          "green": "rgb(105, 240, 174)",
          "red": "rgb(255, 120, 120)",
          "yellow": "rgb(251, 225, 144)",
          "yellow-gradient-middle": "rgb(225, 203, 133)",
          "orange": "rgb(255, 184, 92)",
          "coral": "rgb(222, 137, 131)",
          "overlay": "rgb(32, 44, 56)",
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'inherit',
            a: {
              color: 'inherit',
              opacity: 0.75,
              '&:hover': {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
    },
  },
}
