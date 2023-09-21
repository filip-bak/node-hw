const express = require('express')
const {
  getAllContactsHandler,
  getSingleContactHandler,
  addContactHandler,
  removeContactHandler,
  updateContactHandler,
} = require('./contacts.controller')
const { validateContact } = require('./contacts.validators')

const router = express.Router()

router.get('/', getAllContactsHandler)

router.get('/:contactId', getSingleContactHandler)

router.post('/', validateContact('post'), addContactHandler)

router.delete('/:contactId', removeContactHandler)

router.put('/:contactId', validateContact('put'), updateContactHandler)

module.exports = router
