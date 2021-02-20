module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,ts}",
  ],
  coveragePathIgnorePatterns: [
    "jest.config.js",
    "coverage/*"
  ]
};