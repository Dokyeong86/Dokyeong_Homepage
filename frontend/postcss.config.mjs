// file: frontend/postcss.config.mjs

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
/*
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
*/