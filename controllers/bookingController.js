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
        .exec((err, list_booking) =>{
            if(err){
                return next(err)
            }
            res.render('booking_list', { title: 'Booking List', booking_list: list_booking})
        })
}

//Display booking create form on GET #2.1
var booking_create_get = (req,res,next)=>{
    res.render('booking_create', {title: 'Booking Create'});
}

//Handle booking create form on POST #2.2
var booking_create_post = [
    body('customer').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('dine').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('tableInstance').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('checkInTime').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('stayingMinutes').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('customer').escape(),
    sanitizeBody('dine').escape(),
    sanitizeBody('tableInstance').escape(),
    sanitizeBody('checkInTime').escape(),
    sanitizeBody('stayingMinutes').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var booking = new Booking(
            {
                customer: req.body.customer,
                dine: req.body.dine,
                tableInstance: req.body.tableInstance,
                checkInTime: req.body.checkInTime,
                stayingMinutes: req.body.stayingMinutes
            }
        );

        if (!errors.isEmpty()) {
            res.render('booking_create', {title: 'Booking Create'});
            return;
        }
        else {
            booking.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details(+ it's all dishes) for a specefic booking #3 : TODO: this form will have delete button for dishes as well(dishController)
var booking_details = (req,res,next)=>{
    async.parallel({
        booking: (callback) =>{
            Booking.findById(req.params.id)
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
        res.render('booking_detail', { title: 'Booking Detail', booking: results.booking, booking_dine: results.booking_dine, booking_customer: results.booking_customer, booking_tables: results.booking_tables});
    });
}

//Display booking update form on GET #4.1
var booking_edit_get = (req,res,next)=>{
    Booking.findById(req.params.id, (err, booking)=> {
        if (err) { return next(err); }
        if (booking == null) { 
            var err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        res.render('booking_edit', { title: 'Update Booking', booking: booking });
    });
}

//Handle booking update form on PUT #4.2
var booking_edit_put = [
    body('customer').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('dine').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('tableInstance').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('checkInTime').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('stayingMinutes').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('customer').escape(),
    sanitizeBody('dine').escape(),
    sanitizeBody('tableInstance').escape(),
    sanitizeBody('checkInTime').escape(),
    sanitizeBody('stayingMinutes').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var booking = new Booking(
            {
                customer: req.body.customer,
                dine: req.body.dine,
                tatableInstanceble: req.body.tableInstance,
                checkInTime: req.body.checkInTime,
                stayingMinutes: req.body.stayingMinutes,
                _id : req.params.id
            }
        );
        if (!errors.isEmpty()) {
            res.render('booking_create', { title: 'Update Booking', booking: booking, errors: errors.array() });
            return;
        }
        else {
            Booking.findByIdAndUpdate(req.params.id, booking, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display booking update form on DELETE #5
var booking_delete_delete = (req,res,next)=>{
    Booking.findByIdAndRemove(req.body.bookingid, function deleteBooking(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}

//===================Utils controllers================//

//Display all bookings by checkInTime &  checkOutTime on GET #8 
//:: find all bookings overlapping withing this time => to get list of all the busy tables at time t
var booking_for_time_get = (req,res,next)=>{
    //TODO: optimise query
    Booking.find({ 'checkInTime': req.params.checkInTime , 'checkOutTime': req.params.checkOutTime}, (err, booking)=> {
        if (err) { return next(err); }
        if (booking == null) { 
            var err = new Error('Booking not found');
            err.status = 404;
            return next(err);
        }
        //render the same list page
        res.render('booking_list', { title: 'Listings all bookings in this time', booking: booking });
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