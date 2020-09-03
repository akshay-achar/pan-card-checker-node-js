const express = require('express')
const app = express()

const PORT = process.env.PORT
const path = require('path')
const viewsPath = path.join(__dirname, '../templates')
const publicDirectoryPath = path.join(__dirname, '../public')
const homepageRouters = require('./routers/homepage')

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(homepageRouters)

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log('Server listening at ' + PORT)
})
