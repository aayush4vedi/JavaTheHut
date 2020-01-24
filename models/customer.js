var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name            : String,
    email           : String,                                 
    phone           : String,
    // bookings        : [{type: Schema.Types.ObjectId, ref: 'Booking'}]   //prev orders too                                
})

//compile the Model
var Customer = mongoose.model('Customer',CustomerSchema)

module.exports = Customer