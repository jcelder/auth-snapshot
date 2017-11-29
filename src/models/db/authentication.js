const db = require('./db')

const createUser = (user) => {
  return db.none('INSERT INTO users (email, encrypted_password) VALUES (${email}, ${password})', user)
    .catch((err) => {
      console.log(err.message)
    })
}

module.exports = {
  createUser,
}
