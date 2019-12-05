var mongoose = require('mongoose');
var uuid = require('node-uuid');
import Hall from './hall';
import Restaurant from './restaurant';

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var tableSchema = new Schema({
    tableID         : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    capacity        : Number,
    free            : Boolean,
    location        : [Number],                               //TODO: figure out how to store location in hall
    hall            : {type: Schema.Types.ObjectId, ref: 'Hall'},
    restaurant      : {type: Schema.Types.ObjectId, ref: 'Restaurant'}                  
})

var Table = mongoose.model('Table', tableSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Table
}