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


/************** Setters ********************/

//set availability(while making booking):
//mark free
TableSchema
.virtual('freed')
.set(() => {  
    this.available = true;
});
//mark booked
TableSchema
.virtual('booked')
.set(() => {   
    this.available = false;
});


/************** Utils ********************/
//How&where to store table availability status w.r.t. time???



//compile the Model
var Table = mongoose.model('Table', TableSchema);

module.exports = {
    Table
}