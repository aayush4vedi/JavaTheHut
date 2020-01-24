var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var DishInstanceSchema = new Schema({
    dish            : {type: Schema.Types.ObjectId, ref: 'Dish'},
    // order           : {type: Schema.Types.ObjectId, ref: 'Order'},
    quantity        : {type: Number, default:1}                                 
})


//===============
//    Methods
//===============

/************** Others ********************/


//compile the Model
var DishInstance = mongoose.model('DishInstance', DishInstanceSchema);

module.exports = DishInstance