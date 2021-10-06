const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')
const contacts = require('./db/contacts.json')
// const contactsPath = ;

async function listContacts() {
  try {
    console.table(contacts)
  } catch (error) {
    console.error(`❌ oops, unable to get contacts`)
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const contact = contacts.find((el) => el.id === contactId)
    if (!contact) {
      console.log(`⛔ contact with id ${contactId} is not found`)
    }
    console.log(`✔ contact `, contact)
  } catch (error) {
    console.error(`❌ oops, unable to get contact`)
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const indexToRemove = contacts.findIndex((el) => el.id === contactId)
    if (indexToRemove < 0) {
      console.log(`⛔ contact with id ${contactId} does not exist`)
    }
    contacts.splice(indexToRemove, 1)
    await updateContacts(contacts)
    console.log(`✔ contact removed `)
  } catch (error) {
    console.error(`❌ oops, unable to remove contact`)
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts()
    const id = nanoid(4)
    const newContact = {
      id,
      name,
      email,
      phone,
    }
    contacts.push(newContact)
    await updateContacts(contacts)
    console.log(`✔ contact added with id `, id)
  } catch (error) {
    throw new Error(`❌ oops, unable to add contact`)
  }
}

const contactsOperations = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}

module.exports = contactsOperations
