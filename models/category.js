var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    categoryID      : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    name            : String              
})

var Category = mongoose.model('Category', categorySchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Category
}