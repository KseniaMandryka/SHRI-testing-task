module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/test/unit/*.test.jsx", "<rootDir>/test/unit/pages/*.test.jsx"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironmentOptions: { url: "http://localhost:3000/hw/store/" },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};