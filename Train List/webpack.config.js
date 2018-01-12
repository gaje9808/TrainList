// webpack.config.js

module.exports = {
  devtool: 'eval',
  entry: './app-client.js',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
               presets: ['es2015', 'react'],
            },
         },
      ],
   },
};
