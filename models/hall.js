var mongoose = require('mongoose');
var uuid = require('node-uuid');
import Table from './table'

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var hallSchema = new Schema({
    hallID         : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    tables         : [{Table, Location}]                     //FIXME: this is super wrong
})

var Hall = mongoose.model('Hall', hallSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Hall
}