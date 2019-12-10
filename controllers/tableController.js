var Table = require('../models/table')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all tables #1
var table_list = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: table_list');
}

//Display table crete form on GET #2.1
var table_create_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_create_get');
}

//Handle table crete form on POST #2.2
var table_create_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_create_post');
}

//Display details for a specefic table #3
var table_details = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: table_details');
}

//Display table update form on GET #4.1
var table_edit_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_edit_get');
}

//Handle table update form on PUT #4.2
var table_edit_put = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_edit_put');
}

//Display table update form on DELETE #5.1
var table_delete_delete = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_delete_delete');
}


//=================Utils controllers================//

//Display mark attendance form on GET #6.1
var table_location_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_location_get');
}

//show availability: GET #7.1
var table_availability_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_availability_get');
}

//no need for new form.Just edit form will do here
//update availabiltity- show form: GET #7.2
var table_update_availability_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_update_availability_get');
}

//update availabiltity: PUT #7.3
var table_update_availability_put = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_update_availability_put');
}


module.exports = {
    table_list,
    table_create_get,
    table_create_post,
    table_details,
    table_edit_get,
    table_edit_put,
    table_delete_delete,
    table_location_get,
    table_availability_get,
    table_update_availability_get,
    table_update_availability_put
}