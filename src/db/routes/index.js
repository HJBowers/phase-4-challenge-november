const router = require( 'express' ).Router()
const albums = require( './albums')
// const reviews = require( './reviews')
const signup = require('./signup')
// const login = require('./login')
const profile = require('./profile')

router.use('/signup', signup)
// router.use('/login', login)
router.use('/users', profile)
router.use( '/', albums )
// router.use( '/', reviews )


router.get('/logout', (req, res) => {
  req.session.destroy( () => {
    res.redirect('/')
  })
})

module.exports = router
