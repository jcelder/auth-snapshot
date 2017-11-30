const router = require('express').Router()
const db = require('../../models/authentication')
const bcrypt = require('bcrypt')

/**
 * Encrypts a password using bcrypt
 * @param {string} plaintextPassword
 * @returns {Promise} - Promise which resolves to a hashed password
 */
const encryptUserPassword = (plaintextPassword) => {
  return bcrypt.genSalt(10)
    .then((salt) => {
      return bcrypt.hash(plaintextPassword, salt)
    })
}

router.route('/signup')
  .get((req, res) => {
    res.render('authentication/signup')
  })
  .post((req, res) => {
    const email = req.body.email
    const plaintextPassword = req.body.password

    encryptUserPassword(plaintextPassword)
      .then((hash) => {
        const newUser = {
          email: email,
          encrypted_password: hash,
        }
        db.create(newUser)
          .then(() => {
            res.redirect('/login')
          })
      })
  })

router.route('/login')
  .get((req, res) => {
    res.render('authentication/login')
  })
  .post((req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.getUser(email)
      .then((user) => {
        if (!user) {
          res.render('authentication/login', {errors: 'Username or Password Invalid'})
        } else {
          bcrypt.compare(password, user.encrypted_password)
            .then((isEqual) => {
              if (isEqual) {
                req.session.sid = email
                res.redirect('/')
              } else {
                res.render('authentication/login', {errors: 'Username or Password Invalid'})
              }
            })
        }
      })
  })

router.route('/logout')
  .get((req, res) => {
    req.session.destroy()
    res.redirect('/login')
  })

module.exports = router
