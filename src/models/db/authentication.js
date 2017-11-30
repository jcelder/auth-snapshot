const db = require('./db')

const createUser = (user) => {
  return db.one('INSERT INTO users (email, encrypted_password) VALUES (${email}, ${encrypted_password}) RETURNING id', user)
    .then((user_id) => {
      return db.none('INSERT INTO user_roles (user_id, roles_id) VALUES ($1, $2)', [user_id.id, 2])
    })
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
