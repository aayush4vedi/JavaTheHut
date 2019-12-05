var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var GoodSchema = new Schema({
    // goodID          : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    name            : String,
    linkToPurchase  : String,
    threshold       : Number,                                  // of units
    defaultPurchase : Number,                                  // of units
    quantityInStock : Number
})


//===============
//    Methods
//===============

/************** Getters ********************/
//get name
GoodSchema
.virtual('name')
.get(function () {
    return this.name;  
});

//get linkToPurchase
GoodSchema
.virtual('linkToPurchase')
.get(function () {
    return this.linkToPurchase;  
});

//get threshold
GoodSchema
.virtual('threshold')
.get(function () {
    return this.threshold;  
});

//get defaultPurchase
GoodSchema
.virtual('defaultPurchase')
.get(function () {
    return this.defaultPurchase;  
});

//get quantityInStock
GoodSchema
.virtual('linkToPurchase')
.get(function () {
    return this.quantityInStock;  
});

/************** Setters ********************/
//set name
GoodSchema
.virtual('name')
.set(function () {
    this.name = name;  
});

//set linkToPurchase
GoodSchema
.virtual('linkToPurchase')
.set(function () {
    this.linkToPurchase = linkToPurchase;  
});

//set threshold
GoodSchema
.virtual('threshold')
.set(function () {
    this.threshold = threshold;  
});

//set defaultPurchase
GoodSchema
.virtual('defaultPurchase')
.set(function () {
    this.defaultPurchase = defaultPurchase;  
});

//set quantityInStock
GoodSchema
.virtual('linkToPurchase')
.set(function () {
    this.quantityInStock = quantityInStock;  
});

/************** Others ********************/
// place purchase order

//notify when quantityInStock <=  defaultPurchase 


//compile the Model
var Good = mongoose.model('Good', GoodSchema);

module.exports = {
    Good
}