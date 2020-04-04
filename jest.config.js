module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  preset: 'ts-jest/presets/js-with-babel',
  modulePaths: ['<rootDir>'],
  // setupFilesAfterEnv: ['<rootDir>jest/setup.js'],
  // testEnvironment: 'jest-environment-jsdom-fifteen',
};
