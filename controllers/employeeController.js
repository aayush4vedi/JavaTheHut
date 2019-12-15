var Employee        = require('../models/employee')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


//===================CRUD controllers================//

//List all Employees GET  #1
var employee_list = (req,res,next)=>{
    Employee.find({},'name attendance')
        .exec((err, list_employee) =>{
            if(err){
                return next(err)
            }
            res.render('employee/employee_list', { title: 'Employee List', employees: list_employee})
        })
}

//Display employee create form on GET #2.1
var employee_create_get = (req,res,next)=>{
    res.render('employee/employee_create', {title: 'Employee Create'});
}

//Handle employee create form on POST #2.2
var employee_create_post = [
    body('username').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('password').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('email').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('phone').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('govIDNumber').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('salary').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('role').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('attendance').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('name').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone').escape(),
    sanitizeBody('govIDNumber').escape(),
    sanitizeBody('salary').escape(),
    sanitizeBody('attendance').escape(),

    (req,res,next)=>{
        console.log('***req.body:',req.body);
        
        res.redirect(parent_url);
        const errors = validationResult(req);
        var employee = new Employee(
            {
                username : req.body.username,
                password : req.body.password,
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                govIDNumber : req.body.govIDNumber,
                salary : req.body.salary,
                attendance : req.body.attendance
            }
        );

        if (!errors.isEmpty()) {
            res.render('employee/employee_create', {title: 'Employee Create'});
            return;
        }
        else {
            employee.save(function (err) {
                if (err) { return next(err); }
                res.redirect('../employee');      
            });
        }
    }
]

//Display details for a specefic employee #3 
var employee_details = (req,res,next)=>{
    Employee.findById(req.params.id)
        .exec((err, employee) => {
        if (err) { return next(err); } 
        if (employee == null) { 
            var err = new Error('Employee not found');
            err.status = 404;
            return next(err);
        }
        res.render('employee/employee_details', { title: 'Employee Detail', employee: employee});
    });
}

//Display employee update form on GET #4.1
var employee_edit_get = (req,res,next)=>{
    Employee.findById(req.params.id, (err, employee)=> {
        if (err) { return next(err); }
        if (employee == null) { 
            var err = new Error('Employee not found');
            err.status = 404;
            return next(err);
        }
        res.render('employee/employee_edit', { title: 'Update Employee', employee: employee });
    });
}

//Handle employee update form on PUT #4.2
var employee_edit_put = [
    body('username').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('password').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('email').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('phone').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('govIDNumber').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('salary').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('role').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('attendance').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('name').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone').escape(),
    sanitizeBody('govIDNumber').escape(),
    sanitizeBody('salary').escape(),
    sanitizeBody('attendance').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var employee = new Employee(
            {
                username : req.body.username,
                password : req.body.password,
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                govIDNumber : req.body.govIDNumber,
                salary : req.body.salary,
                speciality : req.body.speciality,
                tables : req.body.tables,
                attendance : req.body.attendance,
                _id : req.params.id
            }
        );

        if (!errors.isEmpty()) {
            res.render('employee/employee_create', {title: 'Employee Create'});
            return;
        }
        else {
            Employee.findByIdAndUpdate(req.params.id, employee, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('../employee');
            });
        }
    }
]

//Display employee update form on DELETE #5
var employee_delete_delete = (req,res,next)=>{
    Employee.findByIdAndRemove(req.body.employeeid, function deleteEmployee(err) {
        if (err) { return next(err); }
        res.redirect('../employee');
    })
}


//=================Utils controllers================//

//Display mark attendance form on GET ==> same as employee_list

//Display mark attendance form on POST #6.2
var employee_mark_attendance_post = (req,res,next)=>{
    var employee = new Employee(
        {
            attendance : req.body.attendance,
            _id : req.params.id
        }
    );
    Employee.findByIdAndUpdate(req.params.id, employee, {}, (err)=> {
        if (err) { return next(err); }
        res.redirect('../employee');
    });
}


module.exports ={
    employee_list,
    employee_create_get,
    employee_create_post,
    employee_details,
    employee_edit_get,
    employee_edit_put,
    employee_delete_delete,
    employee_mark_attendance_post
}