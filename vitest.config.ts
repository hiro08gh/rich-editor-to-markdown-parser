import { defineConfig } from "vite";

export default defineConfig({
	test: {
		include: ["tests/unit/**/*.test.ts"],
		coverage: {
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
			thresholds: {
				statements: 90,
				functions: 90,
				branches: 90,
				lines: 90,
			},
		},
	},
});
