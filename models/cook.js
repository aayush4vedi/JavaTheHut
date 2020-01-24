//Employee instance where role = 'Cook'
var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var CookSchema = new Schema({
    cookID          : String,                                 
    employee        : {type: Schema.Types.ObjectId, ref: 'Employee', required: true}, 
    // category        : [{type: Schema.Types.ObjectId, ref: 'Category'}],  //TODO: Add this
}) 



//compile the Model
var Cook = mongoose.model('Cook', CookSchema);

module.exports = Cook