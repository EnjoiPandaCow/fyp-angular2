const crypto = require('crypto').randomBytes(256).toString('hex');

// module.exports allows us to export the entire object.
module.exports = {
    // uri: 'mongodb://localhost:27017/facilities-db',
    uri: 'mongodb://user1:user1@ds241869.mlab.com:41869/shyft-progressive-web-app',
    secret: crypto,
    db: 'shyft-progressive-web-app'
}