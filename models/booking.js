var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    // bookingID      : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later 
    customer       : {type: Schema.Types.ObjectId, ref: 'Customer'},  
    dine           : {type: Schema.Types.ObjectId, ref: 'Dine'},  
    table          : [{type: Schema.Types.ObjectId, ref: 'Table'}], 
    checkInTime    : {type: Date, default:Date.now()},         //mongooes' Date is actually a timestamp
    stayingMinutes : {type: Number, default:30},               //of minutes
})
//TODO: added a new field `dine`

//===============
//    Methods
//===============


//compile the Model
var Booking = mongoose.model('Booking',BookingSchema)

module.exports ={
    Booking
}