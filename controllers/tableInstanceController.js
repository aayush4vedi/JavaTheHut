var TableInstance       = require('../models/tableInstance'),
    Table                = require('../models/table'),
    Booking            = require('../models/booking'),
    async               = require('async')
        
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all tableInstances #1
var tableInstance_list = (req,res, next)=>{
    TableInstance.find()
        .populate('table')
        .populate('booking')
        .exec((err, list_tableInstance) =>{
            if(err){
                return next(err)
            }
            res.render('tableInstance_list', { title: 'TableInstance List', tableInstance_list: list_tableInstance})
        })
}

//Display tableInstance create form on GET #2.1
var tableInstance_create_get = (req,res,next)=>{
    async.parallel({
        tables: (callback) =>{
            Table.find(callback)
        },
        bookings: (callback) =>{
            Booking.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('tableInstance_create', {title: 'TableInstance Create', tables: results.tables,bookings: results.bookings,errors: errors.array()});
    });
}

//Handle tableInstance create form on POST #2.2
var tableInstance_create_post = [
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var tableInstance = new TableInstance(
            {
                table: req.body.table,
                booking: req.body.booking,
                isFree: req.body.isFree
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                tables: (callback) =>{
                    Table.find(callback)
                },
                bookings: (callback) =>{
                    Booking.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('tableInstance_create', {title: 'TableInstance Create', tables: results.tables,bookings: results.bookings,errors: errors.array()});
            });
            return;
        }
        else {
            tableInstance.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details for a specefic tableInstance #3
var tableInstance_details = (req,res, next)=>{
    TableInstance.findById(req.params.id)
        .populate('table')
        .populate('booking')
        .exec((err, tableInstance) =>{
            if(err){
                return next(err)
            }
            res.render('tableInstance_detail', { title: 'TableInstance Detail',tableInstance: tableInstance})
        })
}

//Display tableInstance update form on GET #4.1
var tableInstance_edit_get = (req,res,next)=>{
    async.parallel({
        tableInstance: (callback) =>{
            TableInstance.findById(req.params.id)
                .populate('hall')
                .populate('waiter')
                .exec(callback)
        },
        all_tables: (callback) =>{
            Table.find(callback)
        },
        all_bookings: (callback) =>{
            Booking.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); }
        if (tableInstance == null) { 
            var err = new Error('TableInstance not found');
            err.status = 404;
            return next(err);
        }
        res.render('tableInstance_edit', { title: 'Update TableInstance', tableInstance: results.tableInstance, all_tables: results.all_tables, all_bookings: results.all_bookings });
    });
}

//Handle tableInstance update form on PUT #4.2
var tableInstance_edit_put = [
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var tableInstance = new TableInstance(
            {
                table: req.body.table,
                booking: req.body.booking,
                isFree: req.body.isFree,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                tables: (callback) =>{
                    Table.find(callback)
                },
                bookings: (callback) =>{
                    Booking.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('tableInstance_create', {title: 'TableInstance Create', tables: results.tables,bookings: results.bookings,errors: errors.array()});
            });
            return;
        }
        else {
            tableInstance.findByIdAndUpdate(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display tableInstance update form on DELETE #5.1
var tableInstance_delete_delete = (req,res,next)=>{
    TableInstance.findByIdAndRemove(req.body.restaurantid, function deleteTableInstance(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}




module.exports = {
    tableInstance_list,
    tableInstance_create_get,
    tableInstance_create_post,
    tableInstance_details,
    tableInstance_edit_get,
    tableInstance_edit_put,
    tableInstance_delete_deleteg
}