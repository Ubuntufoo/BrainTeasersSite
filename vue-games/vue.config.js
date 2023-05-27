module.exports = {
  // publicPath: 'http://localhost:8080', // The base URL where your app will be deployed
  publicPath: '',
  outputDir: '../static/dist', // The path for where files will be output when the app is built
  indexPath: '../../templates/_base_vue.html', // The path for the generated index file

  configureWebpack: {
    devServer: {
      devMiddleware: {
        writeToDisk: true
      }
    }
  }
};

