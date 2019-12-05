var mongoose = require('mongoose');

var Schema = mongoose.schema;

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
/************** Getters ********************/
// get name
CustomerSchema
.virtual('name')
.get(function () {
    return this.name;  
});

// get email
CustomerSchema
.virtual('email')
.get(function () {
    return this.email;  
});

// get phone
CustomerSchema
.virtual('phone')
.get(function () {
    return this.phone;  
});

/************** Setters ********************/
// set name
CustomerSchema
.virtual('name')
.set(function () {
    this.name = name ;  
});

// set email
CustomerSchema
.virtual('email')
.set(function () {
    this.email = email ;  
});

// set phone
CustomerSchema
.virtual('phone')
.set(function () {
    this.phone = phone ;  
});


//compile the Model
var Customer = mongoose.model('Customer',CustomerSchema)

module.exports ={
    Customer
}