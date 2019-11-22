var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var menuSchema = new Schema({
    menuID          : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    name            : String              
})

var Menu = mongoose.model('Menu', menuSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Menu
}