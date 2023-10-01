const express = require('express')
const ContactCtrl = require('./contacts.controller')
const {
  validateContact,
  validateContactStatus,
  validateQuery,
} = require('./contacts.validators')

const contactsRouter = express.Router()

contactsRouter.get('/', validateQuery, ContactCtrl.getAllContactsHandler)

contactsRouter.get('/:contactId', ContactCtrl.getSingleContactHandler)

contactsRouter.post('/', validateContact('post'), ContactCtrl.addContactHandler)

contactsRouter.delete('/:contactId', ContactCtrl.removeContactHandler)

contactsRouter.put(
  '/:contactId',
  validateContact('put'),
  ContactCtrl.updateContactHandler
)

contactsRouter.patch(
  '/:contactId/favorite',
  validateContactStatus,
  ContactCtrl.updateStatusContactHanlder
)

module.exports = contactsRouter
