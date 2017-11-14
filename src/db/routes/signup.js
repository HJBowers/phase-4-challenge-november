const router = require( 'express' ).Router()
const db = require('../queries/index')

router.get('/', (req, res) => {
  res.render('signUp', {user: null, message: '' })
})

router.post('/', (req, res) => {
  const { name, email, password, confirm_password } = req.body
  if(name && email && password && confirm_password) {
    if (password !== confirm_password) {
      res.render('signUp', {user: null, message: 'Passwords don\'t match'})
    } else {
      db.findUser( email )
      .then( existingMember => {
        if(existingMember) {
          res.status(200).render('signup', {user: null, message: "user already exists"} )
        } else {
          db.createUser(name, email, password)
          .then( user => {
            req.session.user = user
            res.redirect(`/users/${user.id}`)
          })
          .catch(error => {
            res.status(500).render('error', {error})
            throw error
          })
        }
      })
    }
  } else {
    res.render('signUp', {user: null, message: "Fields cannot be empty"})
  }
})

module.exports = router
