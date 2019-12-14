var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    // restaurantID         : { type: String, default: uuid.v1 },     //app central restaurant ID's to be implemented later
    name                 : String,
    activePlanID         : {type: Number, default:1},                                  
    halls                : [{type: Schema.Types.ObjectId, ref: 'Hall'}],
    phone                : String,
    address              : String                                                   
})

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/
//validate contact


module.exports = {
    Restaurant
}