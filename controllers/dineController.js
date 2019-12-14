var Dine                = require('../models/dine'),
    Order               = require('../models/order'),
    Bill                = require('../models/bill'),
    Booking             = require('../models/booking'),
    Waiter              = require('../models/waiter'),
    Customer            = require('../models/customer'),
    TableInstance       = require('../models/tableInstance')
    async               = require('async')
    

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all dines #1
var dine_list = (req,res,next)=>{
    Dine.find()
        .populate('orders')
        .populate('booking')
        .populate('bill')
        .populate('waiter')
        .populate('customer')
        .populate('tableInstances')
        .exec((err, list_dine) =>{
            if(err){
                return next(err)
            }
            res.render('dine_list', { title: 'Dine List', dine_list: list_dine})
        })
}

//Display dine create form on GET #2.1
var dine_create_get = (req,res,next)=>{
    async.parallel({
        //no (order, bill) at the time of creating dine obj
        bookings: (callback) =>{
            Booking.find(callback)
        },
        //if waiters are assigned to dine(not to tables).
        //Decison: waiters are assigned to tables ONLY. Dine can see list of waiters, not assign them
        // waiters: (callback) =>{
        //     Waiter.find(callback)
        // },
        customers: (callback) =>{
            Customer.find(callback)
        },
        tables: (callback) =>{
            TableInstance.find({'isFree':true})
                .exec(callback)
        },
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('dine_create', {title: 'Dine Create', bookings: results.bookings,customers: results.customers,tables: results.tables ,errors: errors.array()});
    });
}

//Handle dine create form on POST #2.2
var dine_create_post = [
    (req, res, next) => {
        if(!(req.body.tableInstances instanceof Array)){
            if(typeof req.body.tableInstances==='undefined')
            req.body.tableInstances=[];
            else
            req.body.tableInstances=new Array(req.body.tableInstances);
        }
        next();
    },

    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var dine = new Dine(
            {
                orders: req.body.orders,
                booking: req.body.booking,
                bill: req.body.bill,
                waiter: req.body.waiter,
                customer: req.body.customer,
                tableInstances: req.body.tableInstances,
                status: req.body.status,
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                bookings: (callback) =>{
                    Booking.find(callback)
                },
                customers: (callback) =>{
                    Customer.find(callback)
                },
                tables: (callback) =>{
                    TableInstance.find({'isFree':true})
                        .exec(callback)
                },
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('dine_create', {title: 'Dine Create', bookings: results.bookings,customers: results.customers,tables: results.tables ,errors: errors.array()});
            });
            return;
        }
        else {
            dine.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display detailsfor a specefic dine #3 :
var dine_details = (req,res,next)=>{
    Dine.findById(req.params.id)
        .populate('orders')
        .populate('booking')
        .populate('bill')
        .populate('waiter')
        .populate('customer')
        .populate('tableInstances')
        .exec((err,dine)=>{
        if (err) { return next(err); } 
        if (dine == null) { 
            var err = new Error('Dine not found');
            err.status = 404;
            return next(err);
        }
        res.render('dine_detail', { title: 'Dine Detail', dine: dine});
    })
}

//Display dine update form on GET #4.1
var dine_edit_get = (req,res,next)=>{
    async.parallel({
        dine: (callback) =>{
            Dine.findById(req.params.id)
                .populate('cook')
                .populate('dish')
                .exec(callback)
        },
        all_orders: (callback) =>{
            Order.find(callback)
        },
        all_bookings: (callback) =>{
            Booking.find(callback)
        },
        all_waiters: (callback) =>{
            Waiter.find(callback)
        },
        all_customers: (callback) =>{
            Customer.find(callback)
        },
        all_tableInstances: (callback) =>{
            TableInstance.find(callback)
        },
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.category == null) { 
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category_edit', { title: 'Update Category', category: results.dine, all_orders: results.all_orders, all_bookings: results.all_bookings, all_waiters: results.all_waiters, all_customers: results.all_customers, all_tableInstances: results.all_tableInstances});
    });

    Dine.findById(req.params.id, (err, dine)=> {
        if (err) { return next(err); }
        if (dine == null) { 
            var err = new Error('Dine not found');
            err.status = 404;
            return next(err);
        }
        res.render('dine_edit', { title: 'Update Dine', dine: dine });
    });
}
//@here
//Handle dine update form on PUT #4.2
var dine_edit_put = [
    sanitizeBody('*').escape(),
    (req,res,next)=>{
        const errors = validationResult(req);
        var dine = new Dine(
            {
                orders: req.body.orders,
                status: req.body.status,
                bill: req.body.bill,
                booking: req.body.booking,
                waiter: req.body.waiter,
                customer: req.body.customer,
            }
        );
        if (!errors.isEmpty()) {
            async.parallel({
                bookings: (callback) =>{
                    Booking.find(callback)
                },
                customers: (callback) =>{
                    Customer.find(callback)
                },
                tables: (callback) =>{
                    TableInstance.find({'isFree':true})
                        .exec(callback)
                },
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('dine_create', {title: 'Dine Create', bookings: results.bookings,customers: results.customers,tables: results.tables ,errors: errors.array()});
            });
            return;
        }
        else {
            Dine.findByIdAndUpdate(req.params.id, dine, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display dine update form on DELETE #5
var dine_delete_delete = (req,res,next)=>{
    Dine.findByIdAndRemove(req.body.dineid, function deleteDine(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}

// reorder:TODO:
var dine_new_order_get = (req,res,next) =>{
    //use dine.neworder
}
//update status: TODO: 
var dine_order_update = (req,res,next) =>{
    
}



module.exports = {
    dine_list,
    dine_create_get,
    dine_create_post,
    dine_details,
    dine_edit_get,
    dine_edit_put,
    dine_delete_delete,
    dine_new_order_get,
    dine_order_update
}