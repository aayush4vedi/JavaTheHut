var mongoose     = require('mongoose'),
    Comment      = require('./comment');

var hotelSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
    // comment      : Comment[]
});
module.exports = mongoose.model('Hotel', hotelSchema);