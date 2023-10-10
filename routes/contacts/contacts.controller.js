const {
  NotFoundError,
  UnauthorizedAccessError,
} = require('../../shared/errors.js')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('./contacts.service.js')

const getAllContactsHandler = async (req, res, next) => {
  try {
    const contacts = await listContacts(req.query, req.user._id)

    if (!contacts) {
      throw new NotFoundError()
    }

    return res.json({ contacts })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const getSingleContactHandler = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)

    if (!contact) {
      throw new NotFoundError()
    }

    if (!contact.owner || !req.user._id.equals(contact.owner._id)) {
      throw new UnauthorizedAccessError()
    }

    return res.json({ contact })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const addContactHandler = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body, req.user._id)

    if (!newContact.owner || !req.user._id.equals(newContact.owner._id)) {
      throw new UnauthorizedAccessError()
    }

    return res.status(201).json({ contact: newContact })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const removeContactHandler = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)

    if (!contact) {
      throw new NotFoundError()
    }

    if (!contact.owner || !req.user._id.equals(contact.owner._id)) {
      throw new UnauthorizedAccessError()
    }

    return res.json({ message: 'contact deleted' })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

const updateContactHandler = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)

    if (!contact) {
      throw new NotFoundError()
    }

    if (!contact.owner || !req.user._id.equals(contact.owner._id)) {
      throw new UnauthorizedAccessError()
    }

    return res.json({ contact: contact })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const updateStatusContactHanlder = async (req, res, next) => {
  try {
    const { favorite } = req.body
    const contact = await updateContact(req.params.contactId, { favorite })

    if (!contact) {
      throw new NotFoundError()
    }

    if (!contact.owner || !req.user._id.equals(contact.owner._id)) {
      throw new UnauthorizedAccessError()
    }

    return res.json({ contact: contact })
  } catch (err) {
    console.error(err)
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
