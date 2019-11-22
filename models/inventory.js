var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var inventorySchema = new Schema({
    inventoryID          : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    goods               : [{type: Schema.Types.ObjectId, ref: 'Good'}]
})

var Inventory = mongoose.model('Inventory', inventorySchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Inventory
}