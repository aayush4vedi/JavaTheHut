var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    // orderID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    status          : [{
                            status : {type : String,enum : ['Uninitiated','Placed','Accepted','Cooking','Serving','Cancelled'],default : 'Uninitiated'},
                            time   : {type: Date, default: Date.now}              
                    }],
    items           : [{
                        dish      : {type: Schema.Types.ObjectId, ref: 'Dish'},    
                        quantity  : Number                     
                    }],
    cancellationReqs: [{
                        dish  : {type: Schema.Types.ObjectId, ref: 'Dish'},
                        stauts: {type: String, enum: ['Null','Pending','Accepted','Rejected'], default: 'Null'}
                    }]
})


//===============
//    Methods
//===============

/************** Getters ********************/

// get cancellation requests on items:
//send the status in params
OrderSchema
.virtual('cancellationrequests')
.get( (reqStatus) => { 
    var cancellationReq = [];
    this.cancellationReqs.forEach(req => {
        if(req.status == reqStatus){
            cancellationReq.push(req)
        }
    });
    return cancellationReq;
});


/************** Setters ********************/

//set(update) status{status,Date.now}
OrderSchema
.virtual('set-status')
.set((status) =>{ //here status is a string
    this.status.status = status;
    this.status.time   = Date.now;
});

//set items: add items in some quantities
OrderSchema
.virtual('items')
.set((items) => { //items:{dish, quantity}
    var newItems = items.map(item => {
        newItems.push(item);
    });
    this.items.push(newItems);  
});


/************** Utils ********************/
//function to check if a dist exists in items ordered:
function dishExists(dishName) {
    return this.items.some((item)=> {
      return item.dish === dishName;
    }); 
  }

//request cancellation for an item in order
OrderSchema
.virtual('make-cancellation-req')
.set((dish) => {
    if(dishExists(dish)){
        this.reqCancellationReq.dish.status = 'Pending'
    }else{
        console.log("Can't ask cancellation for an unordered item.");
    }
});


//take cancellation desicion=>if yes, make quantity=0
OrderSchema
.virtual('take-cancellation-decision')
.set((decision) => {
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