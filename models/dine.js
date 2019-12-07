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
    server          : {type: Schema.Types.ObjectId, ref: 'Server'},    
    customer        : {type: Schema.Types.ObjectId, ref: 'Customer'}, 
    booking         : {type: Schema.Types.ObjectId, ref: 'Booking'} 
})

//===============
//    Methods
//===============

/************** Getters ********************/
//get orders
DineSchema
.virtual('orders')
.get(function () {
    return this.orders;  
});

//get status
DineSchema
.virtual('status')
.get(function () {
    return this.status;  
});

//get bill
DineSchema
.virtual('bill')
.get(function () {
    return this.bill;  
});

//get booking
DineSchema
.virtual('booking')
.get(function () {
    return this.booking;  
});

//get server
DineSchema
.virtual('server')
.get(function () {
    return this.server;  
});

//get customer
DineSchema
.virtual('customer')
.get(function () {
    return this.customer;  
});

//get booking
DineSchema
.virtual('booking')
.get(function () {
    return this.booking;  
});

/************** Setters ********************/
//set orders(add more)
DineSchema
.virtual('orders')
.set((orders)=> { 
    var newOrder = orders.map(order => {
        newOrder.push(order);
    });
    this.orders.push(newOrder);  
});

//set status
DineSchema
.virtual('status')   //status{status,time}
.set(function (status) { 
    this.status.status = status;
    this.status.time  = Date.now;
});

//set bill status(status is Boolean)
DineSchema
.virtual('bill')
.set((status) => { 
    this.bill.isPaid = status;
});

//set booking
DineSchema
.virtual('booking')
.set((booking) => { 
    this.booking = booking;
});

//set server
DineSchema
.virtual('server')
.set((server) => { 
    this.server = server;
});

//set customer
DineSchema
.virtual('customer')
.set((customer) => { 
    this.customer = customer;
});

//set table
DineSchema
.virtual('table')
.set((table) => { 
    this.table = table;
});

/************** Utils ********************/

//compile the Model
var Dine = mongoose.model('Dine', DineSchema);

module.exports = {
    Dine
}