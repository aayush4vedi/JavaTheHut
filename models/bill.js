var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var BillSchema = new Schema({
    // billID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    isPaid         : { type: Boolean, default: false},
    dine           : {type: Schema.Types.ObjectId, ref: 'Dine'},
    dineAmount     : { type: Number, default: 0},
    taxAmount      : { type: Number, default: 0},
    serviceCharge  : { type: Number, default: 0},
    payableAmount  : { type: Number, default: 0}
})
//TODO: Update everywhere::orderAmount is changed to dineAmount

//===============
//    Methods
//===============

/************** Getters ********************/

//get payableAmount
BillSchema
.virtual('payable-amount')
.get(function () {
    if(this.orderAmount>0 && this.taxAmount  > 0 && this.serviceCharge >0 ){
        var payableAmount = this.taxAmount + this.orderAmount + this.serviceCharge;
        return payableAmount;  
    }else{
        throw new Error('Error in amount calculation');
    }
});

/************** Setters ********************/

/************** Utils ********************/
//calculate tax
BillSchema
.virtual('tax-percentage')
.get((taxPercentage) =>{
    var taxAmount = (taxPercentage * this.orderAmount)/100;
    this.taxAmount = taxAmount;  
});

//calculate service charge
BillSchema
.virtual('service-charge-percentage')
.get(function (serviceChargePercentage) {
    var serviceChargeAmount = (serviceChargePercentage * this.orderAmount)/100;
    this.serviceChargeAmount = serviceChargeAmount;  
});

//compile the Model
var Bill = mongoose.model('Bill', BillSchema);

module.exports = {
    Bill
}