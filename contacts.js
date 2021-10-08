const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function fetchContactsFromDb() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function updateContactsDb(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data));
}

async function listContacts() {
  try {
    const contacts = await fetchContactsFromDb();
    console.table(contacts);
  } catch (error) {
    console.error(`❌ oops, unable to get contacts`);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fetchContactsFromDb();
    const idToSearch = +contactId;
    const contact = contacts.find((el) => el.id === idToSearch);
    if (!contact) {
      console.log(`⛔ contact with id ${contactId} is not found`);
      return
    }
    console.log(`✔ contact `, contact);
  } catch (error) {
    console.error(`❌ oops, unable to get contact`);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fetchContactsFromDb();
    const idToSearch = +contactId;
    const indexToRemove = contacts.findIndex((el) => el.id === idToSearch);
    if (indexToRemove < 0) {
      console.log(`⛔ contact with id ${contactId} does not exist`);
      return
    }
    contacts.splice(indexToRemove, 1);
    await updateContactsDb(contacts);
    console.log(`✔ contact with id ${contactId} removed `);
  } catch (error) {
    console.error(`❌ oops, unable to remove contact`);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fetchContactsFromDb();
    const id = nanoid(4);
    const newContact = {
      id,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await updateContactsDb(contacts);
    console.log(`✔ contact added with id ${id}`);
  } catch (error) {
    console.error(`❌ oops, unable to add contact`);
  }
}

const contactsOperations = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

module.exports = contactsOperations;
