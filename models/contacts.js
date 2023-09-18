const { nanoid } = require('nanoid')
const path = require('path')
const contactsPath = path.resolve(__dirname, 'contacts.json')

const { getParsedData, writeFile } = require('../utils/fileUtils')

const listContacts = async () => {
  try {
    const contacts = await getParsedData(contactsPath)
    return contacts
  } catch (err) {
    console.error(err.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await getParsedData(contactsPath)

    return contacts.find(({ id }) => id === contactId)
  } catch (err) {
    console.error(err)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await getParsedData(contactsPath)

    const newContacts = contacts.filter(({ id }) => id !== contactId)
    const deletedContact = contacts.find(({ id }) => id === contactId) || null

    await writeFile(contactsPath, newContacts)
    return deletedContact
  } catch (err) {
    console.error(err)
  }
}

const addContact = async (body) => {
  try {
    const contacts = await getParsedData(contactsPath)

    const newContact = {
      id: nanoid(),
      ...body,
    }
    contacts.push(newContact)

    await writeFile(contactsPath, contacts)
    return newContact
  } catch (err) {
    console.error(err)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getParsedData(contactsPath)
    const newContacts = contacts.map((contact) => {
      return contact.id === contactId ? { ...contact, ...body } : contact
    })

    const updatedContact =
      newContacts.find(({ id }) => id === contactId) || null

    await writeFile(contactsPath, newContacts)
    return updatedContact
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
