module.exports = {
  verbose: false,
  bail: 5,

  cacheDirectory: '/tmp/jest/',
  clearMocks: true,
  coverageDirectory: '<rootDir>/coverage/',
  setupFilesAfterEnv: ['<rootDir>/jest_config/setup_tests.js'],
  roots: ['<rootDir>/src/', '<rootDir>/jest_config/check_jest_setup/'],
  preset: 'react-native',

  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
    '<rootDir>/node_modules/',
  ],
};
