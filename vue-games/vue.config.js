module.exports = {
  publicPath: '/static/dist/', // The base URL appended to the top-level domain (https://brainteasers.herokuapp.com/)
  outputDir: '../static/dist', // The path for where build files will be output, django side
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

