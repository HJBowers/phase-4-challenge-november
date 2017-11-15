const db = require( '../connection' )

// Albums
const getAlbums = () => {
  return db.any(`
    SELECT * FROM albums
    `, [])
    .catch( error => {
      console.error( {message: "Get all albums error", error, arguments: arguments})
      throw error
    })
}

const getAlbumByID = ( albumID ) => {
  return db.any(`
    SELECT * FROM albums
    WHERE id = $1
    `, [ albumID ])
    .catch( error => {
      console.error( {message: "Get album by ID", error, arguments: arguments})
      throw error
    })
}

// Reviews
const getReviewsReturnByDate = () => {
  return db.any(`
    SELECT
      reviews.*, users.name, albums.title
    FROM
      reviews
    INNER JOIN
      users
    ON
      reviews.user_id = users.id
    INNER JOIN
      albums
    ON
      reviews.album_id = albums.id
    ORDER BY
      date_created
    DESC
    `, [])
  }

const getReviewsByAlbumID = ( albumID ) => {
  return db.query(`
    SELECT
      reviews.*, users.name, albums.title
    FROM
      reviews
    INNER JOIN
      users
    ON
      reviews.user_id = users.id
    INNER JOIN
      albums
    ON
      reviews.album_id = albums.id
    WHERE
      album_id = $1
    `, [albumID])
  .catch( error => {
    console.error( {message: "Get all reviews error",error, arguments: arguments})
    throw error
  })
}

const getReviewsByUserId = (userId) => {
  return db.query(`
    SELECT
    reviews.*, users.name, albums.title
    FROM
    reviews
    INNER JOIN
    users
    ON
    reviews.user_id = users.id
    INNER JOIN
    albums
    ON
    reviews.album_id = albums.id
    WHERE
    reviews.user_id = $1
    `, [userId])
  }

const removeReview = (id) => {
  return db.none('DELETE FROM reviews WHERE id = $1', [id])
}

const createNewReview = (user_id, description, album_id) => {
  return db.query(`
    INSERT INTO
    reviews (user_id, description, album_id)
    VALUES
    ($1::INTEGER, $2::text, $3::INTEGER)
    RETURNING
    *
    `, [user_id, description, album_id])
  }

// Users
const createUser = (name, email, password) => {
  return db.one(`
    INSERT INTO
      users (name, email, password)
    VALUES
      ($1::text, $2::text, $3::text)
    RETURNING
      *
  `, [name, email, password])
  .catch((error) => {
     console.log('\nError in createUser query\n')
     throw error
  })
}

const findUser = (email) => {
  return db.oneOrNone(`
    SELECT
      *
    FROM
      users
    WHERE
      email = $1
  `, [email])
  .catch((error) => {
     console.log('\nError in findUser query\n')
     throw error
  })
}

// Search albums
const search = function(searchQuery){
  return db.query(`
    SELECT
      *
    FROM
      albums
    WHERE
      lower(title) =b $1::text
    `,
    [`%${searchQuery.toLowerCase().replace(/\s+/,'%')}%`])
    .catch(error => {
      console.error({message: 'Error occurred while executing search',
                     arguments: arguments});
      throw error});
}

module.exports = {
  getAlbums,
  getAlbumByID,
  getReviewsReturnByDate,
  getReviewsByAlbumID,
  getReviewsByUserId,
  removeReview,
  createNewReview,
  createUser,
  findUser,
  search
}
