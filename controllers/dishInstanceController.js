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
        .exec((err, list_dishInstance) =>{
            if(err){
                return next(err)
            }
            res.render('dishInstance_list', { title: 'DishInstance List', dishInstance_list: list_dishInstance})
        })
}

//Display dishInstance create form on GET #2.1
var dishInstance_create_get = (req,res,next)=>{
    res.render('dishInstance_create', {title: 'DishInstance Create'});
}

//Handle dishInstance create form on POST #2.2
var dishInstance_create_post = [
    body('dish').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('order').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('quantity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('dish').escape(),
    sanitizeBody('order').escape(),
    sanitizeBody('quantity').escape(),

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
            res.render('dishInstance_create', {title: 'DishInstance Create'});
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
        .exec((err, results) => {
        if (err) { return next(err); } 
        if (results.dishInstance == null) { 
            var err = new Error('DishInstance not found');
            err.status = 404;
            return next(err);
        }
        res.render('dishInstance_detail', { title: 'DishInstance Detail', dishInstance: results.dishInstance, dishInstance_dish: results.dishInstance_dish, dishInstance_order: results.dishInstance_order});
    });
}

//TODO: this is buggy
//Display dishInstance update form on GET #4.1
var dishInstance_edit_get = (req,res,next)=>{
    async.parallel({
        dishInstance: (callback) =>{
            DishInstance.findById(req.params.id).populate('dish order').exec(callback)
        },
        dishes: function(callback) {
            Dish.find(callback)
        },
        orders: function(callback) {
            Order.find(callback)
        },
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.dishInstance == null) { 
            var err = new Error('DishInstance not found');
            err.status = 404;
            return next(err);
        }
        res.render('dishInstance_detail', { title: 'DishInstance Detail', dish_list : results.dishes, order : results.order, selected_dish : results.dishinstance.dish._id, dishInstance:results.dishInstance});
    });
}

//Handle dishInstance update form on PUT #4.2
var dishInstance_edit_put = [
    body('dish').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('order').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('quantity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('dish').escape(),
    sanitizeBody('order').escape(),
    sanitizeBody('quantity').escape(),

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
            res.render('dishInstance_create', { title: 'Update DishInstance', dishInstance: dishInstance, errors: errors.array() });
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