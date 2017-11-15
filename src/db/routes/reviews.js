const router = require( 'express' ).Router()
const moment = require('moment')
const db = require('../queries/index')

router.get('/reviews', (req, res) =>{
  const page = req.query.page || 1
  const limit = 4
  const offset = (page - 1) * limit
  const numPageLinks = 4
  const pageStart = page
  const lastPage = numPageLinks + pageStart
  const numPageLinksLimit = numPageLinks * limit
  const isMoreRows = db.numRowsAfterOffset(offset, numPageLinksLimit)
  db.getAllReviews(limit, offset)
  .then((reviews) => {
    res.render('allReviews', {reviews, user: req.session.user, moment, pageStart, lastPage})
  })
  .catch(error => res.status(500).render('error', {error}))
})

router.get('/albums/:albumID/reviews/new', (req, res) => {
  albumID = req.params.albumID
  return db.getAlbumByID(albumID)
  .then((album) => {
    album = album[0]
    res.render('newReview', {album, user: req.session.user,  message: ""})
  })
  .catch(error => res.status(500).render('error', {error}))
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
