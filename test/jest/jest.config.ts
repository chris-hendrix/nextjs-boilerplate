const jestConfig = {
  preset: 'ts-jest',
  rootDir: '../../',
  verbose: true,
  testEnvironment: 'node',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: { '@/*/(.*)': '<rootDir>/src/$1' }
}

export default jestConfig
