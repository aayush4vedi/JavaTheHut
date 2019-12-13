var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var TableInstanceSchema = new Schema({
    table        : {type: Schema.Types.ObjectId, ref: 'Table'}, 
    booking      : {type: Schema.Types.ObjectId, ref: 'Booking'},
    isFree       : {type: Boolean, default:true}
}) 


//compile the Model
var TableInstance = mongoose.model('TableInstance', TableInstanceSchema);

module.exports = {
    TableInstance
}