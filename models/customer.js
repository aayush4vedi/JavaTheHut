var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name            : String,
    email           : String,                                 
    phone           : String,
    booking         : {type: Schema.Types.ObjectId, ref: 'Booking'}                                
    // prevOrders      : [Order]   //Not doing rn
})
//TODO: added `booking` in model.Modify controllers everywhere

//===============
//    Methods
//===============


/************** Assertions ********************/
//Assertion for email

//Assertion for phone


//compile the Model
var Customer = mongoose.model('Customer',CustomerSchema)

module.exports ={
    Customer
}