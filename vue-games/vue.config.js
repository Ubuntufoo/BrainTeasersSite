module.exports = {
  publicPath: 'https://brainteasers.herokuapp.com', // The base URL where your app will be deployed
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

