'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const helpers = require('./helpers')
const commonConfig = require('./webpack.config.common')

const environment = require(`./env/${process.env.SITE || 'default'}/dev.env`)

const devServer = {
  compress: true,
  disableHostCheck: true,
  historyApiFallback: true,
  clientLogLevel: 'none',
  host: '0.0.0.0',
  hot: true,
  open: true,
  overlay: true,
  port: 8000,
  stats: {
    normal: true
  }
}
const webpackConfig = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin(environment),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      // 清除控制台原有的信息
      clearConsole: true,
      // 打包成功之后在控制台给予开发者的提示
      compilationSuccessInfo: {
        messages: [
          `开发环境启动成功，项目运行在: http://${devServer.host}:${devServer.port}`
        ]
      },
      // 打包发生错误的时候
      onErrors: () => {
        console.log('打包失败')
      }
    })
  ],
  devServer
})

module.exports = webpackConfig
