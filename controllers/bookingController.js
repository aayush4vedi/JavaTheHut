var Booking             = require('../models/booking'),
    Customer            = require('../models/customer'),
    // Dine                = require('../models/dine'),
    Table               = require('../models/table'),
    async               = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all bookings #1
var booking_list = (req,res,next)=>{
    Booking.find()
        .populate('customer')
        .populate('table')
        .exec((err, list_booking) =>{
            if(err){
                return next(err)
            }
            res.render('booking/booking_list', { title: 'Booking List', bookings: list_booking})
        })
}

//Display booking create form on GET #2.1
var booking_create_get = (req,res,next)=>{
    //Get list of all tables,customers to select from.Dine is not formed yet.
    async.parallel({
        customers: (callback) =>{
            Customer.find()
                .exec(callback)
        },
        //only send free tables
        tables: (callback) =>{
            Table.find()
                .exec(callback)
            // Table.find({'available':'Yes'})
        }           //TODO: show only tables whose capacity is >= size
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.customers== null) { 
            var err = new Error('No customers found');
            err.status = 404;
            return next(err);
        }
        if (results.tables == null) { 
            var err = new Error('No free tables found');
            err.status = 404;
            return next(err);
            //TODO: handle this 
        }
        res.render('booking/booking_create', { title: 'Booking Create', customers: results.customers, tables: results.tables});
    });
}

//Handle booking create form on POST #2.2
var booking_create_post = [
    // (req, res, next) => {
    //     if(!(req.body.table instanceof Array)){
    //         if(typeof req.body.table==='undefined')
    //         req.body.table=[];
    //         else
    //         req.body.table=new Array(req.body.table);
    //     }
    //     next();
    // },

    body('checkInTime').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('stayingMinutes').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').trim().escape(),

    (req,res,next)=>{
        console.log('***req.body:',req.body);
        console.log("table: ",req.body.table);

        const errors = validationResult(req);
        var booking = new Booking(
            {
                customer: req.body.customer,
                size    : req.body.size,
                // dine: req.body.dine,
                table : req.body.table,
                checkInTime: req.body.checkInTime,
                stayingMinutes: req.body.stayingMinutes
            }
        );
        //TODO: write logic here to check if size >= table.capacity, else show error
        if (!errors.isEmpty()) {
            console.log("Error in create post...Redirecting to create page");
            async.parallel({
                customers: (callback) =>{
                    Customer.find()
                        .exec(callback)
                },
                //only send free tables
                tables: (callback) =>{
                    Table.find({'available':'Yes'})
                    .exec(callback)
                }           //TODO: show only tables whose capacity is >= size
            },(err, results) => {
                if (err) { return next(err); } 
                if (results.customers== null) { 
                    var err = new Error('No customers found');
                    err.status = 404;
                    return next(err);
                }
                if (results.tables == null) { 
                    var err = new Error('No free tables found');
                    err.status = 404;
                    return next(err);
                    //TODO: handle this 
                }
                res.render('booking/booking_create', { title: 'Booking Create', customers: results.customers, tables: results.tables});
            });
            return;
        }
        else {
            booking.save(function (err) {
                if (err) { return next(err); }
                res.redirect('../booking');
            });
        }
    }
]

//Display details for a specefic booking #3 
var booking_details = (req,res,next)=>{
    async.parallel({
        booking: (callback) =>{
            Booking.findById(req.params.id)
                .populate('customer')
                .populate('table')
                .exec(callback)
        },
        // booking_customer: (callback) =>{
        //     Customer.find({ 'booking': req.params.id }, 'name')
        //         .exec(callback)
        // },
        // booking_tables: (callback) =>{
        //     TableInstance.find({ 'booking': req.params.id })
        //         .exec(callback)
        // }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.booking == null) { 
            var err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        res.render('booking/booking_details', { title: 'Booking Detail', booking: results.booking});
    });
}

//Display booking update form on GET #4.1
var booking_edit_get = (req,res,next)=>{
    async.parallel({
        booking: (callback)=>{
            Booking.findById(req.params.id)
                .populate('customer')
                .populate('table')
                .exec(callback)
        },
        customers: (callback) =>{
            Customer.find()
                .exec(callback)
        },
        //Get list of all tables, to select from
        tables: (callback) =>{
            Table.find(callback)
        }                                   //TODO: show only tables whose capacity is >= size
    },(err, results)=>{
        if (err) { return next(err); } 
        if (results.booking == null) { 
            var err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        res.render('booking/booking_edit', { title: 'Update Booking', booking: results.booking, customers: results.customers, tables: results.tables});
    })
}

//Handle booking update form on PUT #4.2
var booking_edit_put = [
    (req, res, next) => {
        if(!(req.body.table instanceof Array)){
            if(typeof req.body.table==='undefined')
            req.body.gentableInstancere=[];
            else
            req.body.table=new Array(req.body.table);
        }
        next();
    },

    body('customer').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('checkInTime').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('stayingMinutes').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').trim().escape(),
    sanitizeBody('table.*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var booking = new Booking(
            {
                customer: req.body.customer,
                size    : req.body.size,
                // dine: req.body.dine,
                table : req.body.table,
                checkInTime: req.body.checkInTime,
                stayingMinutes: req.body.stayingMinutes,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            console.log("Error in edit...Redirecting to create page");
            
            async.parallel({
                customers: (callback) =>{
                    Customer.find()
                        .exec(callback)
                },
                //only send free tables
                tables: (callback) =>{
                    Table.find()
                    // Table.find({'available':'Yes'})
                    .exec(callback)
                }           //TODO: show only tables whose capacity is >= size
            },(err, results) => {
                if (err) { return next(err); } 
                if (results.customers== null) { 
                    var err = new Error('No customers found');
                    err.status = 404;
                    return next(err);
                }
                if (results.tables == null) { 
                    var err = new Error('No free tables found');
                    err.status = 404;
                    return next(err);
                    //TODO: handle this 
                }
                res.render('booking/booking_create', { title: 'Booking Create', customers: results.customers, tables: results.tables});
            });
            return;
        }
        else {
            Booking.findByIdAndUpdate(req.params.id, booking, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('../booking');
            });
        }
    }
]

//Display booking update form on DELETE #5
var booking_delete_delete = (req,res,next)=>{
    Booking.findByIdAndDelete(req.params.id, function deleteBooking(err) {
        if (err) { return next(err); }
        res.redirect('../booking');
    })
}

//===================Utils controllers================//

//Display all bookings by checkInTime &  checkOutTime on GET #6 
//:: find all bookings overlapping withing this time => to get list of all the busy tables at time t
var booking_for_time_get = (req,res,next)=>{
    //TODO: re-write this query
    Booking.find({ 'checkInTime': req.params.checkintime , 'checkOutTime': req.params.checkouttime}, (err, booking)=> {
        if (err) { return next(err); }
        if (booking == null) { 
            var err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        //render the same list page
        res.render('booking/booking_list', { title: 'Listings all bookings in this time', booking: booking });
    });
}

//Display all bookings by date & table on GET #9 => no usecase exists

module.exports = {
    booking_list,
    booking_create_get,
    booking_create_post,
    booking_details,
    booking_edit_get,
    booking_edit_put,
    booking_delete_delete,
    booking_for_time_get
}