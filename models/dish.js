var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var DishSchema = new Schema({
    // dishID          : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    name            : {type: String, required: [true, '3<len<100'], min: 3, max: 100},                                 
    description     : String,
    ingredients     : [String],                               //Major ingredients: to be manually entered for luring customers:Enter ' ' separated items 
    goods           : [{                                      // To be entered as key-val pairs
                        good        : Good,
                        quantity    : Number
                      }],
    category        : {type: Schema.Types.ObjectId, ref: 'Category'},
    price           : { type: Number, default:0},                                 
    isServing      :  {type: Boolean, default:false},
    veg             : {type: Boolean, default:true},                            //function returns string: 'veg'/'non-veg'
    eta             : {type: Number, default:15},       //in minutes                                 //of minutes
    // likes           : { type: Number, default:1},    //v2 stuff                              
    // dislikes        : { type: Number, default:0}     //v2 stuff                                              
})


//===============
//    Methods
//===============

/************** Getters ********************/
//get name
DishSchema
.virtual('name')
.get(function () {
    return this.name;  
});

//get description
DishSchema
.virtual('description')
.get(function () {
    return this.description;  
});

//get ingredients
DishSchema
.virtual('ingredients')
.get(function () {
    return this.ingredients;  
});

//get goods
DishSchema
.virtual('goods')
.get(function () {
    return this.goods;  
});

//get category
DishSchema
.virtual('category')
.get(function () {
    return this.category;  
});

//get price
DishSchema
.virtual('price')
.get(function () {
    return this.price;  
});

//get serving status
DishSchema
.virtual('is-serving')
.get(function () {
    return this.isServing;  
});

//get veg/non-veg type
DishSchema
.virtual('type')
.get(function () {
    return this.veg == true? 'veg':'non-veg';  
});

//get eta
DishSchema
.virtual('eta')
.get(function () {
    return this.eta  
});

//get likes
DishSchema
.virtual('likes')
.get(function () {
    return this.likes 
});

//get dislikes
DishSchema
.virtual('dislikes')
.get(function () {
    return this.dislikes 
});


/************** Setters ********************/
//set name
DishSchema
.virtual('name')
.set(function (name) {  
    this.name = name;
});

//set description
DishSchema
.virtual('description')
.set(function (description) {  
    this.description = description;
});

//set ingredients
DishSchema
.virtual('ingredients')
.set(function (ingredients) {
    var ingredients = ingredients.split(' ');
    this.ingredients = ingredients;
});

//set goods
DishSchema
.virtual('goods')
.set(function (goods) {  
    this.goods = goods;
});

//set category
DishSchema
.virtual('category')
.set(function (category) {  
    this.category =category;
});


//set price
DishSchema
.virtual('price')
.set(function (price) {  
    this.price =price;
});

//set serving status- On
DishSchema
.virtual('serving-on')
.set(function () {  
    this.isServing = true;
});

//set serving status- Off
DishSchema
.virtual('serving-off')
.set(function () {  
    this.isServing = false;
});

//set type: veg
DishSchema
.virtual('type-veg')
.set(function () {  
    this.veg = true;
});

//set type: non-veg
DishSchema
.virtual('type-nonveg')
.set(function () {  
    this.veg = false;
});

//set eta
DishSchema
.virtual('eta')
.set(function (eta) {  
    this.eta = eta;
});

//increase likes
DishSchema
.virtual('liked')
.set(function () {  
    this.likes = 1+ this.likes;
});

//increase dislikes
DishSchema
.virtual('disliked')
.set(function () {  
    this.dislikes = 1+ this.dislikes;
});


/************** Others ********************/


//compile the Model
var Dish = mongoose.model('Dish', DishSchema);

module.exports = {
    Dish
}