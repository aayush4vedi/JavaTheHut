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

/************** Others ********************/
// place purchase order

//notify when quantityInStock <=  defaultPurchase 


//compile the Model
var Good = mongoose.model('Good', GoodSchema);

module.exports = {
    Good
}