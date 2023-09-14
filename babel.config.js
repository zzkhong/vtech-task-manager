module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          components: './src/components',
          context: './src/context',
          modules: './src/modules',
          routes: './src/routes',
          styles: './src/styles',
          utils: './src/utils',
        },
      },
    ],
  ],
};
