const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('./contacts.service.js')

const getAllContactsHandler = async (_, res) => {
  const contacts = await listContacts()
  return res.json({ contacts })
}

const getSingleContactHandler = async (req, res) => {
  const contact = await getContactById(req.params.contactId)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  return res.json({ contact })
}

const addContactHandler = async (req, res) => {
  const newContact = await addContact(req.body)

  return res.status(201).json({ contact: newContact })
}

const removeContactHandler = async (req, res) => {
  const contact = await removeContact(req.params.contactId)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  return res.json({ message: 'contact deleted' })
}

const updateContactHandler = async (req, res) => {
  const contact = await updateContact(req.params.contactId, req.body)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  return res.json({ contact: contact })
}

const updateStatusContactHanlder = async (req, res) => {
  const contact = await updateStatusContact(req.params.contactId, req.body)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  return res.json({ contact: contact })
}

module.exports = {
  getAllContactsHandler,
  getSingleContactHandler,
  addContactHandler,
  updateContactHandler,
  updateStatusContactHanlder,
  removeContactHandler,
}
