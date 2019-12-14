//Employee instance where role = 'Cook'
var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var CookSchema = new Schema({
    employee        : {type: Schema.Types.ObjectId, ref: 'Employee'}, 
    name            : String,                                
    category        : {type: Schema.Types.ObjectId, ref: 'Category'}, 
    attendance      : {type: Boolean, default: true}                                
}) 



//compile the Model
var Cook = mongoose.model('Cook', CookSchema);

module.exports = {
    Cook
}