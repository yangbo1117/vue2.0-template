
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: false,
        },
        before: require('./mock/mock-server.js'),
        // proxy:{//代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
        //     '/api':{//axios访问 /api ==  target + /api  
        //       target:'http://localhost:3000',
        //       changeOrigin:true,//创建虚拟服务器 
        //     },
        //     //https://douban.uieee.com/v2/movie/xxxxxxx
        //     '/douban':{// axios 访问 /douban == target + '/douban'
        //       target:'https://douban.uieee.com',
        //       changeOrigin:true,
        //       pathRewrite:{//路径替换
        //         '^/douban':'',// axios 访问/douban/v2 == target + "" + /v2
        //       }
        //     }
        //   }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    
}