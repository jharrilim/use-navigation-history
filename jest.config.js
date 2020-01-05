/**
 * @type {jest.InitialOptions}
 */
module.exports = {
  roots: [
    '<rootDir>/test'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts']
};
