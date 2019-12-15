var Waiter      = require('../models/waiter'),
    Employee    = require('../models/employee'),
    Table       = require('../models/table'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all Waiters GET  #1
var waiter_list = (req,res,next)=>{
    Waiter.find()
        .populate('tables')
        .exec((err, list_waiters) =>{
            if(err){
                return next(err)
            }
            res.render('waiter/waiter_list', { title: 'Waiter List',waiters: list_waiters})
        })
}

//Display waiter create form on GET #2.1
//Get employee and table to pick from
var waiter_create_get = (req,res,next)=>{
    async.parallel({
        all_employees: (callback) =>{
            Employee.find(callback)
        },
        all_tables: (callback) =>{
            Table.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('waiter/waiter_create', {title: 'Waiter Create', all_employees: results.all_employees, all_tables: results.all_tables});
    });
}

//Handle waiter create form on POST #2.2
var waiter_create_post = [
    (req, res, next) => {
        if(!(req.body.table instanceof Array)){
            if(typeof req.body.table==='undefined')
            req.body.table=[];
            else
            req.body.table=new Array(req.body.table);
        }
        next();
    },

    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('*').trim().escape(),

    (req,res,next)=>{
        console.log('***req.body:',req.body);
        const errors = validationResult(req);
        var waiter = new Waiter(
            {
                name : req.body.name,
                employee : req.body.employee,
                table :  (typeof req.body.table==='undefined') ? [] : req.body.table,
                attendance : req.body.attendance
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                all_employees: (callback) =>{
                    Employee.find(callback)
                },
                all_tables: (callback) =>{
                    Table.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('waiter/waiter_create', {title: 'Waiter Create', all_employees: results.all_employees, all_tables: results.all_tables});
            });
            return;
        }
        else {
            waiter.save(function (err) {
                if (err) { return next(err); }
                res.redirect('../waiter');
            });
        }
    }
]

//Display details for a specefic waiter #3 
var waiter_details = (req,res,next)=>{
    Waiter.findById(req.params.id)
        .populate('employee')
        .populate('table')
        .exec((err,waiter)=>{
            if (err) { return next(err); } 
            if (waiter == null) { 
                var err = new Error('Waiter not found');
                err.status = 404;
                return next(err);
            }
            res.render('waiter/waiter_details', { title: 'Table Detail',  waiter: waiter});
        })
}

//Display waiter update form on GET #4.1
var waiter_edit_get = (req,res,next)=>{
    async.parallel({
        waiter: (callback) =>{
            Waiter.findById(req.params.id)
                .populate('employee')
                .populate('table')
                .exec(callback)
        },
        all_employees: (callback) =>{
            Employee.find()
                .exec(callback)
        },
        all_tables: (callback) =>{
            Table.find()
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (waiter == null) { 
            var err = new Error('Waiter not found');
            err.status = 404;
            return next(err);
        }
        res.render('waiter/waiter_edit', { title: 'Update Waiter', waiter: results.waiter , all_employees: results.all_employees, all_tables: results.all_tables});
    });
}

//Handle waiter update form on PUT #4.2
var waiter_edit_put = [
    (req, res, next) => {
        if(!(req.body.waiter instanceof Array)){
            if(typeof req.body.table==='undefined')
            req.body.table=[];
            else
            req.body.waiter=new Array(req.body.table);
        }
        next();
    },

    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var waiter = new Waiter(
            {
                name: req.body.name,
                employee: req.body.employee,
                table: (typeof req.body.table==='undefined') ? [] : req.body.table,
                _id : req.params.id
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                all_employees: (callback) =>{
                    Employee.find(callback)
                },
                all_tables: (callback) =>{
                    Table.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('waiter/waiter_create', {title: 'Waiter Create', all_employees: results.all_employees, all_tables: results.all_tables});
            });
            return;
        }
        else {
            Waiter.findByIdAndUpdate(req.params.id, waiter, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('../waiter');
            });
        }
    }
]

//Display waiter update form on DELETE #5
var waiter_delete_delete = (req,res,next)=>{
    Waiter.findByIdAndRemove(req.body.waiterid, function deleteWaiter(err) {
        if (err) { return next(err); }
        res.redirect('../waiter');
    })
}


//=================Utils controllers================//

//Display mark attendance form on GET #6.1
var waiter_mark_attendance_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: waiter_mark_attendance_get');
}

//Display mark attendance form on POST #6.2
var waiter_mark_attendance_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: waiter_mark_attendance_post');
}


module.exports ={
    waiter_list,
    waiter_create_get,
    waiter_create_post,
    waiter_details,
    waiter_edit_get,
    waiter_edit_put,
    waiter_delete_delete,
    waiter_mark_attendance_get,
    waiter_mark_attendance_post
}