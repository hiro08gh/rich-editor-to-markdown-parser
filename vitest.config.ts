import { defineConfig } from "vite";

export default defineConfig({
	test: {
		coverage: {
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
			thresholds: {
				statements: 90,
			},
		},
	},
});
