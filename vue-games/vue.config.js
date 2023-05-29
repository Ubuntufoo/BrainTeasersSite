module.exports = {
  publicPath: 'brainteasers.herokuapp.com/static', // The base URL where your app will be deployed
  indexPath: '../../templates/_base_vue.html', // The path for the generated index file

  configureWebpack: {
    devServer: {
      devMiddleware: {
        writeToDisk: true
      }
    }
  }
};
// publicPath: 'http://localhost:8080', // The base URL where your app will be deployed
