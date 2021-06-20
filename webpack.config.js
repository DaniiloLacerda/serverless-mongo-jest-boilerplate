const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal ? 'cheap-module-eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      '@config': path.resolve(__dirname, './src/', 'core', 'config'),
      '@factories': path.resolve(__dirname, './src/', 'core', 'factories'),
      '@middlewares': path.resolve(__dirname, './src/', 'core', 'middlewares'),
      '@models': path.resolve(__dirname, './src/', 'core', 'models'),
      '@services': path.resolve(__dirname, './src/', 'core', 'services'),
      '@repositories': path.resolve(__dirname, './src/', 'core', 'repositories'),
      '@utils': path.resolve(__dirname, './src/', 'core', 'utils'),
      '@functions': path.resolve(__dirname, './src/', 'functions'),
      '@test': path.resolve(__dirname, './test/'),
      '@interfaces': path.resolve(__dirname, './src/', 'core', 'interfaces'),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [],
};
