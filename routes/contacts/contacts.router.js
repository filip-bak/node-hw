const express = require('express')
const ContactCtrl = require('./contacts.controller')
const {
  validateContact,
  validateContactStatus,
  validateQuery,
} = require('./contacts.validators')
const { authMiddleware } = require('../auth/auth.middleware')

const contactsRouter = express.Router()

contactsRouter.get(
  '/',
  authMiddleware,
  validateQuery,
  ContactCtrl.getAllContactsHandler
)

contactsRouter.get(
  '/:contactId',
  authMiddleware,
  ContactCtrl.getSingleContactHandler
)

contactsRouter.post(
  '/',
  authMiddleware,
  validateContact('post'),
  ContactCtrl.addContactHandler
)

contactsRouter.delete(
  '/:contactId',
  authMiddleware,
  ContactCtrl.removeContactHandler
)

contactsRouter.put(
  '/:contactId',
  authMiddleware,
  validateContact('put'),
  ContactCtrl.updateContactHandler
)

contactsRouter.patch(
  '/:contactId/favorite',
  authMiddleware,
  validateContactStatus,
  ContactCtrl.updateStatusContactHanlder
)

module.exports = contactsRouter
