var DishInstance    = require('../models/dishInstance'),
    Dish            = require('../models/dish'),
    Order           = require('../models/order'),
    async           = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all dishInstances #1
var dishInstance_list = (req,res,next)=>{
    DishInstance.find()
        .populate('dish')
        .populate('order')
        .exec((err, list_dishInstance) =>{
            if(err){
                return next(err)
            }
            res.render('dishInstance_list', { title: 'DishInstance List', dishInstances: list_dishInstance})
        })
}

//Display dishInstance create form on GET #2.1
var dishInstance_create_get = (req,res,next)=>{
    async.parallel({
        dishes: (callback) =>{
            Dish.find(callback)
        },
        orders: (callback) =>{
            Order.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('dishInstance_create', {title: 'DishInstance Create', dishes: results.dishes,orders: results.orders,errors: errors.array()});
    });
}

//Handle dishInstance create form on POST #2.2
var dishInstance_create_post = [
    body('quantity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var dishInstance = new DishInstance(
            {
                dish: req.body.dish,
                order: req.body.order,
                quantity: req.body.quantity
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                dishes: (callback) =>{
                    Dish.find(callback)
                },
                orders: (callback) =>{
                    Order.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('dishInstance_create', {title: 'DishInstance Create', dishes: results.dishes,orders: results.orders,errors: errors.array()});
            });
            return;
        }
        else {
            dishInstance.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display detailsfor a specefic dishInstance #3 :
//only show thd Dish here, ther's no point in showing DishInstance
var dishInstance_details = (req,res,next)=>{
    DishInstance.findById(req.params.id)
        .populate('dish')
        .populate('order')
        .exec((err, results) => {
        if (err) { return next(err); } 
        if (results == null) { 
            var err = new Error('DishInstance not found');
            err.status = 404;
            return next(err);
        }
        res.render('dishInstance_details', { title: 'DishInstance Detail', dishInstance: results});
    });
}

//TODO: this is buggy
//Display dishInstance update form on GET #4.1
var dishInstance_edit_get = (req,res,next)=>{
    async.parallel({
        dishInstance: (callback) =>{
            DishInstance.findById(req.params.id)
                .populate('order')
                .populate('dish')
                .exec(callback)
        },
        all_dishes: function(callback) {
            Dish.find(callback)
        },
        all_orders: function(callback) {
            Order.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.dishInstance == null) { 
            var err = new Error('DishInstance not found');
            err.status = 404;
            return next(err);
        }
        res.render('dishInstance_details', { title: 'DishInstance Detail',dishInstance: results.dishInstance, all_dishes: results.all_dishes, all_orders: results.all_orders});
    });
}

//Handle dishInstance update form on PUT #4.2
var dishInstance_edit_put = [
    body('quantity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var dishInstance = new DishInstance(
            {
                dish: req.body.dish,
                order: req.body.order,
                quantity: req.body.quantity,
                _id : req.params.id
            }
        );
        if (!errors.isEmpty()) {
            async.parallel({
                dishes: (callback) =>{
                    Dish.find(callback)
                },
                orders: (callback) =>{
                    Order.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('dishInstance_create', {title: 'DishInstance Create', dishes: results.dishes,orders: results.orders,errors: errors.array()});
            });
            return;
        }
        else {
            DishInstance.findByIdAndUpdate(req.params.id, dishInstance, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display dishInstance update form on DELETE #5
var dishInstance_delete_delete = (req,res,next)=>{
    DishInstance.findByIdAndRemove(req.body.dishInstanceid, function deleteDishInstance(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}

module.exports = {
    dishInstance_list,
    dishInstance_create_get,
    dishInstance_create_post,
    dishInstance_details,
    dishInstance_edit_get,
    dishInstance_edit_put,
    dishInstance_delete_delete
}