const crypto = require('crypto').randomBytes(256).toString('hex');

// module.exports allows us to export the entire object.
module.exports = {
    uri: 'mongodb://localhost:27017/facilities-db',
    secret: crypto,
    db: 'facilities-db'
}