var mongoose = require('mongoose');
var uuid = require('node-uuid');
import Hall from './hall'

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    restaurantID         : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    halls                : [Hall],
    name                 : String,                                  //TODO: add more fields                     
})

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Restaurant
}