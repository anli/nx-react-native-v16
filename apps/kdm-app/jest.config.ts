module.exports = {
  coverageDirectory: '../../coverage/apps/kdm-app',
  displayName: 'kdm',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  moduleNameMapper: {
    '\\.svg$': '@nx/react-native/plugins/jest/svg-mock'
  },
  passWithNoTests: true,
  preset: 'react-native',
  resolver: '@nx/jest/plugins/resolver',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve('react-native/jest/assetFileTransformer.js'),
    '^.+.(js|ts|tsx)$': ['babel-jest', {
      configFile: __dirname + '/.babelrc.js'
    }]
  }
};
