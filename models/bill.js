var mongoose = require('mongoose');

//===============
//     Structure
//===============
var Schema = mongoose.Schema;

var BillSchema = new Schema({
    isPaid         : { type: Boolean, default: false, required: true},
    dine           : {type: Schema.Types.ObjectId, ref: 'Dine', required: true},
    dineAmount     : { type: Number, default: 0, required: true},
    taxAmount      : { type: Number, default: 0},
    serviceCharge  : { type: Number, default: 0},
    payableAmount  : { type: Number, default: 0, required: true}
})

//===============
//    Methods
//===============

/************** Getters ********************/

//get payableAmount
BillSchema
.virtual('payableamount')
.get(function () {
    if(this.dineAmount>0 && this.taxAmount  > 0 && this.serviceCharge >0 ){
        return  this.taxAmount + this.dineAmount + this.serviceCharge;
    }else{
        throw new Error('Error in amount calculation');
    }
});

/************** Setters ********************/

/************** Utils ********************/
//calculate tax
// BillSchema
// .virtual('taxpercentage')
// .get((taxPercentage) =>{
//     var taxAmount = (taxPercentage * this.dineAmount)/100;
//     this.taxAmount = taxAmount;  
// });

//calculate service charge
// BillSchema
// .virtual('servicechargepercentage')
// .get(function (serviceChargePercentage) {
//     var serviceChargeAmount = (serviceChargePercentage * this.orderAmount)/100;
//     this.serviceChargeAmount = serviceChargeAmount;  
// });

//compile the Model
var Bill = mongoose.model('Bill', BillSchema);

module.exports = {
    Bill
}