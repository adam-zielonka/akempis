import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "indent": ["warn", 2, { "SwitchCase": 1 }],
      "linebreak-style": ["warn", "unix"],
      "quotes": ["warn", "double"],
      "semi": ["warn", "always"],
      "max-len": ["warn", { "code": 120 }],
    },
  },
];

export default eslintConfig;
