var Dish        = require('../models/dish'),
    Category    = require('../models/category'),
    Good        = require('../models/good'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all dishs #1
var dish_list = (req,res,next)=>{
    Dish.find()
        .sort([['name', 'ascending']])
        .populate('category')
        .exec((err, list_dish) =>{
            if(err){
                return next(err)
            }
            res.render('dish_list', { title: 'Dish List', dish_list: list_dish})
        })
}

//Display dish create form on GET #2.1
var dish_create_get = (req,res,next)=>{
    async.parallel({
        all_categories: (callback) =>{
            Category.find(callback)
        },
        all_goods: (callback) =>{
            Good.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('dish_create', {title: 'Dish Create', all_categories: results.all_categories,all_goods: results.all_goods,errors: errors.array()});
    });
}

//Handle dish create form on POST #2.2
var dish_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('description').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('ingredients').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('price').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('isServing').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('veg').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('eta').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var dish = new Dish(
            {
                name: req.body.name,
                description: req.body.description,
                ingredients: req.body.ingredients,
                goods: req.body.goods,
                category: req.body.category,
                price: req.body.price,
                isServing: req.body.isServing,
                veg: req.body.veg,
                eta: req.body.eta,
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                all_categories: (callback) =>{
                    Category.find(callback)
                },
                all_goods: (callback) =>{
                    Good.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('dish_create', {title: 'Dish Create', all_categories: results.all_categories,all_goods: results.all_goods,errors: errors.array()});
            });
            return;
        }
        else {
            dish.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display detailsfor a specefic dish #3 :
var dish_details = (req,res,next)=>{
    async.parallel({
        dish: (callback) =>{
            Dish.findById(req.params.id)
                .exec(callback)
        },
        dish_category: (callback) =>{
            Category.find({ 'dish': req.params.id })
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.dish == null) { 
            var err = new Error('Dish not found');
            err.status = 404;
            return next(err);
        }
        res.render('dish_detail', { title: 'Dish Detail', dish: results.dish, dish_category: results.dish_category});
    });
}

//Display dish update form on GET #4.1
var dish_edit_get = (req,res,next)=>{
    async.parallel({
        dish: (callback) =>{
            Dish.findById(req.params.id)
                .populate('category')
                .populate('good')
                .exec(callback)
        },
        all_categories: (callback) =>{
            Category.find(callback)
        },
        all_goods: (callback) =>{
            Good.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.category == null) { 
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('dish_edit', { title: 'Update Dish', dish: dish, all_categories: results.all_categories,all_goods: results.all_goods,errors: errors.array()});
    });
}

//Handle dish update form on PUT #4.2
var dish_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('description').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('ingredients').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('price').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('isServing').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('veg').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('eta').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var dish = new Dish(
            {
                name: req.body.name,
                description: req.body.description,
                ingredients: req.body.ingredients,
                goods: req.body.goods,
                category: req.body.category,
                price: req.body.price,
                isServing: req.body.isServing,
                veg: req.body.veg,
                eta: req.body.eta,
                _id: req.params.id
            }
        );
        if (!errors.isEmpty()) {
            async.parallel({
                all_categories: (callback) =>{
                    Category.find(callback)
                },
                all_goods: (callback) =>{
                    Good.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('dish_create', {title: 'Dish Create', all_categories: results.all_categories,all_goods: results.all_goods,errors: errors.array()});
            });
            return;
        }
        else {
            Dish.findByIdAndUpdate(req.params.id, dish, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display dish update form on DELETE #5
var dish_delete_delete = (req,res,next)=>{
    Dish.findByIdAndRemove(req.body.dishid, function deleteDish(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}


module.exports = {
    dish_list,
    dish_create_get,
    dish_create_post,
    dish_details,
    dish_edit_get,
    dish_edit_put,
    dish_delete_delete
}