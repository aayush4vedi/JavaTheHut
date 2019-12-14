var Category    = require('../models/category'),
    Dish        = require('../models/dish'),
    Cook        = require('../models/cook'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all categories with their dishes#1  => Menu
var category_list = (req,res,next)=>{
    Category.find()
        .sort([['name', 'ascending']])
        .populate('dish')
        .populate('cook')
        .exec((err,category_list)=>{
            if (err) { return next(err); } 
            res.render('category_list', { title: 'Menu: Category List', category: category_list});
        })
}

//Display category create form on GET #2.1
var category_create_get = (req,res,next)=>{
    async.parallel({
        dishes: (callback) =>{
            Dish.find(callback)
        },
        cooks: (callback) =>{
            Cook.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('category_create', {title: 'Category Create', dishes: results.dishes,cooks: results.cooks,errors: errors.array()});
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
                dish: (callback) =>{
                    Dish.find(callback)
                },
                cook: (callback) =>{
                    Cook.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('category_create', {title: 'Category Create', dish: results.dish,cook: results.cook,errors: errors.array()});
            });
            return;
        }
        else {
            // Check if Category with same name already exists.
            Category.findOne({ 'name': req.body.name })
                .exec( function(err, found_category) {
                     if (err) { return next(err); }
                     if (found_category) {
                         // Genre exists, redirect to its detail page.
                         res.redirect('/');  //TODO: add url here
                     }
                     else {
                        category.save(function (err) {
                            if (err) { return next(err); }
                            res.redirect('/');      //TODO: add redirect url here
                        });
                     }

                 });
        }
    }
]

//Display details(+ it's all dishes) for a specefic category #3 : TODO: this form will have delete button for dishes as well(dishController)
var category_details = (req,res,next)=>{
    async.parallel({
        category: (callback) =>{
            Category.findById(req.params.id)
                .populate('cook')
                .populate('dish')
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.category == null) { 
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category_detail', { title: 'Category Detail', category: results.category, category_dishes: results.category_dishes, category_cook: results.category_cook});
    });
}

//Display category update form on GET #4.1
var category_edit_get = (req,res,next)=>{
    async.parallel({
        category: (callback) =>{
            Category.findById(req.params.id)
                .populate('cook')
                .populate('dish')
                .exec(callback)
        },
        all_dishes: (callback) =>{
            Dish.find()
                .exec(callback)
        },
        all_cooks: (callback) =>{
            Cook.find()
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.category == null) { 
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category_edit', { title: 'Update Category', category: results.category, all_dishes: results.all_dishes, all_cooks: results.all_cooks});
    });
}

//Handle category update form on PUT #4.2
var category_edit_put = [
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
                cook: (typeof req.body.cook==='undefined') ? [] : req.body.cook,
                dish: (typeof req.body.dish==='undefined') ? [] : req.body.dish,
                _id : req.params.id
            }
        );
        if (!errors.isEmpty()) {
            async.parallel({
                dishes: (callback) =>{
                    Dish.find(callback)
                },
                cooks: (callback) =>{
                    Cook.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('category_create', {title: 'Category Create', dishes: results.dishes,cooks: results.cooks,errors: errors.array()});
            });
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