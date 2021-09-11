module.exports =  {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:5000',
                changeOrign: true,
                logLevel: 'debug',
                pathRewrite: {'^/api': '/'},
            }

        }

    }

}