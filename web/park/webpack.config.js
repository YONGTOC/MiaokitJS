const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry: {
      index: [
        './src/app.js', './src/tool/iconfont.js'
      ]
    },                           // 入口文件
    output: {                                             // webpack打包后出口文件
        filename: 'app.js',                             // 打包后js文件名称
        path: path.resolve(__dirname, 'dist')   // 打包后自动输出目录
    },
    // webpack-dev-server 配置
    devServer: {
      historyApiFallback: true,
      hot:true,
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude:[/node_modules/],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                localsConvention: 'camelCase',
                modules: {
                  localIdentName: '[local]--[hash:base64:5]',
                }
              }
            }
          ]
        },
        {
          test: /\.css$/,
          exclude:[/src/],
          use: [
            'style-loader',
            'css-loader',
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['url-loader']
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['url-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'production',
        template: './index.html'    // 模板文件位置
      }),
      // hot 检测文件改动替换plugin
      new webpack.NamedModulesPlugin(),      
      new webpack.HotModuleReplacementPlugin()
      
    ]
  
}
