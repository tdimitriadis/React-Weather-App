// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // Added assuming you use Jest (based on package.json)
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended", // Good practice for React hooks
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
  rules: {
    // Add any custom rules here later if needed
    // Example: 'react/prop-types': 'off' // If you're not using prop-types
  },
};
