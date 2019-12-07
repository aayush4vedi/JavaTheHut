var Category = require('../models/category')

//===================CRUD controllers================//

//List all categorys #1
var category_list = (req,res)=>{
    res.send('NOT IMPLEMENTED: category_list');
}

//Display category crete form on GET #2.1
var category_create_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: category_create_get');
}

//Handle category crete form on POST #2.2
var category_create_post = (req,res) =>{
    res.send('NOT IMPLEMENTED: category_create_post');
}

//Display details for a specefic category #3
var category_details = (req,res)=>{
    res.send('NOT IMPLEMENTED: category_details');
}

//Display category update form on GET #4.1
var category_edit_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: category_edit_get');
}

//Handle category update form on PUT #4.2
var category_edit_put = (req,res) =>{
    res.send('NOT IMPLEMENTED: category_edit_put');
}

//Display category update form on DELETE #5
var category_delete_delete = (req,res) =>{
    res.send('NOT IMPLEMENTED: category_delete_delete');
}


module.exports = {
    category_list,
    category_create_get,
    category_create_post,
    category_details,
    category_edit_get,
    category_edit_put,
    category_delete_delete
}