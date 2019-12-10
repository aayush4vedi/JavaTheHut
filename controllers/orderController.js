var Order = require('../models/order')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all orders #1
var order_list = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: order_list');
}

//Display order create form on GET #2.1
var order_create_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: order_create_get');
}

//Handle order crete form on POST #2.2
var order_create_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: order_create_post');
}

//Display details for a specefic order #3
var order_details = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: order_details');
}

//Display order update form on GET #4.1
var order_edit_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: order_edit_get');
}

//Handle order update form on PUT #4.2
var order_edit_put = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: order_edit_put');
}

//Display order update form on DELETE #5
var order_delete_delete = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: order_delete_delete');
}
//same form to handle both(request button-customer, approve button-kitchen manager)
//Display Cancellation form GET #6.1
var order_cancellation_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: order_cancellation_get');
}

//Display Cancellation form POST #6.2
var order_cancellation_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: order_cancellation_post');
}

module.exports = {
    order_list,
    order_create_get,
    order_create_post,
    order_details,
    order_edit_get,
    order_edit_put,
    order_delete_delete,
    order_cancellation_get,
    order_cancellation_post
}