const router = require('express').Router()
const db = require('../../models/authentication')

router.route('/signup')
  .get((req, res) => {
    res.render('authentication/signup')
  })
  .post((req, res) => {
    const user = req.body
    console.log(req.body)
    db.create(user)
      .then(() => {
        res.redirect('/login')
      })
  })

router.route('/login')
  .get((req, res) => {
    res.render('authentication/login')
  })

module.exports = router
