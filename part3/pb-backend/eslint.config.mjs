import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin-js";

export default [
  js.configs.recommended,
  {
    plugins: {
      "@stylistic/js": stylistic,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2], // 2 spaces indentation
      "@stylistic/js/linebreak-style": ["error", "unix"], // Unix line endings which is \n
      "@stylistic/js/quotes": ["error", "single"], // Single quotes for strings
      "@stylistic/js/semi": ["error", "never"], // No semicolons at the end of statements
      eqeqeq: "error", // Enforce the use of === and !==
      "no-trailing-spaces": "error", // Disallow trailing whitespace at the end of lines
      "object-curly-spacing": ["error", "always"], // Enforce consistent spacing inside braces
      "arrow-spacing": ["error", { before: true, after: true }], // Enforce consistent spacing before and after the arrow in arrow functions
      "no-console": "off", // Allow the use of console statements
    },
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
  },
  {
    ignores: ["dist/**"],
  },
];
