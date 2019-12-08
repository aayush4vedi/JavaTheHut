var mongoose = require('mongoose');

var Schema = mongoose.schema;

var BookingSchema = new Schema({
    // bookingID      : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later 
    customer       : {type: Schema.Types.ObjectId, ref: 'Customer'},  
    table          : [{type: Schema.Types.ObjectId, ref: 'Table'}], 
    checkInTime    : {type: Date, default:Date.now()},         //mongooes' Date is actually a timestamp
    stayingMinutes : {type: Number, default:30},               //of minutes
})

//===============
//    Methods
//===============


//compile the Model
var Booking = mongoose.model('Booking',BookingSchema)

module.exports ={
    Booking
}