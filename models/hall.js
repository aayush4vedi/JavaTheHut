var mongoose = require('mongoose');
var uuid = require('node-uuid');
import Table from './table'

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var HallSchema = new Schema({
    // hallID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    tables         : [{Table, Location}]                     //FIXME: this is super wrong
})


//===============
//    Methods
//===============

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/

//compile the Model
var Hall = mongoose.model('Hall', HallSchema);

module.exports = {
    Hall
}