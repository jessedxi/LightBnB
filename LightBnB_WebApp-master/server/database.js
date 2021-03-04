const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});




const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1`, [email])
  .then(res => res.rows[0]);
}

exports.getUserWithEmail = getUserWithEmail;


const getUserWithId = function(id) {
  return pool.query(`
  SELECT * 
  FROM users
  WHERE id = $1`, [id])
  .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;



const addUser =  function(user) {
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password]).then(res => res.rows[0]);
};
exports.addUser = addUser;



const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`select properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2`, [guest_id, limit])
  .then(res => {
    return res.rows;
  });
};

exports.getAllReservations = getAllReservations; 


const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];
  
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
 LEFT JOIN property_reviews ON properties.id = property_id
  WHERE TRUE
  `;

  
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city ILIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(parseFloat(options.minimum_price_per_night) * 100);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(parseFloat(options.maximum_price_per_night) * 100);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }
 
  queryString += `
  GROUP BY properties.id`;
 
  if(options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += ` HAVING avg(rating) >= $${queryParams.length} `;
  }
  queryParams.push(limit);
  queryString += ` ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;



const addProperty = function(property) {
  return pool.query(`
    INSERT INTO properties (
      owner_id, 
      title, 
      description, 
      thumbnail_photo_url, 
      cover_photo_url, 
      cost_per_night, 
      parking_spaces, 
      number_of_bathrooms, 
      number_of_bedrooms, 
      country, 
      street, 
      city, 
      province, 
      post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `, [
    property.owner_id, 
    property.title, 
    property.description, 
    property.thumbnail_photo_url, 
    property.cover_photo_url, 
    property.cost_per_night, 
    property.parking_spaces, 
    property.number_of_bathrooms, 
    property.number_of_bedrooms, 
    property.country, 
    property.street, 
    property.city, 
    property.province, 
    property.post_code, 
    ])
    .then(res => res.rows[0]);
};
exports.addProperty = addProperty;
