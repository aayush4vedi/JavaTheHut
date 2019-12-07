var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var HallSchema = new Schema({
    // hallID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    name           : {type: String, default:'Main'},
    tables         : [{type: Schema.Types.ObjectId, ref: 'Table'}],            
    restaurant     : [{type: Schema.Types.ObjectId, ref: 'Restaurant'}],                    
})


//===============
//    Methods
//===============

/************** Getters ********************/
//get name
HallSchema
.virtual('name')
.get(function () {
    return this.name;  
});

//get tables
HallSchema
.virtual('tables')
.get(function () {
    return this.tables;  
});

//get restaurant
HallSchema
.virtual('restaurant')
.get(function () {
    return this.restaurant;  
});

/************** Setters ********************/
//set name
HallSchema
.virtual('name')
.set(function (name) {  
    this.name = name;
});

//==<won't this be handled in tableController?>==
// //add a new table
// HallSchema
// .virtual('tables')
// .set(function (tables) {  
//     tables.forEach(table => {
//         this.tables.push(table);
//     });
// });

//set restaurant
HallSchema
.virtual('restaurant')
.set(function (restaurant) {  
    this.restaurant = restaurant;
});

/************** Utils ********************/
// check if it's valid location to add new table


//compile the Model
var Hall = mongoose.model('Hall', HallSchema);

module.exports = {
    Hall
}