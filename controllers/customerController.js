var Customer = require('../models/customer')

//===================CRUD controllers================//

//List all customers #1
var customer_list = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: customer_list');
}

//Display customer crete form on GET #2.1
var customer_create_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: customer_create_get');
}

//Handle customer crete form on POST #2.2
var customer_create_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: customer_create_post');
}

//Display details for a specefic customer #3
var customer_details = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: customer_details');
}

//Display customer update form on GET #4.1
var customer_edit_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: customer_edit_get');
}

//Handle customer update form on PUT #4.2
var customer_edit_put = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: customer_edit_put');
}

//Display customer update form on DELETE #5
var customer_delete_delete = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: customer_delete_delete');
}



module.exports = {
    customer_list,
    customer_create_get,
    customer_create_post,
    customer_details,
    customer_edit_get,
    customer_edit_put,
    customer_delete_delete
}

