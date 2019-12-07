var Employee = require('../models/employee');

//===================CRUD controllers================//
//List all Employees GET  #1
var employee_list = (req,res)=>{
    res.send('NOT IMPLEMENTED: employee_list');
}

//Display employee crete form on GET #2.1
var employee_create_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: employee_create_get');
}

//Handle employee crete form on POST #2.2
var employee_create_post = (req,res) =>{
    res.send('NOT IMPLEMENTED: employee_create_post');
}

//Display details for a specefic employee #3
var employee_details = (req,res)=>{
    res.send('NOT IMPLEMENTED: employee_details');
}

//Display employee update form on GET #4.1
var employee_edit_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: employee_edit_get');
}

//Handle employee update form on PUT #4.2
var employee_edit_put = (req,res) =>{
    res.send('NOT IMPLEMENTED: employee_edit_put');
}

//Display employee update form on DELETE #5.1
var employee_delete_delete = (req,res) =>{
    res.send('NOT IMPLEMENTED: employee_delete_delete');
}


//=================Utils controllers================//

//Display mark attendance form on GET #6.1
var employee_mark_attendance_get = (req,res) =>{
    res.send('NOT IMPLEMENTED: employee_mark_attendance_get');
}

//Display mark attendance form on POST #6.2
var employee_mark_attendance_post = (req,res) =>{
    res.send('NOT IMPLEMENTED: employee_mark_attendance_post');
}


module.exports ={
    employee_list,
    employee_create_get,
    employee_create_post,
    employee_details,
    employee_edit_get,
    employee_edit_put,
    employee_delete_delete,
    employee_mark_attendance_get,
    employee_mark_attendance_post
}