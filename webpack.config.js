// import path from core Node module
const path = require('path');

// import copy plugin form Node module
const CopyWebpackPlugin = require('copy-webpack-plugin');

// How to export something to Node
module.exports = {
  // Define our mode
  mode: 'development',

  //Define root of entry project
  entry: './src/ts/app.ts',

  //Define root of output project
  output: {
    //Define filename  of our output
    filename: './js/bundle.js',

    //Define path  of our output
    path: path.resolve(__dirname, './dist'),
  },

  // Configration for dev server
  devServer: {
    static: './src',
  },

  // Help us to debug our codes
  devtool: 'inline-source-map',

  // Teach Node how to compile ts files
  module: {
    // Define an array for different rules for differenet files like .ts .css .jpg
    rules: [
      // Define arule for .ts .css by creating an object
      {
        // Define file's format (type)
        test: /\.ts$/,
        // show that what wepack these files should use for compile
        use: 'ts-loader',
        //Exclude node_modules files to compile
        exclude: /node_modules/,
      },
    ],
  },
  // Find .ts files and .js files to compile together
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // Using copy webpack plugin
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/css', to: 'css' },
        { from: 'src/images', to: 'images' },
        { from: 'src/index.html', to: 'index.html' },
      ],
    }),
  ],
};
