var Table       = require('../models/table'),
    Hall        = require('../models/hall'),
    Waiter      = require('../models/waiter'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all tables #1
var table_list = (req,res, next)=>{
    Table.find()
        .populate('hall')
        .populate('waiter')
        .exec((err, list_table) =>{
            if(err){
                return next(err)
            }
            res.render('table_list', { title: 'Table List', tables: list_table})
        })
}

//Display table create form on GET #2.1
var table_create_get = (req,res,next)=>{
    async.parallel({
        halls: (callback) =>{
            Hall.find(callback)
        },
        waiters: (callback) =>{
            Waiter.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('table_create', {title: 'Table Create', halls: results.halls,waiters: results.waiters,errors: errors.array()});
    });
}

//Handle table create form on POST #2.2
var table_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('capacity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('available').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('location').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var table = new Table(
            {
                name: req.body.name,
                capacity: req.body.capacity,
                available: req.body.available,
                location: req.body.location,
                hall: req.body.hall,
                waiter: req.body.waiter
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                halls: (callback) =>{
                    Hall.find(callback)
                },
                waiters: (callback) =>{
                    Waiter.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('table_create', {title: 'Table Create', halls: results.halls,waiters: results.waiters,errors: errors.array()});
            });
            return;
        }
        else {
            table.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details for a specefic table #3
var table_details = (req,res, next)=>{
    Table.findById(req.params.id)
        .populate('hall')
        .populate('waiter')
        .exec((err, table) => {
            if (err) { return next(err); } 
            if (table == null) { 
                var err = new Error('Table not found');
                err.status = 404;
                return next(err);
            }
            res.render('table_details', { title: 'Table Detail', table: table});
    });

}

//Display table update form on GET #4.1
var table_edit_get = (req,res,next)=>{
    async.parallel({
        table: (callback) =>{
            Table.findById(req.params.id)
                .populate('hall')
                .populate('waiter')
                .exec(callback)
        },
        halls: (callback) =>{
            Hall.find(callback)
        },
        waiters: (callback) =>{
            Waiter.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('table_edit', { title: 'Update Table', table: results.table,halls: results.halls,waiters: results.waiters,errors: errors.array()});
    });
}

//Handle table update form on PUT #4.2
var table_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('capacity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('available').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('location').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var table = new Table(
            {
                name: req.body.name,
                capacity: req.body.capacity,
                available: req.body.available,
                location: req.body.location,
                hall: req.body.hall,
                waiter: req.body.waiter,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                halls: (callback) =>{
                    Hall.find(callback)
                },
                waiters: (callback) =>{
                    Waiter.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('table_create', {title: 'Table Create', halls: results.halls,waiters: results.waiters,errors: errors.array()});
            });
            return;
        }
        else {
            table.findByIdAndUpdate(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display table update form on DELETE #5.1
var table_delete_delete = (req,res,next)=>{
    Table.findByIdAndRemove(req.body.restaurantid, function deleteTable(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}


module.exports = {
    table_list,
    table_create_get,
    table_create_post,
    table_details,
    table_edit_get,
    table_edit_put,
    table_delete_delete
}