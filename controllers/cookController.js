var Cook     = require('../models/cook'),
    Employee = require('../models/employee'),
    Category = require('../models/category'),
    async    = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all Cooks GET  #1
var cook_list = (req,res,next)=>{
    Cook.find()
        // .populate('category') //TODO: 
        .sort([['cookID', 'ascending']])
        .exec((err, list_cooks) =>{
            if(err){
                return next(err)
            }
            res.render('cook/cook_list', { title: 'Cook List',cooks: list_cooks})
        })
}

//Display cook create form on GET #2.1
//Get employee and category to pick from
var cook_create_get = (req,res,next)=>{
    Employee.find()
        .exec((err, employees) => {
        if (err) { return next(err); } 
        res.render('cook/cook_create', {title: 'Cook Create', employees: employees});
    });
}

//Handle cook create form on POST #2.2
var cook_create_post = [
    sanitizeBody('*').trim().escape(),

    (req,res,next)=>{
        console.log('***req.body:',req.body);
        const errors = validationResult(req);
        var cook = new Cook(
            {
                cookID : req.body.cookID,
                employee : req.body.employee
            }
        );

        if (!errors.isEmpty()) {
            console.log("ERROR in creating cook...redirecting to create form");

            Employee.find()
                .exec((err, employees) => {
                if (err) { return next(err); } 
                res.render('cook/cook_create', {title: 'Cook Create', employees: employees});
            });
            return;
        }
        else {
            cook.save(function (err) {
                if (err) { return next(err); }
                res.redirect('../cook');
            });
        }
    }
]

//Display details for a specefic cook #3 
var cook_details = (req,res,next)=>{
    Cook.findById(req.params.id)
        .populate('employee')
        // .populate('category')    //TODO: 
        .exec((err,cook)=>{
            if (err) { return next(err); } 
            if (cook == null) { 
                var err = new Error('Cook not found');
                err.status = 404;
                return next(err);
            }
            res.render('cook/cook_details', { title: 'Cook Detail',  cook: cook});
        })
}

//Display cook update form on GET #4.1
var cook_edit_get = (req,res,next)=>{
    async.parallel({
        cook: (callback) =>{
            Cook.findById(req.params.id)
                .populate('employee')
                // .populate('category')    //TODO: 
                .exec(callback)
        },
        employees: (callback) =>{
            Employee.find()
                .exec(callback)
        }
        // all_categories: (callback) =>{       //TODO:
        //     Category.find()
        //         .exec(callback)
        // }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.cook == null) { 
            var err = new Error('Cook not found');
            err.status = 404;
            return next(err);
        }
        res.render('cook/cook_edit', { title: 'Update Cook', cook: results.cook ,employees: results.employees});
    });
}

//Handle cook update form on PUT #4.2
var cook_edit_put = [
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var cook = new Cook(
            {
                cookID : req.body.cookID,
                employee : req.body.employee,
                _id : req.params.id
            }
        );

        if (!errors.isEmpty()) {
            console.log("ERROR in creating cook...redirecting to create form");

            Employee.find()
                .exec((err, employees) => {
                if (err) { return next(err); } 
                res.render('cook/cook_create', {title: 'Cook Create', employees: employees});
            });
            return;
        }
        else {
            Cook.findByIdAndUpdate(req.params.id, cook, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('../cook');
            });
        }
    }
]

//Display cook update form on DELETE #5
var cook_delete_delete = (req,res,next)=>{
    Cook.findByIdAndDelete(req.params.id, function deleteCook(err) {
        if (err) { return next(err); }
        res.redirect('../cook');
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