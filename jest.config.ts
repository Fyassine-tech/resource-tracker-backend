import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },

  // ⬇️ Only measure files you actively test today
  collectCoverage: true,
  collectCoverageFrom: [
    "src/app.controller.ts",
    "src/app.service.ts",
    "src/modules/projects/**/*.ts",
    "!src/modules/projects/**/*.module.ts",
    "!src/modules/projects/**/*.entity.ts",
    "!src/modules/projects/**/dto/**",
  ],
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: { statements: 80, branches: 65, functions: 60, lines: 80 },
  },

  clearMocks: true,
  restoreMocks: true,
};

export default config;
