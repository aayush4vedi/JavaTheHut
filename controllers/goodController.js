var Good        = require('../models/good')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all goods #1
var good_list = (req,res, next)=>{
    Good.find()
    .exec((err, list_good) =>{
        if(err){
            return next(err)
        }
        res.render('good/good_list', { title: 'Good List', goods: list_good})
    })
}

//Display good create form on GET #2.1
var good_create_get = (req,res,next)=>{
    res.render('good/good_create', {title: 'Good Create'});
}

//Handle good create form on POST #2.2
var good_create_post = [
    body('name').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('linkToPurchase').isLength({ min: 1 }).trim().withMessage('Invalid length'),

    sanitizeBody('name').escape(),
    sanitizeBody('linkToPurchase').escape(),
    sanitizeBody('threshold').escape(),
    sanitizeBody('defaultPurchase').escape(),
    sanitizeBody('quantityInStock').escape(),

    (req,res,next)=>{
        console.log('***req.body:',req.body);
        const errors = validationResult(req);
        var good = new Good(
            {
                name: req.body.name,
                linkToPurchase: req.body.linkToPurchase,
                threshold: req.body.threshold,
                defaultPurchase: req.body.defaultPurchase,
                quantityInStock: req.body.quantityInStock,
            }
        );

        if (!errors.isEmpty()) {
            res.render('good/good_create', {title: 'Good Create'});
            return;
        }
        else {
            good.save(function (err) {
                if (err) { return next(err); }
                res.redirect('../good');
            });
        }
    }
]

//Display details for a specefic good #3
var good_details = (req,res, next)=>{
    Good.findById(req.params.id, (err, good)=> {
        if (err) { return next(err); }
        if (good == null) { 
            var err = new Error('Good not found');
            err.status = 404;
            return next(err);
        }
        res.render('good/good_details', { title: 'Good Details', good: good});
    });
}

//Display good update form on GET #4.1
var good_edit_get = (req,res, next)=>{
    Good.findById(req.params.id, (err, good)=> {
        if (err) { return next(err); }
        if (good == null) { 
            var err = new Error('Good not found');
            err.status = 404;
            return next(err);
        }
        res.render('good/good_edit', { title: 'Update Good', good: good });
    });
}

//Handle good update form on PUT #4.2
var good_edit_put = [
    body('name').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('linkToPurchase').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('linkToPurchase').escape(),
    sanitizeBody('threshold').escape(),
    sanitizeBody('defaultPurchase').escape(),
    sanitizeBody('quantityInStock').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var good = new Good(
            {
                name: req.body.name,
                linkToPurchase: req.body.linkToPurchase,
                threshold: req.body.threshold,
                defaultPurchase: req.body.defaultPurchase,
                quantityInStock: req.body.quantityInStock,
                _id:  req.params.id
            }
        );

        if (!errors.isEmpty()) {
            res.render('good/good_create', {title: 'Good Create'});
            return;
        }
        else {
            Good.findByIdAndUpdate(req.params.id, good, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('../good');
            });
        }
    }
]

//Display good update form on DELETE #5
var good_delete_delete = (req,res,next)=>{
    Good.findByIdAndDelete(req.params.id, function deleteGood(err) {
        if (err) { return next(err); }
        res.redirect('../good');
    })
}



module.exports = {
    good_list,
    good_create_get,
    good_create_post,
    good_details,
    good_edit_get,
    good_edit_put,
    good_delete_delete
}