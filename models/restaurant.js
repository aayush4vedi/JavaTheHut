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

/************** getters ********************/
//get name
RestaurantSchema
.virtual('name')
.get(function () {
    return this.name;  
});

//get active plan ID
RestaurantSchema
.virtual('active-plan-id')
.get(function () {
    return this.activePlanID;  
});

//get halls(add more)
RestaurantSchema
.virtual('halls')
.set(function (halls) {  
    halls.forEach(hall => {
        this.halls.push(hall);
    });
});

//get contact number
RestaurantSchema
.virtual('contact')
.get(function () {
    return this.contact;  
});

//get address
RestaurantSchema
.virtual('address')
.get(function () {
    return this.address;  
});

/************** Getters ********************/
//set name
RestaurantSchema
.virtual('name')
.set(function (name) {  
    this.name = name;
});

//set active plan ID
RestaurantSchema
.virtual('active-plan-id')
.set(function (activePlanID) {  
    this.activePlanID = activePlanID;
});

//set all halls
RestaurantSchema
.virtual('halls')
.set(function (halls) {  
    this.halls = halls;
});

//set contact number
RestaurantSchema
.virtual('halls')
.set(function (contact) {  
    this.contact = contact;
});

//set address
RestaurantSchema
.virtual('address')
.set(function (address) {  
    this.address = address;
});


/************** Others ********************/


module.exports = {
    Restaurant
}