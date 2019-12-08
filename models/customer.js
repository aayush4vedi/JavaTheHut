var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name            : String,
    email           : String,                                 
    phone           : String,                                 
    // prevOrders      : [Order]   //Not doing rn
})

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