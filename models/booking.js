var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    customer       : {type: Schema.Types.ObjectId, ref: 'Customer'},  
    // dine           : {type: Schema.Types.ObjectId, ref: 'Dine'},
    size           : {type: Number, default:2},   
    table          : {type: Schema.Types.ObjectId, ref: 'Table'}, 
    // tableInstance  : [{type: Schema.Types.ObjectId, ref: 'TableInstance'}], 
    // checkInTime    : {type: Date, default:Date.now()},         //mongooes' Date is actually a timestamp
    checkInTime    : {  
                        type: String,
                        // enum: [], 
                        require: true
                    },         //this is a compromise.But will work for MVP
    // stayingMinutes : {type: Number, default:30},               //of minutes
    stayingMinutes : {                                              //this is a compromise.But will work for MVP
                        type: String, 
                        // enum: ['30','60','90','120','150','180'], 
                        default: '30',
                        require: true
                        },               
})

BookingSchema
.virtual('checkOutTime')
.get(() =>{
    // var stayingMilliSec = stayingMinutes*60*1000
    // return new Date(checkInTime + stayingMilliSec);  
    //TODO: write logic here
});

//compile the Model
var Booking = mongoose.model('Booking',BookingSchema)

module.exports = Booking
    