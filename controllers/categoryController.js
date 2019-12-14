var Category    = require('../models/category'),
    Dish        = require('../models/dish'),
    Cook        = require('../models/cook'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all categories with their dishes#1  => Menu
var category_list = (req,res,next)=>{
    async.parallel({
        category: (callback) =>{
            Bill.Category()
                .sort([['name', 'ascending']])
                .populate('dish')
                .exec(callback)
        },
        dish: (callback) =>{
            Dish.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.bill == null) { 
            var err = new Error('No Bills found');
            err.status = 404;
            return next(err);
        }
        res.render('category_list', { title: 'Menu: Category List', category: results.category, dish: results.dish});
    });
}

//Display category create form on GET #2.1
var category_create_get = (req,res,next)=>{
    async.parallel({
        category: (callback) =>{
            Bill.Category()
                .sort([['name', 'ascending']])
                .populate('dish')
                .exec(callback)
        },
        dish: (callback) =>{
            Dish.find(callback)
        },
        cook: (callback) =>{
            Cook.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.bill == null) { 
            var err = new Error('No Bills found');
            err.status = 404;
            return next(err);
        }
        res.render('category_create', {title: 'Category Create', category: results.category, dish: results.dish,cook: results.cook,errors: errors.array()});
    });
}

//Handle category create form on POST #2.2
var category_create_post = [
    (req, res, next) => {
        if(!(req.body.cook instanceof Array)){
            if(typeof req.body.cook==='undefined')
            req.body.cook=[];
            else
            req.body.cook=new Array(req.body.cook);
        }
        if(!(req.body.dish instanceof Array)){
            if(typeof req.body.dish==='undefined')
            req.body.dish=[];
            else
            req.body.dish=new Array(req.body.dish);
        }
        next();
    },

    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('*').escape(),
    sanitizeBody('cook.*').escape(),
    sanitizeBody('dish.*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var category = new Category(
            {
                name: req.body.name,
                cook:  (typeof req.body.cook==='undefined') ? [] : req.body.cook,
                dish:  (typeof req.body.dish==='undefined') ? [] : req.body.dish
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                category: (callback) =>{
                    Bill.Category()
                        .sort([['name', 'ascending']])
                        .populate('dish')
                        .exec(callback)
                },
                dish: (callback) =>{
                    Dish.find(callback)
                },
                cook: (callback) =>{
                    Cook.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                if (results.bill == null) { 
                    var err = new Error('No Bills found');
                    err.status = 404;
                    return next(err);
                }
                res.render('category_create', {title: 'Category Create', category: results.category, dish: results.dish,cook: results.cook,errors: errors.array()});
            });
            return;
        }
        else {
            category.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details(+ it's all dishes) for a specefic category #3 : TODO: this form will have delete button for dishes as well(dishController)
var category_details = (req,res,next)=>{
    async.parallel({
        category: (callback) =>{
            Category.findById(req.params.id)
                .exec(callback)
        },
        category_dishes: (callback) =>{
            Dish.find({ 'category': req.params.id }, 'name description ingredients price isServing veg eta')
                .exec(callback)
        },
        category_cook: (callback) =>{
            Cook.find({ 'category': req.params.id }, 'name attendance')
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.category == null) { 
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category_detail', { title: 'Category Detail', category: results.category, category_dishes: results.category_dishes, category_waiter: results.category_waiter});
    });
}

//Display category update form on GET #4.1
var category_edit_get = (req,res,next)=>{
    Category.findById(req.params.id, (err, category)=> {
        if (err) { return next(err); }
        if (category == null) { 
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category_edit', { title: 'Update Category', category: category });
    });
}

//Handle category update form on PUT #4.2
var category_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('waiter').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('dish').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('waiter').escape(),
    sanitizeBody('dish').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var category = new Category(
            {
                name: req.body.name,
                waiter: req.body.waiter,
                dish: req.body.dish,
            }
        );
        if (!errors.isEmpty()) {
            res.render('category_create', { title: 'Update Category', category: category, errors: errors.array() });
            return;
        }
        else {
            Category.findByIdAndUpdate(req.params.id, category, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display category update form on DELETE #5
var category_delete_delete = (req,res,next)=>{
    Category.findByIdAndRemove(req.body.categoryid, function deleteCategory(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}


module.exports = {
    category_list,
    category_create_get,
    category_create_post,
    category_details,
    category_edit_get,
    category_edit_put,
    category_delete_delete
}