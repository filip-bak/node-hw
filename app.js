const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/contacts/contacts.router')
const ErrorHandler = require('./middleware/errorHandler')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(400).json({ message: `Invalid path ${req.path}` })
})

app.use(ErrorHandler)

module.exports = app
