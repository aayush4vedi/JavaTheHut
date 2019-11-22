var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var billSchema = new Schema({
    billID         : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    amount         : Number,
    paid           : { type: Boolean, default: false}
})

var Bill = mongoose.model('Bill', billSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Bill
}