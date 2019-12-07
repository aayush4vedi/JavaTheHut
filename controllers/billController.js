var Bill = require('../models/bill')

//===================CRUD controllers================//

//List all bills #1
var bill_list = (req,res)=>{
    res.send('NOT IMPLEMENTED: bill_list');
}

//Display bill crete form on GET #2.1
var bill_create_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: bill_create_get');
}

//Handle bill crete form on POST #2.2
var bill_create_post = (req,res) =>{
    res.send('NOT IMPLEMENTED: bill_create_post');
}

//Display details for a specefic bill #3
var bill_details = (req,res)=>{
    res.send('NOT IMPLEMENTED: bill_details');
}

//Display bill update form on GET #4.1
var bill_edit_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: bill_edit_get');
}

//Handle bill update form on PUT #4.2
var bill_edit_put = (req,res) =>{
    res.send('NOT IMPLEMENTED: bill_edit_put');
}

//Display bill update form on DELETE #5.1
var bill_delete_delete = (req,res) =>{
    res.send('NOT IMPLEMENTED: bill_delete_delete');
}


//=================Utils controllers================//

//Show update-payment-status form GET #6.1
var bill_update_payment_status_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: bill_update_payment_status_get');
}

//Show update-payment-status form PUT #6.2
var bill_update_payment_status_post = (req,res) =>{
    res.send('NOT IMPLEMENTED: bill_update_payment_status_post');
}

module.exports = {
    bill_list,
    bill_create_get,
    bill_create_post,
    bill_details,
    bill_edit_get,
    bill_edit_put,
    bill_delete_delete,
    bill_update_payment_status_get,
    bill_update_payment_status_post
}