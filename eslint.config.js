import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "eqeqeq": "warn",
      "no-console": "warn",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "prefer-const": "error",
      "semi": ["error", "always"],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "jsx-quotes": ["error", "prefer-double"],
      "react/react-in-jsx-scope": "error",
      "react/prop-types": "off",
      "no-magic-numbers": ["warn", { "ignore": [0, 1, 2] }],
    },
    languageOptions: {
      globals: globals.browser,
    },
    ignores: [
      "node_modules/",
      "dist/",
      "target/",
      "scripts/",
      "docker/",
      "*.config*",
      "src/components/ui/**"
    ],
  },

  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
