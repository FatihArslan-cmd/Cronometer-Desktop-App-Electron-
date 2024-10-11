module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/, // matches .ts or .tsx files
    exclude: /node_modules/, // excludes node_modules
    use: {
      loader: 'babel-loader', // use babel-loader to transpile the files
      options: {
        presets: [
          '@babel/preset-env', // transpiles ES6+ to ES5
          '@babel/preset-react', // transpiles JSX
          '@babel/preset-typescript', // transpiles TypeScript
        ],
      },
    },
  },
];
