var Dine        = require('../models/dine'),
    Order       = require('../models/order'),
    Bill        = require('../models/bill'),
    Booking     = require('../models/booking'),
    Server      = require('../models/employee'),
    Customer    = require('../models/customer'),
    async       = require('async')
    

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all dines #1
var dine_list = (req,res,next)=>{
    Dine.find()
        .exec((err, list_dine) =>{
            if(err){
                return next(err)
            }
            res.render('dine_list', { title: 'Dine List', dine_list: list_dine})
        })
}

//Display dine create form on GET #2.1
var dine_create_get = (req,res,next)=>{
    res.render('dine_create', {title: 'Dine Create'});
}

//Handle dine create form on POST #2.2
var dine_create_post = [
    body('orders').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('status').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('bill').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('booking').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('server').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('customer').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('orders').escape(),
    sanitizeBody('status').escape(),
    sanitizeBody('bill').escape(),
    sanitizeBody('booking').escape(),
    sanitizeBody('server').escape(),
    sanitizeBody('customer').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var dine = new Dine(
            {
                orders: req.body.orders,
                status: req.body.status,
                bill: req.body.bill,
                booking: req.body.booking,
                server: req.body.server,
                customer: req.body.customer,
            }
        );

        if (!errors.isEmpty()) {
            res.render('dine_create', {title: 'Dine Create'});
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
    async.parallel({
        dine: (callback) =>{
            Dine.findById(req.params.id)
                .exec(callback)
        },
        dine_orders: (callback) =>{
            Order.find({ 'dine': req.params.id })
                .exec(callback)
        },
        dine_bill: (callback) =>{
            Bill.find({ 'dine': req.params.id })
                .exec(callback)
        }
        ,
        dine_booking: (callback) =>{
            Booking.find({ 'dine': req.params.id })
                .exec(callback)
        },
        dine_server: (callback) =>{
            Employee.find({ 'dine': req.params.id }, 'name attendance')
                .exec(callback)
        },
        dine_customer: (callback) =>{
            Customer.find({ 'dine': req.params.id })
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.dine == null) { 
            var err = new Error('Dine not found');
            err.status = 404;
            return next(err);
        }
        res.render('dine_detail', { title: 'Dine Detail', dine: results.dine, dine_dishes: results.dine_dishes, dine_employee: results.dine_employee});
    });
}

//Display dine update form on GET #4.1
var dine_edit_get = (req,res,next)=>{
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

//Handle dine update form on PUT #4.2
var dine_edit_put = [
    body('orders').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('status').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('bill').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('booking').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('server').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('customer').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('orders').escape(),
    sanitizeBody('status').escape(),
    sanitizeBody('bill').escape(),
    sanitizeBody('booking').escape(),
    sanitizeBody('server').escape(),
    sanitizeBody('customer').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var dine = new Dine(
            {
                orders: req.body.orders,
                status: req.body.status,
                bill: req.body.bill,
                booking: req.body.booking,
                server: req.body.server,
                customer: req.body.customer,
            }
        );
        if (!errors.isEmpty()) {
            res.render('dine_create', { title: 'Update Dine', dine: dine, errors: errors.array() });
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



module.exports = {
    dine_list,
    dine_create_get,
    dine_create_post,
    dine_details,
    dine_edit_get,
    dine_edit_put,
    dine_delete_delete
}