var Dish = require('../models/dish')

//===================CRUD controllers================//

//List all dishs #1
var dish_list = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: dish_list');
}

//Display dish crete form on GET #2.1
var dish_create_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_create_get');
}

//Handle dish crete form on POST #2.2
var dish_create_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_create_post');
}

//Display details for a specefic dish #3
var dish_details = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: dish_details');
}

//Display dish update form on GET #4.1
var dish_edit_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_edit_get');
}

//Handle dish update form on PUT #4.2
var dish_edit_put = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_edit_put');
}

//Display dish update form on DELETE #5
var dish_delete_delete = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_delete_delete');
}


//=================Utils controllers================//

//Display mark is-serving-status form on GET #6.1
var dish_mark_is_serving_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_mark_is_serving_get');
}

//Handle mark is-serving-status form on POST #6.2
var dish_mark_is_serving_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_mark_is_serving_post');
}

// display all dishes of given Category #7
var dish_for_cateogry_id_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_for_cateogry_id_get');
}

module.exports = {
    dish_list,
    dish_create_get,
    dish_create_post,
    dish_details,
    dish_edit_get,
    dish_edit_put,
    dish_delete_delete,
    dish_mark_is_serving_get,
    dish_mark_is_serving_post,
    dish_for_cateogry_id_get
}