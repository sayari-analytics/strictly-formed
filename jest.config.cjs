module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  transform: { '\\.(ts|tsx)$': 'ts-jest' },
  moduleNameMapper: { '^~(.*)$': '<rootDir>/$1' },
}
