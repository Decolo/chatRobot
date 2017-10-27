let webpack = require('webpack')
let path = require('path')

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
　　　　　test: /\.(png|jpg)$/,
　　　　　loader: 'url-loader?limit=8192'
　　　　},
      {
        test: /\.css/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }]
      }
    ]
  },
  devtool: 'source-map',
}