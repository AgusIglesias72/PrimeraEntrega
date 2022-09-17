const path = require('path')
const nodeExternals = require('webpack-node-externals')

class AccessDependenciesPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(
      'AccessDependenciesPlugin',
      (compilation) => {
        compilation.hooks.finishModules.tap(
          'AccessDependenciesPlugin',
          (modules) => {
            /*
        |---------------------------------------------------
        | Here we go, `modules` is what we're looking for!
        |---------------------------------------------------
        */
          }
        )
      }
    )
  }
}

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [new AccessDependenciesPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
