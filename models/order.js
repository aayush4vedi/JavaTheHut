var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    // orderID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    date            : { type: Date, default: Date.now},                                  
    status          : [{
                            status : {type : String,enum : ['Uninitiated','Placed','Accepted','Cooking','Serving','Cancelled'],default : 'Uninitiated'},
                            time   : {type: Date, default: Date.now}              
                    }],
    booking         : {type: Schema.Types.ObjectId, ref: 'Booking'},    
    server          : {type: Schema.Types.ObjectId, ref: 'Server'},    
    items           : [{
                        dish      : {type: Schema.Types.ObjectId, ref: 'Dish'},    
                        quantity  : Number                     
                    }],
    cancellationReqs: [{
                        dish  : {type: Schema.Types.ObjectId, ref: 'Dish'},
                        stauts: {type: String, enum: ['Null','Pending','Accepted','Rejected'], default: 'Null'}
                    }],    
    bill            : {type: Schema.Types.ObjectId, ref: 'Bill'},
    isComplete      : {type: Boolean, default: false}
})


//===============
//    Methods
//===============
/************** Assertions ********************/


/************** Getters ********************/
//get date
OrderSchema
.virtual('date')
.get(function () {
    return this.date;  
});

//get status
OrderSchema
.virtual('status')
.get(function () {
    return this.status;  
});

//get booking_id
OrderSchema
.virtual('booking')
.get(function () {
    return this.booking._id;  
});

//get server_id
OrderSchema
.virtual('server')
.get(function () {
    return this.server._id;  
});

//get items in order
OrderSchema
.virtual('items')
.get(function () {
    return this.items;  
});

//get bill details
OrderSchema
.virtual('bill')
.get(function () {
    return this.bill;  
});

//get payment status
OrderSchema
.virtual('payment-status')
.get(function () {
    return this.bill.payment-status;  
});

//get is-completed status
OrderSchema
.virtual('is-completed')
.get(function () {
    return this.isComplete ? "Yes" : "No";  
});

// get cancellation requests:
//send the status in params
OrderSchema
.virtual('cancellationrequests')
.get(function (reqStatus) { 
    var cancellationReq = [];
    this.cancellationReqs.forEach(req => {
        if(req.status == reqStatus){
            cancellationReq.push(req)
        }
    });
    return cancellationReq;
});


/************** Setters ********************/
//set date
OrderSchema
.virtual('date')
.set(function () {
    this.date = date;  
});

//set(update) status{status,Date.now}
OrderSchema
.virtual('status')
.set(function (status) { //here status is a string
    this.status.staus = status;
    this.status.time  = Date.now;
});

//set items
OrderSchema
.virtual('items')
.set(function (items) { //items:{dish, quantity}
    var newItems = items.map(item => {
        newItems.push(item);
    });
    this.items.push(newItems);  
});

//mark isComplete
OrderSchema
.virtual('mark-complete')
.set(function () {
    if(this.payment-status){
        this.isComplete = true;
    }else{
        throw new Error("Unpaid order can't be marked completed!");
    }
});

/************** Utils ********************/
//function to check if a dist exists in items ordered:
function dishExists(dishName) {
    return this.items.some(function(item) {
      return item.dish === dishrname;
    }); 
  }

//request cancellation for an item in order
OrderSchema
.virtual('make-cancellation-req')
.set(function (dish) {
    if(dishExists(dish)){
        this.reqCancellationReq.dish.status = 'Pending'
    }else{
        console.log("Can't ask cancellation for an unordered item.");
    }
});


//take cancellation desicion
OrderSchema
.virtual('take-cancellation-decision')
.set(function (decision) {
    var cancellationReq = this.cancellationrequests('Pending');
    if(cancellationReq.length >0){
        cancellationReq.forEach(req => {
            req.status = decision;          //mass-decision is wrong.Figure out something better
        });
    }
});

//compile the Model
var Order = mongoose.model('Order', OrderSchema);

module.exports = {
    Order
}