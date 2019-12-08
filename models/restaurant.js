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
    contact              : String,
    address              : String                                                   
})

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/
//validate contact

/************** Getters ********************/

// ==<will be handled by hallController >===
// //set all halls
// RestaurantSchema
// .virtual('halls')
// .set(function (halls) {  
//     this.halls = halls;
// });

//set halls(add more)
RestaurantSchema
.virtual('add-halls')
.set(function (halls) {  
    halls.forEach(hall => {
        this.halls.push(hall);
    });
});



/************** Others ********************/


module.exports = {
    Restaurant
}