var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var DineSchema = new Schema({
    // dineID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    orders          : [{type: Schema.Types.ObjectId, ref: 'Order'}],
    status          : {
                            status: {type : String,enum : ['Eating', 'Eated', 'Completed'],default : 'Eating'},
                            time  : {type: Date, default: Date.now} 
                        },
    bill            : {type: Schema.Types.ObjectId, ref: 'Bill'},
    booking         : {type: Schema.Types.ObjectId, ref: 'Booking'},    
    server          : {type: Schema.Types.ObjectId, ref: 'Employee'},    
    customer        : {type: Schema.Types.ObjectId, ref: 'Customer'},
    tableInstances  : [{type: Schema.Types.ObjectId, ref: 'TableInstance'}]
})

//===============
//    Methods
//===============

/************** Setters ********************/
//set orders(add more)
DineSchema
.virtual('new-order')
.set((newOrders)=> { 
    this.orders.push(newOrders);  
});

//set status
DineSchema
.virtual('set-status')   //status{status,time}
.set(function (status) { 
    this.status.status = status;
    this.status.time  = Date.now;
});

//set bill status(status is Boolean)
DineSchema
.virtual('bill-status')
.set((status) => { 
    this.bill.isPaid = status;
});


/************** Utils ********************/

//compile the Model
var Dine = mongoose.model('Dine', DineSchema);

module.exports = {
    Dine
}