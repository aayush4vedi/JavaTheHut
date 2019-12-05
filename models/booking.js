var mongoose = require('mongoose');

var Schema = mongoose.schema;

var BookingSchema = new Schema({
    // bookingID      : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later 
    customer       : {type: Schema.Types.ObjectId, ref: 'Customer'},  
    table          : [{type: Schema.Types.ObjectId, ref: 'Table'}], 
    checkInTime    : {type: Date, default:Date.now()},         //mongooes' Date is actually a timestamp
    stayingMinutes    : {type: Number, default:30},               //of minutes
})

//===============
//    Methods
//===============
/************** Getters ********************/
//get customer
BookingSchema
.virtual('customer')
.get(function () {
    return this.customer;  
});

//get tables
BookingSchema
.virtual('tables')
.get(function () {
    return this.table;  
});

//get checkInTime
BookingSchema
.virtual('checkInTime')
.get(function () {
    return this.checkInTime;  
});

//get stayingMinutes
BookingSchema
.virtual('stayingMinutes')
.get(function () {
    return this.stayingMinutes;  
});


/************** Setters ********************/
//set customer 
BookingSchema
.virtual('customer')
.set(function (customer) {
    this.customer = customer;  
});

//set tables
BookingSchema
.virtual('tables')
.set(function (tables) {
    this.tables = tables;  
});

//set checkInTime
BookingSchema
.virtual('checkInTime')
.set(function (checkInTime) {
    this.checkInTime = checkInTime;  
});

//set stayingMinutes
BookingSchema
.virtual('stayingMinutes')
.set(function (stayingMinutes) {
    this.stayingMinutes = stayingMinutes;  
});


//compile the Model
var Booking = mongoose.model('Booking',BookingSchema)

module.exports ={
    Booking
}