var Hall = require('../models/hall')

//===================CRUD controllers================//

//List all halls #1
var hall_list = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: hall_list');
}

//Display hall crete form on GET #2.1
var hall_create_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: hall_create_get');
}

//Handle hall crete form on POST #2.2
var hall_create_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: hall_create_post');
}

//Display details for a specefic hall #3
var hall_details = (req,res, next)=>{
    res.send('NOT IMPLEMENTED: hall_details');
}

//Display hall update form on GET #4.1
var hall_edit_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: hall_edit_get');
}

//Handle hall update form on PUT #4.2
var hall_edit_put = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: hall_edit_put');
}

//Display hall update form on DELETE #5
var hall_delete_delete = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: hall_delete_delete');
}


//=================Utils controllers================//

//Display all tables in a hall #6
var hall_all_tables_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: hall_all_tables_get');
}



module.exports = {
    hall_list,
    hall_create_get,
    hall_create_post,
    hall_details,
    hall_edit_get,
    hall_edit_put,
    hall_delete_delete,
    hall_all_tables_get
}