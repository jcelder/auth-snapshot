const db = require('./db')

const createUser = (user) => {
  return db.none('INSERT INTO users (email, encrypted_password) VALUES (${email}, ${encrypted_password})', user)
    .catch((err) => {
      console.log(err.message)
    })
}

const getUserByEmail = (email) => {
  return db.oneOrNone('SELECT encrypted_password FROM users WHERE email = $1', email)
    .catch((err) => {
      console.log(err.message)
    })
}

module.exports = {
  createUser,
  getUserByEmail,
}
