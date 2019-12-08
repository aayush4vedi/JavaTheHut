var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    // categoryID      : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    name            : {type: String, required: [true, '3<len<100'], min: 3, max: 100}           
})


//===============
//    Methods
//===============


//compile the Model
var Category = mongoose.model('Category', CategorySchema);

module.exports = {
    Category
}