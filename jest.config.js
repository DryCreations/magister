module.exports = {
  "transform": {
    "^.+\\.svelte$": "jest-transform-svelte",
    "^.+\\.js$": "babel-jest",
    "^.+\\.stories\\.[jt]sx?$": "<rootDir>node_modules/@storybook/addon-storyshots/injectFileName",
  },
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@storybook/.*\\.svelte$))',
  ],
  moduleFileExtensions: ["js", "svelte", "json"],
  testPathIgnorePatterns: ["node_modules"],
  bail: false,
  verbose: true,
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
