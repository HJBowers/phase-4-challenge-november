const db = require( '../connection' )

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

module.exports = {
  getAlbums,
  getAlbumByID,
  getReviewsReturnByDate,
  getReviewsByAlbumID,
  createUser,
  findUser
}
