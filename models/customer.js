var mongoose = require('mongoose');
import Order from './order'

var Schema = mongoose.schema;

var customerSchema = new Schema({
    customerID      : { type: String, default: uuid.v1 },     //TODO: Make it auto-increemting IDs
    name            : String,
    email           : String,                                 //TODO: write assertion
    contactNumber   : Number,                                 //TODO: write assertion
    prevOrders      : [Order]
})

var Customer = mongoose.model('Customer',customerSchema)

module.exports ={
    Customer
}