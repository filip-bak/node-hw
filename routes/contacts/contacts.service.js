const { ObjectId } = require('bson')
const { Contact } = require('./contacts.model')

const listContacts = async () => {
  try {
    return await Contact.find()
  } catch (err) {
    console.error(err.message)
  }
}

const getContactById = async (contactId) => {
  try {
    // Handle the case where contactId is not a valid ObjectId
    if (!ObjectId.isValid(contactId)) {
      return null
    }

    return await Contact.findById(contactId)
  } catch (err) {
    console.error(err)
    return null
  }
}

const removeContact = async (contactId) => {
  try {
    // Handle the case where contactId is not a valid ObjectId
    if (!ObjectId.isValid(contactId)) {
      return null
    }

    return await Contact.findByIdAndRemove(contactId)
  } catch (err) {
    console.error(err)
  }
}

const addContact = async (body) => {
  try {
    const newContact = new Contact(body)
    const updatedContact = await newContact.save({ validateBeforeSave: true })

    return updatedContact
  } catch (err) {
    console.error(err)
  }
}

const updateContact = async (contactId, body) => {
  try {
    // Handle the case where contactId is not a valid ObjectId
    if (!ObjectId.isValid(contactId)) {
      return null
    }

    return await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    })
  } catch (err) {
    console.error(err)
    return null
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body
    return await updateContact(contactId, { favorite })
  } catch (err) {
    console.log(err.message)
    return null
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
