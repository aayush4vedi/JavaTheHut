var Booking = require('../models/booking')

//===================CRUD controllers================//

//List all bookings #1
var booking_list = (req,res)=>{
    res.send('NOT IMPLEMENTED: booking_list');
}

//Display booking crete form on GET #2.1
var booking_create_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: booking_create_get');
}

//Handle booking crete form on POST #2.2
var booking_create_post = (req,res) =>{
    res.send('NOT IMPLEMENTED: booking_create_post');
}

//Display details for a specefic booking #3
var booking_details = (req,res)=>{
    res.send('NOT IMPLEMENTED: booking_details');
}

//Display booking update form on GET #4.1
var booking_edit_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: booking_edit_get');
}

//Handle booking update form on PUT #4.2
var booking_edit_put = (req,res) =>{
    res.send('NOT IMPLEMENTED: booking_edit_put');
}

//Display booking update form on DELETE #5
var booking_delete_delete = (req,res) =>{
    res.send('NOT IMPLEMENTED: booking_delete_delete');
}

//===================Utils controllers================//
//Display all bookings by customerID on GET #6
var booking_for_customer_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: booking_for_customer_get');
}

//Display all bookings by tableID on GET #7
var booking_for_table_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: booking_for_table_get');
}

//Display all bookings by date on GET #8
var booking_for_date_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: booking_for_date_get');
}

//Display all bookings by date & tableID on GET #9
var booking_for_table_date_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: booking_for_table_date_get');
}

module.exports = {
    booking_list,
    booking_create_get,
    booking_create_post,
    booking_details,
    booking_edit_get,
    booking_edit_put,
    booking_delete_delete,
    booking_for_customer_get,
    booking_for_table_get,
    booking_for_date_get,
    booking_for_table_date_get
}