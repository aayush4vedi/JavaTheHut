var mongoose = require('mongoose');
var uuid = require('node-uuid');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    orderID         : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    date            : {
                            type: Date,  
                            default: Date.now
                        },                                  
    status          : [{
                            status : String,
                            Time   : Time                      //FIXME:
                    }],
    booking         : {type: Schema.Types.ObjectId, ref: 'Booking'},    
    server          : {type: Schema.Types.ObjectId, ref: 'Server'},    
    items           : [{
                            dish      : {type: Schema.Types.ObjectId, ref: 'Booking'},    
                            quantity  : Number                     
                    }],
    bill            : {type: Schema.Types.ObjectId, ref: 'Bill'},
    isComplete      : Boolean  
})

var Order = mongoose.model('Order', orderSchema);

//===============
//    Methods
//===============
/************** Assertions ********************/

/************** Getters ********************/

/************** Setters ********************/

/************** Others ********************/


module.exports = {
    Order
}