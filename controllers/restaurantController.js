var Restaurant = require('../models/restaurant')

//===================CRUD controllers================//

//List all restaurants #1
var restaurant_list = (req,res)=>{
    res.send('NOT IMPLEMENTED: restaurant_list');
}

//Display restaurant crete form on GET #2.1
var restaurant_create_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: restaurant_create_get');
}

//Handle restaurant crete form on POST #2.2
var restaurant_create_post = (req,res) =>{
    res.send('NOT IMPLEMENTED: restaurant_create_post');
}

//Display details for a specefic restaurant #3
var restaurant_details = (req,res)=>{
    res.send('NOT IMPLEMENTED: restaurant_details');
}

//Display restaurant update form on GET #4.1
var restaurant_edit_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: restaurant_edit_get');
}

//Handle restaurant update form on PUT #4.2
var restaurant_edit_put = (req,res) =>{
    res.send('NOT IMPLEMENTED: restaurant_edit_put');
}

//Display restaurant update form on DELETE #5
var restaurant_delete_delete = (req,res) =>{
    res.send('NOT IMPLEMENTED: restaurant_delete_delete');
}



module.exports = {
    restaurant_list,
    restaurant_create_get,
    restaurant_create_post,
    restaurant_details,
    restaurant_edit_get,
    restaurant_edit_put,
    restaurant_delete_delete,
    restaurant_all_tables_get
}