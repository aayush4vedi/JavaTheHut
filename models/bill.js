var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var BillSchema = new Schema({
    // billID         : { type: String, default: uuid.v1 },     //restaurant specefic ID's to be implemented later
    isPaid         : { type: Boolean, default: false},
    order          : {type: Schema.Types.ObjectId, ref: 'Order'},
    orderAmount    : { type: Number, default: 0},
    taxAmount      : { type: Number, default: 0},
    serviceCharge  : { type: Number, default: 0},
    payableAmount  : { type: Number, default: 0}
})


//===============
//    Methods
//===============

/************** Getters ********************/
//get payment stauts
BillSchema
.virtual('payment-status')
.get(function () {
    return this.isPaid == true? "paid" : "unpaid";  
});

//get orderID
BillSchema
.virtual('order-id')
.get(function () {
    return this.order._id;  
});

//get orderAmount
BillSchema
.virtual('order-amount')
.get(function () {
    return this.orderAmount;  
});

//get taxAmount
BillSchema
.virtual('tax-amount')
.get(function () {
    return this.taxAmount;  
});

//get serviceCharge
BillSchema
.virtual('service-charge')
.get(function () {
    return this.serviceCharge;  
});

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
//mark as Paid
BillSchema
.virtual('payable-amount')
.set(function () {
    return this.isPaid = true;  
});

/************** Utils ********************/
//calculate tax
BillSchema
.virtual('tax-percentage')
.get(function (taxPercentage) {
    var taxAmount = (taxPercentage * this.orderAmount)/100;
    this.taxAmount = taxAmount;  
});

//calculate service charge
BillSchema
.virtual('tax-percentage')
.get(function (serviceChargePercentage) {
    var serviceChargeAmount = (serviceChargePercentage * this.orderAmount)/100;
    this.serviceChargeAmount = serviceChargeAmount;  
});

//compile the Model
var Bill = mongoose.model('Bill', BillSchema);

module.exports = {
    Bill
}