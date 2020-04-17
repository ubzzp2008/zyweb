
module.exports = {
    // 访问资源的基本路径，一般不需要进行修改，此处还有疑问，正在验证中
    //publicPath: '/',  //publicPath取代了baseUrl
    publicPath: './',
    // 打包之后输出文件目录
    outputDir: 'static',
    assetsDir: 'static', // 打包之后静态资源目录 (js, css, img, fonts)
    // 打包后的启动文件。
    indexPath: 'index.html',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置 配置高于chainWebpack中关于css loader的配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        //extract:false,
        extract: {
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[name].css"
        },
        // 开启 CSS source maps?是否在构建样式地图，false将提高构建速度
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {

            // 给 sass-loader 传递选项
            // sass: {
            //     // @/ 是 src/ 的别名
            //     // 所以这里假设你有 `src/variables.sass` 这个文件
            //     // 注意：在 sass-loader v7 中，这个选项名是 "data"
            //     prependData: `@import "~@assets/css/app.scss"`
            // },
            // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
            // 因为 `scss` 语法在内部也是由 sass-loader 处理的
            // 但是在配置 `data` 选项的时候
            // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
            // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
            // scss: {
            //     prependData: '@import "./assets/css/app.scss"'
            // },
            // 给 less-loader 传递 Less.js 相关选项
            // less: {
            //     // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
            //     // `primary` is global variables fields name
            //     globalVars: {
            //         primary: '#fff'
            //     }
            // }

        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
        // requireModuleExtension:false
    },

    configureWebpack: { // webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `static/js/[name].js`,
            chunkFilename: `static/js/[name].js`
        },
    },
    // pages: {
    //     index: {
    //       // page 的入口
    //       entry: 'src/main.js',
    //       // 模板来源
    //       template: 'public/index.html',
    //       // 在 dist/index.html 的输出
    //       filename: 'index.html',
    //       // 当使用 title 选项时，
    //       // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //       title: 'Index Page',
    //       // 在这个页面中包含的块，默认情况下会包含
    //       // 提取出来的通用 chunk 和 vendor chunk。
    //       chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     // 当使用只有入口的字符串格式时，
    //     // 模板会被推导为 `public/subpage.html`
    //     // 并且如果找不到的话，就回退到 `public/index.html`。
    //     // 输出文件名会被推导为 `subpage.html`。
    //     subpage: 'src/subpage/main.js'
    // },    
    // eslint-loader 是否在保存的时候检查
    //lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // runtimeCompiler: true, //关键点在这  原来的 Compiler 换成了 runtimeCompiler

    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md   webpack链接API，用于生成和修改webapck配置
    // chainWebpack: config => {

    //   },
    // configureWebpack: (config) => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    //     if(debug) { // 开发环境配置
    //         config.devtool = 'cheap-module-eval-source-map'
    //     } else { // 生产环境配置

    //     }
    // if (process.env.NODE_ENV === 'production') {
    //     // 为生产环境修改配置...
    //   } else {
    //     // 为开发环境修改配置...
    //   }
    //     Object.assign(config, { // 开发生产共同配置
    //         resolve: {
    //             alias: {
    //                 '@': path.resolve(__dirname, './src') //设置路径别名
    //                 //...
    //             }
    //         }
    //     })

    //     //  引入uglifyjs-webpack-plugin
    //     let UglifyPlugin = require('uglifyjs-webpack-plugin');

    //     if (process.env.NODE_ENV == 'production') {
    //         // 为生产环境修改配置
    //         config.mode = 'production'
    //         // 将每个依赖包打包成单独的js文件
    //         let optimization = {
    //             minimizer: [new UglifyPlugin({
    //                 uglifyOptions: {
    //                     warnings: false,
    //                     compress: {
    //                         drop_console: true,
    //                         drop_debugger: false,
    //                         pure_funcs: ['console.log']
    //                     }
    //                 }
    //             })]
    //         }
    //         Object.assign(config, {
    //             optimization
    //         })
    //     } else {
    //         // 为开发环境修改配置
    //         config.mode = 'development'
    //     }


    // },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},



    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores 构建时开启多进程处理babel编译
    //parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,

    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    //pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        // open: process.platform === 'darwin',
        /* 自动打开浏览器 */
        open: true,
        // host: '0.0.0.0',
        port: 8848,
        // https: false,
        // hotOnly: false,
        // proxy: null, // 设置代理
        // }
    },
    // devServer: {
    //     hot: true
    // }

    // 第三方插件配置
    // pluginOptions: {

    // }
}