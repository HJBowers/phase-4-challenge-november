const router = require( 'express' ).Router()
const db = require('../queries/index')

router.get('/:id', (req, res) => {
  userId = req.params.id
  if (req.session.user === undefined) {
    res.redirect('/login')
  } else {
    return db.getReviewsByUserId(req.session.user.id)
    .then((reviews) => {
      res.render('profile', {user: req.session.user, edit: false, reviews})
    })
  }
})

module.exports = router
