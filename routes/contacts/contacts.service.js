const errors = require('../../shared/errors')
const Contact = require('./contacts.model')
const ApiFeatures = require('./contacts.api')

const listContacts = async (reqQuery, userId) => {
  try {
    const features = new ApiFeatures(Contact.find(), reqQuery)
      .filter({ owner: userId })
      .populate('owner', '_id')
      .favorite()
      .paginate()

    const contacts = await features.query

    if (contacts.length === 0 && reqQuery.page > 1) {
      throw new errors.PageNotFoundError()
    }
    if (contacts.length === 0) {
      throw new errors.ContactsNotFoundError()
    }

    return contacts
  } catch (err) {
    console.error(err)
    throw err
  }
}

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId).populate(
      'owner',
      '_id subscription'
    )
  } catch (err) {
    console.error(err)
    if (err.kind === 'ObjectId') {
      throw new errors.NotFoundError()
    }
    return null
  }
}

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove(contactId).populate(
      'owner',
      '_id subscription'
    )
  } catch (err) {
    console.error(err)
    if (err.kind === 'ObjectId') {
      throw new errors.NotFoundError()
    }
  }
}

const addContact = async (body, userId) => {
  try {
    const newContact = new Contact({ ...body, owner: userId })
    const updatedContact = await newContact.save()

    return updatedContact
  } catch (err) {
    console.error(err)
  }
}

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      throw new errors.NotFoundError()
    }
    console.error(err)
    return null
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body
    return await updateContact(contactId, { favorite })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      throw new errors.NotFoundError()
    }
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
