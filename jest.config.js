const { resolve } = require('path');

const root = resolve(__dirname);
require('@hapi/joi');
require('md5');

module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testMatch: ['<rootDir>/test/unit/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
    '@config/(.*)': '<rootDir>/src/core/config/$1',
    '@interfaces/(.*)': '<rootDir>/src/core/interfaces/$1',
    '@factories/(.*)': '<rootDir>/src/core/factories/$1',
    '@middlewares/(.*)': '<rootDir>/src/core/middlewares/$1',
    '@utils/(.*)': '<rootDir>/src/core/utils/$1',
    '@functions/(.*)': '<rootDir>/src/functions/$1',
    '@repositories/(.*)': '<rootDir>/src/core/repositories/$1',
    '@services/(.*)': '<rootDir>/src/core/services/$1'
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/core/interfaces/enum/**'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
