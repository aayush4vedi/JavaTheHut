var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var TableSchema = new Schema({
    // tableID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    capacity        : {type: Number, default:4},
    available       : {type: Boolean, default:true},
    location        : {                                 //doing coordinates for now(UI will show size acc. to capacity but locaion is fixed)
                        x: {type: Number, default:0},
                        y: {type: Number, default:0},
                        z: {type: Number, default:0},       // for multiple hall restaurants
                     },                               
    hall            : {type: Schema.Types.ObjectId, ref: 'Hall'}
})


//===============
//    Methods
//===============
/************** Assertions ********************/
//check availability status before booking

//check space clashing before adding a new seat

/************** Getters ********************/
//get capacity
TableSchema
.virtual('capacity')
.get(function () {
    return this.capacity;  
});

//get availability
TableSchema
.virtual('is-available')
.get(function () {
    return this.available;  
});

//get location
TableSchema
.virtual('location')
.get(function () {
    return this.location;  
});

//get (located in which) hall_id
TableSchema
.virtual('hall')
.get(function () {
    return this.hall._id;  
});

/************** Setters ********************/
// set capacity
TableSchema
.virtual('capacity')
.set(function (capacity) {  
    this.capacity = capacity;
});

//set availability(while making booking):
//mark free
TableSchema
.virtual('freed')
.set(function () {  
    this.available = true;
});
//mark booked
TableSchema
.virtual('booked')
.set(function () {  
    this.available = false;
});

//set location
TableSchema
.virtual('location')
.set(function (location) {  
    this.location = location;
});

//set located in which hall
TableSchema
.virtual('hall-id')
.set(function (hallID) {  
    this.hall._id = hallID;
});


/************** Utils ********************/
//How&where to store table availability status w.r.t. time???



//compile the Model
var Table = mongoose.model('Table', TableSchema);

module.exports = {
    Table
}