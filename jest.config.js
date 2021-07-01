module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf)$':
      '<rootDir>/src/test/fileMock.js',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@generated(.*)$': '<rootDir>/src/__generated__$1',
    '^src/lib(.*)$': '<rootDir>/src/lib$1',
  },
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
};
