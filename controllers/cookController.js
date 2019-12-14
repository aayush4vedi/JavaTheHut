var Employee = require('../models/employee'),
    Category = require('../models/category'),
    async    = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//
//List all Cooks GET  #1
var cook_list = (req,res,next)=>{
    Cook.find()
        .populate('category')
        .exec((err, list_cooks) =>{
            if(err){
                return next(err)
            }
            res.render('cook_list', { title: 'Cook List',list_cooks: list_cooks})
        })
}

//Display cook create form on GET #2.1
//Get employee and category to pick from
var cook_create_get = (req,res,next)=>{
    async.parallel({
        all_employees: (callback) =>{
            Employee.find(callback)
        },
        all_categories: (callback) =>{
            Category.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('cook_create', {title: 'Cook Create', all_employees: results.all_employees, all_categories: results.all_categories});
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
                category :  (typeof req.body.category==='undefined') ? [] : req.body.category,
                attendance : req.body.attendance
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                all_employees: (callback) =>{
                    Employee.find(callback)
                },
                all_categories: (callback) =>{
                    Category.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('cook_create', {title: 'Cook Create', all_employees: results.all_employees, all_categories: results.all_categories});
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

//Display details for a specefic cook #3 
var cook_details = (req,res,next)=>{
    Cook.findById(req.params.id)
        .populate('employee')
        .populate('category')
        .exec((err,cook)=>{
            if (err) { return next(err); } 
            if (cook == null) { 
                var err = new Error('Cook not found');
                err.status = 404;
                return next(err);
            }
            res.render('category_detail', { title: 'Category Detail',  cook: cook});
        })
}

//Display cook update form on GET #4.1
var cook_edit_get = (req,res,next)=>{
    async.parallel({
        cook: (callback) =>{
            Cook.findById(req.params.id)
                .populate('employee')
                .populate('category')
                .exec(callback)
        },
        all_employees: (callback) =>{
            Employee.find()
                .exec(callback)
        },
        all_categories: (callback) =>{
            Category.find()
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (cook == null) { 
            var err = new Error('Cook not found');
            err.status = 404;
            return next(err);
        }
        res.render('cook_edit', { title: 'Update Cook', cook: results.cook , all_employees: results.all_employees, all_categories: results.all_categories});
    });
}

//Handle cook update form on PUT #4.2
var cook_edit_put = [
    (req, res, next) => {
        if(!(req.body.cook instanceof Array)){
            if(typeof req.body.category==='undefined')
            req.body.category=[];
            else
            req.body.cook=new Array(req.body.category);
        }
        next();
    },

    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var cook = new Cook(
            {
                name: req.body.name,
                employee: req.body.employee,
                category: (typeof req.body.category==='undefined') ? [] : req.body.category,
                _id : req.params.id
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                all_employees: (callback) =>{
                    Employee.find(callback)
                },
                all_categories: (callback) =>{
                    Category.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('cook_create', {title: 'Cook Create', all_employees: results.all_employees, all_categories: results.all_categories});
            });
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
    cook_mark_attendance_postcook_create_post,
    cook_details,
    cook_edit_get,
    cook_edit_put,
    cook_delete_delete,
    cook_mark_attendance_get,
    cook_mark_attendance_post
}