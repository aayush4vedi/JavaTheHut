var Employee = require('../models/employee'),
    Category = require('../models/category'),
    async    = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//
//List all Cooks GET  #1
var cook_list = (req,res,next)=>{
    async.parallel({
        cook: (callback) =>{
            Cook.find()
                .populate('category')
                .exec(callback)
        },
        category: (callback) =>{
            Category.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.employee == null) { 
            var err = new Error('No such employee found');
            err.status = 404;
            return next(err);
        }
        if (results.category == null) { 
            var err = new Error('No such category found');
            err.status = 404;
            return next(err);
        }
        res.render('cook_list', { title: 'Cook List', cook: results.cook, category: results.category});
    });
}

//Display cook create form on GET #2.1
//Get employee and category to pick from
var cook_create_get = (req,res,next)=>{
    async.parallel({
        employee: (callback) =>{
            Employee.find()
                .exec(callback)
        },
        category: (callback) =>{
            Category.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.employee == null) { 
            var err = new Error('No such employee found');
            err.status = 404;
            return next(err);
        }
        if (results.category == null) { 
            var err = new Error('No such category found');
            err.status = 404;
            return next(err);
        }
        res.render('cook_create', {title: 'Cook Create', employee: results.employee, category: results.category});
    });
}

//Handle cook create form on POST #2.2
var cook_create_post = [
    (req, res, next) => {
        if(!(req.body.category instanceof Array)){
            if(typeof req.body.category==='undefined')
            req.body.category=[];
            else
            req.body.category=new Array(req.body.category);
        }
        next();
    },

    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('*').trim().escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var cook = new Cook(
            {
                name : req.body.name,
                employee : req.body.employee,
                category : req.body.category,
                attendance : req.body.attendance
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                employee: (callback) =>{
                    Employee.find()
                        .exec(callback)
                },
                category: (callback) =>{
                    Category.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                if (results.employee == null) { 
                    var err = new Error('No such employee found');
                    err.status = 404;
                    return next(err);
                }
                if (results.category == null) { 
                    var err = new Error('No such category found');
                    err.status = 404;
                    return next(err);
                }
                res.render('cook_create', {title: 'Cook Create', employee: results.employee, category: results.category,errors: errors.array()});
            });
            return;
        }
        else {
            cook.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]
//TODO: @here
//Display details for a specefic cook #3 
var cook_details = (req,res,next)=>{
    async.parallel({
        cook: (callback) =>{
            Cook.findById(req.params.id)
                .populate('employee')
                .populate('category')
                .exec(callback)
        },
        employee: (callback) =>{
            Employee.find(callback)
        },
        category: (callback) =>{
            Category.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.cook == null) { 
            var err = new Error('Cook not found');
            err.status = 404;
            return next(err);
        }
        res.render('cook_detail', { title: 'Cook Detail', cook: results.cook, cook_speciality: results.cook_speciality, cook_tables: results.cook_tables });
    });
}

//Display cook update form on GET #4.1
var cook_edit_get = (req,res,next)=>{
    Cook.findById(req.params.id, (err, cook)=> {
        if (err) { return next(err); }
        if (cook == null) { 
            var err = new Error('Cook not found');
            err.status = 404;
            return next(err);
        }
        res.render('cook_edit', { title: 'Update Cook', cook: cook });
    });
}

//Handle cook update form on PUT #4.2
var cook_edit_put = [
    body('username').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('password').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('email').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('phone').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('govIDNumber').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('salary').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('role').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('speciality').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('tables').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('attendance').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('name').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone').escape(),
    sanitizeBody('govIDNumber').escape(),
    sanitizeBody('salary').escape(),
    sanitizeBody('speciality').escape(),
    sanitizeBody('tables').escape(),
    sanitizeBody('attendance').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var cook = new Cook(
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
            res.render('cook_create', {title: 'Cook Create'});
            return;
        }
        else {
            Cook.findByIdAndUpdate(req.params.id, cook, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display cook update form on DELETE #5
var cook_delete_delete = (req,res,next)=>{
    Cook.findByIdAndRemove(req.body.cookid, function deleteCook(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}


//=================Utils controllers================//

//Display mark attendance form on GET #6.1
var cook_mark_attendance_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: cook_mark_attendance_get');
}

//Display mark attendance form on POST #6.2
var cook_mark_attendance_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: cook_mark_attendance_post');
}


module.exports ={
    cook_list,
    cook_create_get,
    cook_create_post,
    cook_details,
    cook_edit_get,
    cook_edit_put,
    cook_delete_delete,
    cook_mark_attendance_get,
    cook_mark_attendance_post
}