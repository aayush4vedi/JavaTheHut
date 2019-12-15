var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var TableSchema = new Schema({
    // tableID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    name            : {type: String, default: 'Table1'},
    capacity        : {type: Number, default:4},
    available       : {type: Boolean, default:true},
    location        : {                                 //doing coordinates for now(UI will show size acc. to capacity but locaion is fixed)
                        x: {type: Number, default:0},
                        y: {type: Number, default:0},
                        z: {type: Number, default:0},       // for multiple hall restaurants
                     },                               
    hall            : {type: Schema.Types.ObjectId, ref: 'Hall'},
    waiter          : {type: Schema.Types.ObjectId, ref: 'Waiter'}
}) 


//===============
//    Methods
//===============
/************** Assertions ********************/
//check availability status before booking

//check space clashing before adding a new seat

//compile the Model
var Table = mongoose.model('Table', TableSchema);

module.exports = Table