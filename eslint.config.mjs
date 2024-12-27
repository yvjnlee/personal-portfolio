import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config} */
const config = {
  ignores: [
    ".next/**", // explicitly ignore .next folder
    "node_modules/**" // also ignore node_modules just to be safe
  ],
  rules: {
    ...pluginJs.configs.recommended.rules,
    ...tseslint.configs.recommended.rules
  },
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    }
  }
};

export default config;