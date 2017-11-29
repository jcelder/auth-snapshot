const router = require('express').Router()
const db = require('../../models/authentication')

router.route('/signup')
  .get((req, res) => {
    res.render('authentication/signup')
  })
  .post((req, res) => {
    const user = req.body

    db.create(user)
      .then(() => {
        res.redirect('/login')
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
        if (!user || password !== user.encrypted_password) {
          res.redirect('/login')
        } else {
          res.redirect('/')
        }
      })
  })

module.exports = router
