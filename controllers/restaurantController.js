var Restaurant = require('../models/restaurant'),
    Hall       = require('../models/hall')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
    
//===================CRUD controllers================//

//List all restaurants #1
var restaurant_list = (req,res, next)=>{
    Restaurant.find()
        .exec((err, list_restaurant) =>{
            if(err){
                return next(err)
            }
            res.render('restaurant_list', { title: 'Restaurant List', restaurant_list: list_restaurant})
        })
}

//Display restaurant create form on GET #2.1
var restaurant_create_get = (req,res,next)=>{
    res.render('restaurant_create', {title: 'Restaurant Create'});
}

//Handle restaurant create form on POST #2.2
var restaurant_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),
    body('activePlanID').isLength({ min: 1 }).trim().withMessage('Invalid input is entered'),
    body('phone').isLength({ min: 3 }).trim().withMessage('Invalid input is entered'),
    body('address').isLength({ min: 3 }).trim().withMessage('Invalid input is entered'),
    body('halls').isLength({ min: 3 }).trim().withMessage('Invalid input is entered'),

    sanitizeBody('name').escape(),
    sanitizeBody('activePlanID').escape(),
    sanitizeBody('phone').escape(),
    sanitizeBody('address').escape(),
    sanitizeBody('halls').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var restaurant = new Restaurant(
            {
                name: req.body.name,
                naactivePlanIDme: req.body.activePlanID,
                phone: req.body.phone,
                address: req.body.address,
                addhalls: req.body.halls
            }
        );

        if (!errors.isEmpty()) {
            res.render('restaurant_create', {title: 'Restaurant Create'});
            return;
        }
        else {
            restaurant.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details for a specefic restaurant #3
var restaurant_details = (req,res, next)=>{
    async.parallel({
        restaurant: (callback) => {
            Restaurant.findById(req.params.id)
                .exec(callback)
        },
        restaurnat_halls: (callback) => {
            Hall.find({ 'restaurant': req.params.id }, 'name')
                .exec(callback)
        },
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.restaurant == null) { 
            var err = new Error('Restaurant not found');
            err.status = 404;
            return next(err);
        }
        res.render('restaurant_detail', { title: 'Restaurant Detail', restaurant: results.restaurant, restaurnat_halls: results.restaurnat_halls });
    });
}

//Display restaurant update form on GET #4.1
var restaurant_edit_get = (req,res,next)=>{
    Restaurant.findById(req.params.id, (err, restaurant)=> {
        if (err) { return next(err); }
        if (restaurant == null) { 
            var err = new Error('Restaurant not found');
            err.status = 404;
            return next(err);
        }
        res.render('restaurant_edit', { title: 'Update Restaurant', restaurant: restaurant });
    });
}

//Handle restaurant update form on PUT #4.2
var restaurant_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),
    body('activePlanID').isLength({ min: 1 }).trim().withMessage('Invalid input is entered'),
    body('phone').isLength({ min: 3 }).trim().withMessage('Invalid input is entered'),
    body('address').isLength({ min: 3 }).trim().withMessage('Invalid input is entered'),
    body('halls').isLength({ min: 3 }).trim().withMessage('Invalid input is entered'),

    sanitizeBody('name').escape(),
    sanitizeBody('activePlanID').escape(),
    sanitizeBody('phone').escape(),
    sanitizeBody('address').escape(),
    sanitizeBody('halls').escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        var restaurant = new Restaurant(
            {
                name: req.body.name,
                naactivePlanIDme: req.body.activePlanID,
                phone: req.body.phone,
                address: req.body.address,
                halls: req.body.halls,
                _id:  req.params.id
            }
        );
        if (!errors.isEmpty()) {
            res.render('restaurant_form', { title: 'Update Restaurant', restaurant: restaurant, errors: errors.array() });
            return;
        }
        else {
            Restaurant.findByIdAndUpdate(req.params.id, restaurant, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display restaurant update form on DELETE #5
var restaurant_delete_delete = (req,res,next)=>{
    Restaurant.findByIdAndRemove(req.body.restaurantid, function deleteRestaurant(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}



module.exports = {
    restaurant_list,
    restaurant_create_get,
    restaurant_create_post,
    restaurant_details,
    restaurant_edit_get,
    restaurant_edit_put,
    restaurant_delete_delete
}