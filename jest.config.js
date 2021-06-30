module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf)$':
      '<rootDir>/src/test/fileMock.js',
  },
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
};
