const express = require('express')
const path = require('path')
const sslRedirect = require('heroku-ssl-redirect')

const app = express()

app.use(sslRedirect())
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/ping', function (req, res) {
  return res.send('pong')
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(process.env.PORT || 8080)
