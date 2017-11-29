const authentication = require('./db/authentication')

module.exports = {
  create: authentication.createUser,
}
