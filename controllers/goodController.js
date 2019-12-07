var Good = require('../models/good')

//===================CRUD controllers================//

//List all goods #1
var good_list = (req,res)=>{
    res.send('NOT IMPLEMENTED: good_list');
}

//Display good crete form on GET #2.1
var good_create_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: good_create_get');
}

//Handle good crete form on POST #2.2
var good_create_post = (req,res) =>{
    res.send('NOT IMPLEMENTED: good_create_post');
}

//Display details for a specefic good #3
var good_details = (req,res)=>{
    res.send('NOT IMPLEMENTED: good_details');
}

//Display good update form on GET #4.1
var good_edit_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: good_edit_get');
}

//Handle good update form on PUT #4.2
var good_edit_put = (req,res) =>{
    res.send('NOT IMPLEMENTED: good_edit_put');
}

//Display good update form on DELETE #5
var good_delete_delete = (req,res) =>{
    res.send('NOT IMPLEMENTED: good_delete_delete');
}



module.exports = {
    good_list,
    good_create_get,
    good_create_post,
    good_details,
    good_edit_get,
    good_edit_put,
    good_delete_delete
}