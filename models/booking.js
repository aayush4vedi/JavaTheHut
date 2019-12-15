var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    customer       : {type: Schema.Types.ObjectId, ref: 'Customer'},  
    dine           : {type: Schema.Types.ObjectId, ref: 'Dine'},  
    tableInstance  : [{type: Schema.Types.ObjectId, ref: 'TableInstance'}], 
    checkInTime    : {type: Date, default:Date.now()},         //mongooes' Date is actually a timestamp
    stayingMinutes : {type: Number, default:30},               //of minutes
})

BookingSchema
.virtual('checkOutTime')
.get(() =>{
    var stayingMilliSec = stayingMinutes*60*1000
    return new Date(checkInTime + stayingMilliSec);  
});

//compile the Model
var Booking = mongoose.model('Booking',BookingSchema)

module.exports = Booking
    