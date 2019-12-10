var Category    = require('../models/category'),
    Dish        = require('../models/dish'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all categorys #1
var category_list = (req,res,next)=>{
    Category.find()
        .exec((err, list_category) =>{
            if(err){
                return next(err)
            }
            res.render('category_list', { title: 'Category List', category_list: list_category})
        })
}

//Display category crete form on GET #2.1
var category_create_get = (req,res,next)=>{
    res.render('category_create', {title: 'Category Create'});
}

//Handle category crete form on POST #2.2
var category_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var category = new Category(
            {
                name: req.body.name
            }
        );

        if (!errors.isEmpty()) {
            res.render('category_create', {title: 'Category Create'});
            return;
        }
        else {
            Category.save(function (err) {
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
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.category == null) { 
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category_detail', { title: 'Category Detail', category: results.category, category_dishes: results.category_dishes });
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
    sanitizeBody('name').escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        var category = new Category(
            {
                name: req.body.name,
                _id:  req.params.id
            }
        );
        if (!errors.isEmpty()) {
            res.render('category_form', { title: 'Update Category', category: category, errors: errors.array() });
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