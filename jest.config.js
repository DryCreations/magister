module.exports = {
  transform: {
    "^.+\\.svelte$": "jest-transform-svelte",
    "^.+\\.js$": "babel-jest",
    "^.+\\.stories\\.[jt]sx?$": "<rootDir>node_modules/@storybook/addon-storyshots/injectFileName",
  },
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  moduleFileExtensions: ["js", "svelte", "json"],
  testPathIgnorePatterns: ["node_modules"],
  bail: false,
  verbose: true,
  transformIgnorePatterns: ["node_modules"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
