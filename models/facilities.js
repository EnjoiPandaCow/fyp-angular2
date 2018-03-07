const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
const Schema     = mongoose.Schema;

const facilitiesSchema = new Schema ({
   facility: { type: String, required: true }
});

module.exports = mongoose.model('Facilities', facilitiesSchema);