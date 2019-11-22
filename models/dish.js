var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var dishSchema = new Schema({
    dishID          : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    name            : String,                                 
    description     : String,
    ingredients     : [String],                               //TODO: make a ingredient model later? 
    goods           : [{
                        good        : Good,
                        quantity    : Number
                      }],
    category        : { 
                        type: String, 
                        enum: ['Chinese','South Indian', 'North Indian','Punjabi','Itallian', 'All'] , //TODO: make it dynamic
                        default: 'All' 
                      },
    price           : Number,                                 //TODO: function to set price
    canCook         : Boolean,
    veg             : Boolean,
    eta             : Number,                                 //of minutes
    likes           : Number,                                 //TODO: write function for these two's calculation
    dislikes        : Number                                                        
})

var Dish = mongoose.model('Dish', dishSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Dish
}