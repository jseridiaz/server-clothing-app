require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routerMain = require('./api/routes/mainRoute')

const app = express()
app.use(cors())
app.use(express.static('public'))

app.use('/', routerMain)
app.use('*', (req, res, next) => {
  res.status(404).json('Route not found')
})

app.listen(process.env.PORT, () => {
  console.log('Listening in port: ' + process.env.PORT)
})
