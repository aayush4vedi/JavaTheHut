var Dish        = require('../models/dish'),
    Category    = require('../models/category'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all dishs #1
var dish_list = (req,res,next)=>{
    Dish.find()
        .exec((err, list_dish) =>{
            if(err){
                return next(err)
            }
            res.render('dish_list', { title: 'Dish List', dish_list: list_dish})
        })
}

//Display dish create form on GET #2.1
var dish_create_get = (req,res,next)=>{
    res.render('dish_create', {title: 'Dish Create'});
}

//Handle dish create form on POST #2.2
var dish_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('description').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('ingredients').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('goods').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('category').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('price').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('isServing').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('veg').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('eta').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('description').escape(),
    sanitizeBody('ingredients').escape(),
    sanitizeBody('goods').escape(),
    sanitizeBody('category').escape(),
    sanitizeBody('price').escape(),
    sanitizeBody('isServing').escape(),
    sanitizeBody('veg').escape(),
    sanitizeBody('eta').escape(),

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
            res.render('dish_create', {title: 'Dish Create'});
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
    Dish.findById(req.params.id, (err, dish)=> {
        if (err) { return next(err); }
        if (dish == null) { 
            var err = new Error('Dish not found');
            err.status = 404;
            return next(err);
        }
        res.render('dish_edit', { title: 'Update Dish', dish: dish });
    });
}

//Handle dish update form on PUT #4.2
var dish_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('description').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('ingredients').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('goods').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('category').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('price').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('isServing').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('veg').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('eta').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('description').escape(),
    sanitizeBody('ingredients').escape(),
    sanitizeBody('goods').escape(),
    sanitizeBody('category').escape(),
    sanitizeBody('price').escape(),
    sanitizeBody('isServing').escape(),
    sanitizeBody('veg').escape(),
    sanitizeBody('eta').escape(),

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
            res.render('dish_create', { title: 'Update Dish', dish: dish, errors: errors.array() });
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



//=================Utils controllers================//

//Display mark is-serving-status form on GET #6.1
var dish_mark_is_serving_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_mark_is_serving_get');
}

//Handle mark is-serving-status form on POST #6.2
var dish_mark_is_serving_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_mark_is_serving_post');
}

// display all dishes of given Category #7
var dish_for_cateogry_id_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: dish_for_cateogry_id_get');
}

module.exports = {
    dish_list,
    dish_create_get,
    dish_create_post,
    dish_details,
    dish_edit_get,
    dish_edit_put,
    dish_delete_delete,
    dish_mark_is_serving_get,
    dish_mark_is_serving_post,
    dish_for_cateogry_id_get
}