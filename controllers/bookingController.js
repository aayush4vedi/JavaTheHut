var Booking             = require('../models/booking'),
    Customer            = require('../models/customer'),
    Dine                = require('../models/dine'),
    TableInstance       = require('../models/tableInstance'),
    async               = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all bookings #1
var booking_list = (req,res,next)=>{
    Booking.find()
        .populate('customer')
        .populate('dine')
        .populate('tableInstance')
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
        customer: (callback) =>{
            Customer.find()
                .exec(callback)
        },
        //only send free tables
        tables: (callback) =>{
            TableInstance.find({'isFree':true})
            .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.customer == null) { 
            var err = new Error('No such customer found');
            err.status = 404;
            return next(err);
        }
        res.render('booking/booking_create', { title: 'Booking Create', customer: results.customer, tables: results.tables});
    });
}

//Handle booking create form on POST #2.2
var booking_create_post = [
    (req, res, next) => {
        if(!(req.body.tableInstance instanceof Array)){
            if(typeof req.body.tableInstance==='undefined')
            req.body.gentableInstancere=[];
            else
            req.body.tableInstance=new Array(req.body.tableInstance);
        }
        next();
    },

    body('checkInTime').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('stayingMinutes').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').trim().escape(),

    (req,res,next)=>{
        console.log('***req.body:',req.body);
        const errors = validationResult(req);
        var booking = new Booking(
            {
                customer: req.body.customer,
                dine: req.body.dine,
                tableInstance: (typeof req.body.tableInstance==='undefined') ? [] : req.body.tableInstance,
                checkInTime: req.body.checkInTime,
                stayingMinutes: req.body.stayingMinutes
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                customer: (callback) =>{
                    Customer.find()
                        .exec(callback)
                },
                //only send free tables
                tables: (callback) =>{
                    TableInstance.find({'isFree':true})
                    .exec(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                if (results.customer == null) { 
                    var err = new Error('No such customer found');
                    err.status = 404;
                    return next(err);
                }
                res.render('booking/booking_create', { title: 'Booking Create', customer: results.customer, tables: results.tables});
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
                .populate('dine')
                .populate('tableInstance')
                .exec(callback)
        },
        booking_dine: (callback) =>{
            Dine.find({ 'booking': req.params.id }, 'orders status bill')
                .exec(callback)
        },
        booking_customer: (callback) =>{
            Customer.find({ 'booking': req.params.id }, 'name')
                .exec(callback)
        },
        booking_tables: (callback) =>{
            TableInstance.find({ 'booking': req.params.id })
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.booking == null) { 
            var err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        res.render('booking/booking_details', { title: 'Booking Detail', booking: results.booking, booking_dine: results.booking_dine, booking_customer: results.booking_customer, booking_tables: results.booking_tables});
    });
}

//Display booking update form on GET #4.1
var booking_edit_get = (req,res,next)=>{
    async.parallel({
        booking: (callback)=>{
            Booking.findById(req.params.id)
                .populate('customer')
                .populate('dine')
                .populate('tableInstance')
                .exec(callback)
        },
        booking_dine: (callback) =>{
            Dine.find({ 'booking': req.params.id }, 'orders status bill')
                .exec(callback)
        },
        booking_customer: (callback) =>{
            Customer.find({ 'booking': req.params.id }, 'name')
                .exec(callback)
        },
        booking_tables: (callback) =>{
            TableInstance.find({ 'booking': req.params.id })
                .exec(callback)
        }, 
        //Get list of all tables, to select from
        all_tables: (callback) =>{
            TableInstance.find(callback)
        }
    },(err, results)=>{
        if (err) { return next(err); } 
        if (results.booking == null) { 
            var err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        res.render('booking/booking_edit', { title: 'Update Booking', booking: results.booking, booking_dine: results.booking_dine, booking_customer: results.booking_customer, booking_tables: results.booking_tables, all_tables: results.all_tables});
    })
}

//Handle booking update form on PUT #4.2
var booking_edit_put = [
    (req, res, next) => {
        if(!(req.body.tableInstance instanceof Array)){
            if(typeof req.body.tableInstance==='undefined')
            req.body.gentableInstancere=[];
            else
            req.body.tableInstance=new Array(req.body.tableInstance);
        }
        next();
    },

    body('customer').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('dine').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('checkInTime').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('stayingMinutes').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').trim().escape(),
    sanitizeBody('tableInstance.*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var booking = new Booking(
            {
                customer: req.body.customer,
                dine: req.body.dine,
                tableInstance: (typeof req.body.tableInstance==='undefined') ? [] : req.body.tableInstance,
                checkInTime: req.body.checkInTime,
                stayingMinutes: req.body.stayingMinutes,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            TableInstance.find(callback)
                .exec((err, all_tables) =>{
                    if(err){
                        return next(err)
                    }
                    res.render('booking/booking_create', { title: 'Booking Create', booking:booking, all_tables: all_tables, errors: errors.array()})
                })
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
    //TODO: optimise this query
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

//Display all bookings by date & tableInstance on GET #9 => no usecase exists

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