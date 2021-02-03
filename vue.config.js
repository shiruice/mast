const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path');

const compress = new CompressionWebpackPlugin({
    filename: info => {
        return `${info.path}.gz${info.query}`
    },
    algorithm: 'gzip',
    threshold: 10240,
    test: new RegExp(
        '\\.(' +
        ['js'].join('|') +
        ')$'
    ),
    minRatio: 0.8,
    deleteOriginalAssets: false
});
// 判断环境
const isPord = process.env.NODE_ENV === 'production';

const externals = {
    'Vue': "vue",
    'VueRouter': "vue-router",
    'Vuex': "vuex",
    'Axios': "axios"
};
module.exports = {
    publicPath: './',
    productionSourceMap: false,
    assetsDir: 'statick',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        open: true,
        compress: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/': {
                // target: 'http://47.94.238.148',  //目标接口域名
                // target: 'https://shoppemobiletest3.66123123.com',  //目标接口域名
                target: 'https://shoppemobiletest2.66123123.com',  //目标接口域名
                // target: 'https://shoppemobilepre.66123123.com',  //目标接口域名
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/'
                }
            },
        }
    },
    configureWebpack: config => {
        if (isPord) {
            // 为生产环境修改配置
            config.mode = 'production';
            var optimizationPro = {
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    minSize: 20000, // 依赖包超过20000bit将被单独打包
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1];
                                return `npm.${packageName.replace("@", "")}`;
                            }
                        }
                    }
                },
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            warnings: false,
                            compress: {
                                warnings: false,
                                drop_console: true, // 是否删除代码中所有的console语句
                                drop_debugger: false,
                                pure_funcs: ["console.log"] // 移除console
                            }
                        },
                    })
                ]
            };
            Object.assign(config, {
                optimization: optimizationPro
            });
            // 开启gzip压缩
            config.plugins.push(compress);
            config.devtool = 'cheap-module-source-map';
        } else {
            // 为开发环境修改配置
            config.mode = 'development';
            var optimizationDev = {
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    minSize: 20000, // 依赖包超过20000bit将被单独打包
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1];
                                return `npm.${packageName.replace("@", "")}`;
                            }
                        }
                    }
                }
            };
            Object.assign(config, {
                optimization: optimizationDev
            });
            config.devtool = 'cheap-module-eval-source-map';
        }
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch');
        config.optimization.minimize(true);
        // config.module
        //     .rule('images')
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options({
        //         bypassOnDebug: true
        //     })
        //     .end()
        config.externals = externals;
    },
    css: {
        sourceMap: !isPord,
        extract: isPord,
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 100,
                        propList: ['*']
                    })
                ]
            },
            less: {
                modifyVars: {
                    // 可以通过 less 文件覆盖（文件路径为绝对路径）
                    hack: `true; @import "${path.join(__dirname, 'src/style/commonStyle.less')}";`,
                },
                javascriptEnabled: true
            },
        }
    }
};