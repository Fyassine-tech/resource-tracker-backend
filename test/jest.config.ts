// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: { "ts-jest": { tsconfig: "tsconfig.spec.json" } },
  // optional but nice:
  testMatch: ["**/?(*.)+(spec|e2e-spec).ts"],
};

export default config;
