var Bill = require('../models/bill')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all bills #1
var bill_list = (req,res,next)=>{
    Bill.find()
        .exec((err, list_bill) =>{
            if(err){
                return next(err)
            }
            res.render('bill_list', { title: 'Bill List', bill_list: list_bill})
        })
}

//Display bill create form on GET #2.1
var bill_create_get = (req,res,next)=>{
    res.render('bill_create', {title: 'Bill Create'});
}

//Handle bill create form on POST #2.2
var bill_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('dine').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('dineAmount').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('taxAmount').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('serviceCharge').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('payableAmount').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('dine').escape(),
    sanitizeBody('dineAmount').escape(),
    sanitizeBody('taxAmount').escape(),
    sanitizeBody('serviceCharge').escape(),
    sanitizeBody('payableAmount').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var bill = new Bill(
            {
                name: req.body.name,
                order: req.body.order,
                dine: req.body.dine,
                dineAmount: req.body.dineAmount,
                taxAmount: req.body.taxAmount,
                serviceCharge: req.body.serviceCharge,
                payableAmount: req.body.payableAmount
            }
        );

        if (!errors.isEmpty()) {
            res.render('bill_create', {title: 'Bill Create'});
            return;
        }
        else {
            bill.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details(+ it's all dishes) for a specefic bill #3 : TODO: this form will have delete button for dishes as well(dishController)
var bill_details = (req,res,next)=>{
    async.parallel({
        bill: (callback) =>{
            Bill.findById(req.params.id)
                .exec(callback)
        },
        bill_dine: (callback) =>{
            Dine.find({ 'bill': req.params.id }, 'orders status booking ')
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.bill == null) { 
            var err = new Error('Bill not found');
            err.status = 404;
            return next(err);
        }
        res.render('bill_detail', { title: 'Bill Detail', bill: results.bill, bill_dishes: results.bill_dishes, bill_employee: results.bill_employee});
    });
}

//Display bill update form on GET #4.1
var bill_edit_get = (req,res,next)=>{
    Bill.findById(req.params.id, (err, bill)=> {
        if (err) { return next(err); }
        if (bill == null) { 
            var err = new Error('Bill not found');
            err.status = 404;
            return next(err);
        }
        res.render('bill_edit', { title: 'Update Bill', bill: bill });
    });
}

//Handle bill update form on PUT #4.2
var bill_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('dine').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('dineAmount').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('taxAmount').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('serviceCharge').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('payableAmount').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('dine').escape(),
    sanitizeBody('dineAmount').escape(),
    sanitizeBody('taxAmount').escape(),
    sanitizeBody('serviceCharge').escape(),
    sanitizeBody('payableAmount').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var bill = new Bill(
            {
                name: req.body.name,
                order: req.body.order,
                dine: req.body.dine,
                dineAmount: req.body.dineAmount,
                taxAmount: req.body.taxAmount,
                serviceCharge: req.body.serviceCharge,
                payableAmount: req.body.payableAmount
            }
        );
        if (!errors.isEmpty()) {
            res.render('bill_create', { title: 'Update Bill', bill: bill, errors: errors.array() });
            return;
        }
        else {
            Bill.findByIdAndUpdate(req.params.id, bill, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display bill update form on DELETE #5
var bill_delete_delete = (req,res,next)=>{
    Bill.findByIdAndRemove(req.body.billid, function deleteBill(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}

//=================Utils controllers================//

//Show update-payment-status form GET #6.1
var bill_update_payment_status_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: bill_update_payment_status_get');
}

//Show update-payment-status form PUT #6.2
var bill_update_payment_status_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: bill_update_payment_status_post');
}

module.exports = {
    bill_list,
    bill_create_get,
    bill_create_post,
    bill_details,
    bill_edit_get,
    bill_edit_put,
    bill_delete_delete,
    bill_update_payment_status_get,
    bill_update_payment_status_post
}