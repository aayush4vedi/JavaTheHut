var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var DineSchema = new Schema({
    orders          : [{type: Schema.Types.ObjectId, ref: 'Order'}],
    booking         : {type: Schema.Types.ObjectId, ref: 'Booking'},    
    bill            : {type: Schema.Types.ObjectId, ref: 'Bill'},
    waiter          : {type: Schema.Types.ObjectId, ref: 'Waiter'},    
    customer        : {type: Schema.Types.ObjectId, ref: 'Customer'},
    tableInstances  : [{type: Schema.Types.ObjectId, ref: 'TableInstance'}],
    date            : {type: Date, default:Date.now}, 
    status          : [{
                            status: {type : String,enum : ['Eating', 'Eaten', 'Completed'],default : 'Eating'},
                            time  : {type: Date, default: Date.now} 
                        }],
})

//===============
//    Methods
//===============
//TODO: 
// 1. handle reorders
// 2. handle cancelled orders
// 3. handle status updates
/************** Setters ********************/
//set orders(add more)
DineSchema
.virtual('neworder')
.set((newOrders)=> { 
    this.orders.push(newOrders);  
});

//set status
DineSchema
.virtual('setstatus')   //status{status,time}
.set(function (status) { 
    this.status.status = status;
    this.status.time  = Date.now;
});


/************** Utils ********************/

//compile the Model
var Dine = mongoose.model('Dine', DineSchema);

module.exports = Dine