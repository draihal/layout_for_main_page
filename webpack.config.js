const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');

module.exports = {
    entry: [
        './src/js/index.js',
        './src/css/style.scss'
    ],
    output: {
        // path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        filename: './js/bundle.js'
    },
    // mode: 'development',
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /(node_modules)/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, 'src/css'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            // minimize: true, ???
                            url: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sourceMap: true
                        }
                    }
                ]
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg)$/,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 outputPath: 'images'
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.(woff|woff2|ttf|otf|eot)$/,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 outputPath: 'fonts'
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/html/includes'),
                // use: ['raw-loader']
                use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/bundle.css",
            // filename: "bundle.css",
            // allChunks: true,
        }),
        new CopyWebpackPlugin([
            {
                from: './src/fonts',
                to: './fonts'
            },
            {
                from: './src/favicon',
                to: './favicon'
            },
            {
                from: './src/images',
                to: './images'
            },
            {
                from: './src/uploads',
                to: './uploads'
            }
        ]),
    ].concat(htmlPlugins)
};