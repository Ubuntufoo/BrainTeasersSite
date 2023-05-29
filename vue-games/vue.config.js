module.exports = {
  // publicPath: 'http://localhost:8080', // The base URL where your app will be deployed
  publicPath: 'brainteasers.herokuapp.com', // The base URL where your app will be deployed
  indexPath: '../../templates/_base_vue.html', // The path for the generated index file

  configureWebpack: {
    devServer: {
      devMiddleware: {
        writeToDisk: true
      }
    }
  }
};

