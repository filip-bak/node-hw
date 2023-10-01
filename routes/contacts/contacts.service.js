const { ObjectId } = require('bson')
const errors = require('../../shared/errors')
const Contact = require('./contacts.model')
const { isBoolean } = require('./contacts.validators')
const ApiFeatures = require('./contacts.api')

const listContacts = async (reqQuery) => {
  try {
    const features = new ApiFeatures(Contact.find(), reqQuery)
      .filter()
      .favorite()
      .paginate()

    const contacts = await features.query

    const skip = (+reqQuery.page - 1) * +reqQuery.limit
    const { error } = features

    if (error) {
      if (error instanceof errors.InvalidQueryParamsError) {
        throw new errors.InvalidQueryParamsError()
      }
      // if (new Error.CastError()) {
      //   throw new InvalidQueryParamsError()
      // }
    }

    if (reqQuery.page) {
      const contactsCount = await Contact.countDocuments(
        features.query._conditions
      )
      if (skip >= contactsCount) {
        throw new errors.PageNotFoundError()
      }
    }

    if (!contacts || contacts.length === 0) {
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
    const updatedContact = await newContact.save()

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
    console.error(err.message)
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
