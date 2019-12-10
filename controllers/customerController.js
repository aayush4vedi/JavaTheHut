var Customer = require('../models/customer')


const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all customers #1
var customer_list = (req,res, next)=>{
    Customer.find()
    .exec((err, list_customer) =>{
        if(err){
            return next(err)
        }
        res.render('customer_list', { title: 'Customer List', customer_list: list_customer})
    })
}

//Display customer crete form on GET #2.1
var customer_create_get = (req,res,next)=>{
    res.render('customer_create', {title: 'Customer Create'});
}

//Handle customer crete form on POST #2.2
var customer_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),
    body('email').isLength({ min: 10 }).trim().withMessage('Email must be >= 10 characters.'),
    body('phone').isLength({ min: 11 }).trim().withMessage('Phone must be >= 11 characters.'),

    sanitizeBody('name').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone').escape(),

    // Process request after validation and sanitization
    (req,res,next)=>{

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Customer object with escaped and trimmed data
        var customer = new Customer(
            {
                name: req.body.name
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('customer_create', {title: 'Customer Create'});
            return;
        }
        else {
            // Save customer.
            customer.save( (err)=> {
                if (err) { return next(err); }
                // Successful - redirect 
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details for a specefic customer #3
var customer_details = (req,res, next)=>{
    Customer.findById(req.params.id,(err, customer) => {
        if (err) { return next(err); } // Error in API usage.
        if (customer == null) { // No results.
            var err = new Error('Customer not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('customer_detail', { title: 'Customer Detail', customer: customer});
    });
}

//Display customer update form on GET #4.1
var customer_edit_get = (req,res,next)=>{
    Customer.findById(req.params.id, (err, customer)=> {
        if (err) { return next(err); }
        if (customer == null) { // No results.
            var err = new Error('Customer not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('customer_edit', { title: 'Update Customer', customer: customer });
    });
}

//Handle customer update form on PUT #4.2
var customer_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),
    body('email').isLength({ min: 10 }).trim().withMessage('Email must be >= 10 characters.'),
    body('phone').isLength({ min: 11 }).trim().withMessage('Phone must be >= 11 characters.'),

    sanitizeBody('name').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone').escape(),

    (req, res, next) => {
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
            res.render('customer_form', { title: 'Update Customer', customer: customer, errors: errors.array() });
            return;
        }
        else {
            Customer.findByIdAndUpdate(req.params.id, customer, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]


//Display customer update form on DELETE #5
var customer_delete_delete = (req,res,next)=>{
    Customer.findByIdAndRemove(req.body.customerid, function deleteCustomer(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}



module.exports = {
    customer_list,
    customer_create_get,
    customer_create_post,
    customer_details,
    customer_edit_get,
    customer_edit_put,
    customer_delete_delete
}

