var Customer    = require('../models/customer'),
    Booking     = require('../models/booking'),
    async       = require('async')


const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all customers #1
var customer_list = (req,res, next)=>{
    Customer.find()
        .sort([['name', 'ascending']])
        .exec((err, list_customer) =>{
            if(err){
                return next(err)
            }
            res.render('customer/customer_list', { title: 'Customer List', customers: list_customer})
        })
}

//Display customer create form on GET #2.1
var customer_create_get = (req,res,next)=>{
    //bookings are created for existing customers.So new customer won't neeed it/
    res.render('customer/customer_create', {title: 'Customer Create'});
}

//Handle customer create form on POST #2.2
var customer_create_post = [
    body('name').isLength({ min: 1 }).trim().withMessage('Name must be >= 3 characters.'),
    body('email').isLength({ min: 5 }).trim().withMessage('Email must be >= 10 characters.'),
    body('phone').isLength({ min: 10 }).trim().withMessage('Phone must be >= 11 characters.'),

    sanitizeBody('*').escape(),
    (req,res,next)=>{
        console.log('***req.body:',req.body);
        const errors = validationResult(req);
        var customer = new Customer(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        );

        if (!errors.isEmpty()) {
            res.render('customer/customer_create', {title: 'Customer Create'});
            return;
        }
        else {
            customer.save( (err)=> {
                if (err) { return next(err); }
                res.redirect('../customer');
            });
        }
    }
]

//Display details for a specefic customer #3
var customer_details = (req,res, next)=>{
    Customer.findById(req.params.id)
        .exec((err,customer)=>{
            if (err) { return next(err); } 
            if (customer == null) { 
                var err = new Error('Customer not found');
                err.status = 404;
                return next(err);
            }
            res.render('customer/customer_details', { title: 'Customer Detail', customer: customer});
        })
}

//Display customer update form on GET #4.1
var customer_edit_get = (req,res,next)=>{
    Customer.findById(req.params.id)
        .exec((err,customer)=>{
        if (err) { return next(err); } 
        if (customer == null) { 
            var err = new Error('Customer not found');
            err.status = 404;
            return next(err);
        }
        res.render('customer/customer_edit', { title: 'Update Customer', customer: customer});
    });
}

//Handle customer update form on PUT #4.2
var customer_edit_put = [
    body('name').isLength({ min: 1 }).trim().withMessage('Name must be >= 3 characters.'),
    body('email').isLength({ min: 5 }).trim().withMessage('Email must be >= 10 characters.'),
    body('phone').isLength({ min: 10 }).trim().withMessage('Phone must be >= 11 characters.'),

    sanitizeBody('*').escape(),
    (req,res,next)=>{
        const errors = validationResult(req);
        var customer = new Customer(
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                _id:  req.params.id
            }
        );
        if (!errors.isEmpty()) {
            res.render('customer/customer_create', { title: 'Update Customer', customer: customer, errors: errors.array() });
            return;
        }
        else {
            Customer.findByIdAndUpdate(req.params.id, customer, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('../customer');
            });
        }
    }
]


//Display customer update form on DELETE #5
var customer_delete_delete = (req,res,next)=>{
    Customer.findByIdAndDelete(req.params.id, (err, deletecustomer)=> {
        if (err) { return next(err); }
        res.redirect('../customer');
    })
}

//Display all bookings(list) by customerID on GET #6
// var booking_for_customer_get = (req,res,next)=>{
//     Booking.find({'customer' : req.params.id})
//         .populate('customer')
//         .populate('dine')
//         .populate('tableInstance')
//         .exec((err, list_booking) =>{
//             if(err){
//                 return next(err)
//             }
//             res.render('booking/booking_list', { title: 'Booking List', booking_list: list_booking})
//         })
// }



module.exports = {
    customer_list,
    customer_create_get,
    customer_create_post,
    customer_details,
    customer_edit_get,
    customer_edit_put,
    customer_delete_delete,
    // booking_for_customer_get
}

