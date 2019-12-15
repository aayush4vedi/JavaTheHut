var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var InventorySchema = new Schema({
    // inventoryID          : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    goods               : [{type: Schema.Types.ObjectId, ref: 'Good'}]
})


//===============
//    Methods
//===============


//compile the Model
var Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory