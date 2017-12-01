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

// not sure why the formatting is as is below
const getUserByEmail = (email) => {
  return db.oneOrNone(`SELECT users.encrypted_password, array_agg(user_roles.roles_id) AS "roles"
                         FROM users JOIN user_roles ON users.id = user_roles.user_id
                         WHERE users.email = $1 GROUP BY users.encrypted_password`, email)
    .catch((err) => {
      console.log(err.message)
    })
}

module.exports = {
  createUser,
  getUserByEmail,
}
