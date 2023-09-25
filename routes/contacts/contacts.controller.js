const { NotFoundError } = require('../../shared/errors.js')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('./contacts.service.js')

const getAllContactsHandler = async (_, res) => {
  try {
    const contacts = await listContacts()
    return res.json({ contacts })
  } catch (err) {
    console.error(err)
  }
}

const getSingleContactHandler = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)

    if (!contact) {
      throw new NotFoundError()
    }

    return res.json({ contact })
  } catch (err) {
    return next(err)
  }
}

const addContactHandler = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body)

    return res.status(201).json({ contact: newContact })
  } catch (err) {
    return next(err)
  }
}

const removeContactHandler = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)

    if (!contact) {
      throw new NotFoundError()
    }

    return res.json({ message: 'contact deleted' })
  } catch (err) {
    return next(err)
  }
}

const updateContactHandler = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)

    if (!contact) {
      throw new NotFoundError()
    }

    return res.json({ contact: contact })
  } catch (err) {
    next(err)
  }
}

const updateStatusContactHanlder = async (req, res, next) => {
  try {
    const contact = await updateStatusContact(req.params.contactId, req.body)

    if (!contact) {
      throw new NotFoundError()
    }

    return res.json({ contact: contact })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllContactsHandler,
  getSingleContactHandler,
  addContactHandler,
  updateContactHandler,
  updateStatusContactHanlder,
  removeContactHandler,
}
