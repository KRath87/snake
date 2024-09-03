import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.strictTypeChecked,
	{
		rules: {
			"@typescript-eslint/no-non-null-assertion": "warn",
			"no-constant-binary-expression": "error",
			"no-duplicate-imports": "error",
			"no-template-curly-in-string": "error",
			"no-unreachable-loop": "error",
			camelcase: ["error", { ignoreDestructuring: true, ignoreImports: true }],
			curly: "error",
			"no-shadow": "error",
			"no-unused-expressions": "error",
			"no-var": "error",
			"prefer-const": "warn",
		},
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.json"],
			},
		},
	},
];
