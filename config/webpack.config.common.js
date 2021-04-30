'use strict'

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const helpers = require('./helpers')
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')

const webpackConfig = {
  node: {
    fs: 'empty'
  },
  entry: {
    main: helpers.root('src', 'main')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
      '@': helpers.root('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [helpers.root('src')],
        options: {
          plugins: [
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-optional-chaining'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              alias: {
                '../images': helpers.root('static/images')
              }
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              alias: {
                '../images': helpers.root('static/images')
              }
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              alias: {
                '../images': helpers.root('static/images')
              },
              data: '$site:' + (process.env.SITE || 'default') + ';'
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              data: '$site:' + (process.env.SITE || 'default') + ';'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: [/fonts/],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:7].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [/images/],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:7].[ext]',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: helpers.root('node_modules/leader-line/'),
        use: [
          {
            loader: 'skeleton-loader',
            options: {
              procedure: content => `${content}export default LeaderLine`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      VUE_APP_FAVICON: 'default'
    }),
    new HtmlPlugin({
      template: 'index.html',
      inject: true,
      chunksSortMode: 'dependency',
      meta: 'testing'
    }),
    new CopyPlugin([
      {
        from: 'static',
        to: 'static',
        ignore: ['.*']
      }
      // {
      //   from: 'unsupported.html',
      //   to: 'unsupported.html'
      // }
    ])
  ]
}

module.exports = webpackConfig
