import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: [ "**/*.{js,mjs,cjs,jsx}" ] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect"  
      }
    },
    rules: {
      "array-bracket-spacing": [ "error", "always" ],  
      "object-curly-spacing": [ "error", "always" ],  
      "space-in-parens": [ "error", "always" ],
      "react/prop-types": "off"  
    }
  }
];
