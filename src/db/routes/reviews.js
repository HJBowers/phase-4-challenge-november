const router = require( 'express' ).Router()
const db = require('../queries/index')

router.get('/albums/:albumID/reviews/new', (req, res) => {
  albumID = req.params.albumID
  if(!req.session.user) {
    req.session.originalPage = req.url
    res.redirect('/login')
  } else {
    return db.getAlbumByID(albumID)
    .then((album) => {
      album = album[0]
      res.render('newReview', {album, user: req.session.user,  message: ""})
    })
    .catch(error => res.status(500).render('error', {error}))
  }
})

router.post('/newReview', (req, res) => {
  if(!req.session.user) {
    res.redirect('/login')
  } else {
    const userId = req.session.user.id
    const { description, album_id } = req.body
    if(description) {
      return db.createNewReview(userId, description, album_id)
      .then((review) => {
        res.redirect(`/albums/${album_id}`)
      })
    } else {
      return db.getAlbumByID(albumID)
      .then((album) => {
        res.render('newReview', {album, user: req.session.user,  message: "Description field cannot be empty"})
      })
    }
  }
})

router.delete('/review/delete/:id', (req, res) => {
  return db.removeReview(req.params.id)
  .then(() => res.json({message: 'successful delete'}))
  .catch(error => res.status(500).render('error', {error}))
})


module.exports = router
