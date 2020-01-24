var Bill        = require('../models/bill'),
    Dine        = require('../models/dine'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all bills #1
var bill_list = (req,res,next)=>{
    Bill.find()
        .populate('dine')
        .exec((err, bills) => {
        if (err) { return next(err); } 
        res.render('bill/bill_list', { title: 'Bills List', bills: bills});
    });
}

//Display bill create form on GET #2.1
// need all Dine objects to select from
var bill_create_get = (req,res,next)=>{
    res.render('bill/bill_create', { title: 'Bill Create'})
}

//Handle bill create form on POST #2.2
var bill_create_post = [
    body('dineAmount').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('taxAmount').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('serviceCharge').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').trim().escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        console.log('***req.body:',req.body);
        
        var bill = new Bill(
            {
                isPaid: req.body.isPaid,
                dineAmount: req.body.dineAmount,
                taxAmount: req.body.taxAmount,
                serviceCharge: req.body.serviceCharge,
            }
        );

        if (!errors.isEmpty()) {
            res.render('bill/bill_create', { title: 'Bill Create', all_dines: all_dines})
            return;
        }
        else {
            bill.save(function (err) {
                if (err) { return next(err); }
                res.redirect('../bill');
            });
        }
    }
]

//Display detailsfor a specefic bill #3 
var bill_details = (req,res,next)=>{
    Bill.findById(req.params.id)
        .exec((err,bill)=>{
            if (err) { return next(err); } 
            if (bill == null) { 
                var err = new Error('Bill not found');
                err.status = 404;
                return next(err);
            }
            res.render('bill/bill_details', { title: 'Bill Detail', bill: bill});
        })
}

//Display bill update form on GET #4.1
var bill_edit_get = (req,res,next)=>{
    Bill.findById(req.params.id)
        .exec((err,bill)=>{
        if (err) { return next(err); } 
        if (bill == null) { 
            var err = new Error('Bill not found');
            err.status = 404;
            return next(err);
        }
        res.render('bill/bill_edit', { title: 'Update Bill', bill: bill});
    });
}

//Handle bill update form on PUT #4.2
var bill_edit_put = [
    body('dineAmount').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('taxAmount').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('serviceCharge').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').trim().escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var bill = new Bill(
            {
                isPaid: req.body.isPaid,
                dine: req.body.dine,
                dineAmount: req.body.dineAmount,
                taxAmount: req.body.taxAmount,
                serviceCharge: req.body.serviceCharge,
                _id:req.params.id
            }
        );
        if (!errors.isEmpty()) {
            Dine.find(callback)
                .exec((err, all_dines) =>{
                    if(err){
                        return next(err)
                    }
                    res.render('bill/bill_create', { title: 'Bill Create', all_dines: all_dines})
                })
            return;
        }
        else {
            Bill.findByIdAndUpdate(req.params.id, bill, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('../bill');
            });
        }
    }
]

//Display bill update form on DELETE #5
var bill_delete_delete = (req,res,next)=>{
    Bill.findByIdAndDelete(req.params.id, function deleteBill(err) {
        if (err) { return next(err); }
        res.redirect('../bill');
    })
}


module.exports = {
    bill_list,
    bill_create_get,
    bill_create_post,
    bill_details,
    bill_edit_get,
    bill_edit_put,
    bill_delete_delete
}