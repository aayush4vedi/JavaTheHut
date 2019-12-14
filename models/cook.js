//Employee instance where role = 'Cook'
var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var CookSchema = new Schema({
    employee        : {type: Schema.Types.ObjectId, ref: 'Employee', required: true}, 
    name            : {type: String, required: true} ,                                
    category        : [{type: Schema.Types.ObjectId, ref: 'Category'}],  //not mandatory to put
    attendance      : {type: Boolean, default: true, required: true}                                
}) 



//compile the Model
var Cook = mongoose.model('Cook', CookSchema);

module.exports = {
    Cook
}