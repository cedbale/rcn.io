const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.dev')
const constants = require('./webpack/constants')

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  output: {
    path: '/'
  },
  stats: {
    colors: true
  }
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', function(req, res, next) {
  //this reads index.html from webpacks file system which is "in-memory" in case of dev server
  //also note that "index.html" is generated by HtmlWebpackPlugin from template
  const filename = path.join(compiler.outputPath, 'index.html')

  compiler.outputFileSystem.readFile(filename, function(err, result) {
    if (err) {
      return next(err)
    }

    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(constants.DEV_SERVER_PORT, 'localhost', function(err) {
  if (err) {
    console.log(err) // eslint-disable-line  no-console
    return
  }

  console.info('Listening at http://localhost:' + constants.DEV_SERVER_PORT) // eslint-disable-line  no-console
})
