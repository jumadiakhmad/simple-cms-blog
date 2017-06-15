const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./routes/index')
const cors = require('cors')
const logger = require('morgan')

app.use(cors())
require('dotenv').config()

app.set('port', process.env.PORT || 3000)

mongoose.connect('mongodb://localhost/hacktivpress-ucilubis')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/', index)

app.listen(app.get('port'), () => {
  console.log('Listening on port: '+app.get('port'));
})