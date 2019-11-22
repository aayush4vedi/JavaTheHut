var mongoose = require('mongoose');

var Schema = mongoose.schema;

var bookingSchema = new Schema({
    bookingID      : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    customer       : {type: Schema.Types.ObjectId, ref: 'Customer'},  //FIXME: is this correct?
    table          : [{type: Schema.Types.ObjectId, ref: 'Table'}],  //FIXME: is this correct?
    date           : Date,
    stay           : Number,                                  //of hours

})

var Booking = mongoose.model('Booking',bookingSchema)

module.exports ={
    Booking
}