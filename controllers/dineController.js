var Dine = require('../models/dine')

//===================CRUD controllers================//

//List all dines #1
var dine_list = (req,res)=>{
    res.send('NOT IMPLEMENTED: dine_list');
}

//Display dine create form on GET #2.1
var dine_create_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: dine_create_get');
}

//Handle dine crete form on POST #2.2
var dine_create_post = (req,res) =>{
    res.send('NOT IMPLEMENTED: dine_create_post');
}

//Display details for a specefic dine #3
var dine_details = (req,res)=>{
    res.send('NOT IMPLEMENTED: dine_details');
}

//Display dine update form on GET #4.1
var dine_edit_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: dine_edit_get');
}

//Handle dine update form on PUT #4.2
var dine_edit_put = (req,res) =>{
    res.send('NOT IMPLEMENTED: dine_edit_put');
}

//Display dine update form on DELETE #5
var dine_delete_delete = (req,res) =>{
    res.send('NOT IMPLEMENTED: dine_delete_delete');
}



module.exports = {
    dine_list,
    dine_create_get,
    dine_create_post,
    dine_details,
    dine_edit_get,
    dine_edit_put,
    dine_delete_delete
}