var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var HallSchema = new Schema({
    // hallID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    name           : {type: String, default:'Main'},
    tables         : [{type: Schema.Types.ObjectId, ref: 'Table'}],            
    restaurant     : {type: Schema.Types.ObjectId, ref: 'Restaurant'},                    
})


//===============
//    Methods
//===============

/************** Utils ********************/
// check if it's valid location to add new table


//compile the Model
var Hall = mongoose.model('Hall', HallSchema);

module.exports = Hall
