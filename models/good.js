var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var goodSchema = new Schema({
    goodID          : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    name            : String,
    linkToPurchase  : String,
    threshold       : Number,                                  // of units
    defaultPurchase : Number,                                  // of units
    quantityInStock : Number
})

var Good = mongoose.model('Good', goodSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Good
}