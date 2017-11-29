const authentication = require('./db/authentication')

module.exports = {
  create: authentication.createUser,
  getUser: authentication.getUserByEmail,
}
