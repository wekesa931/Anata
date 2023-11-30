/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindcss = require('tailwindcss')
const postcssPresetEnv = require('postcss-preset-env')
const autoprefixer = require('autoprefixer')
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  plugins: [postcssPresetEnv(), tailwindcss, autoprefixer()],
}
