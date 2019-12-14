var Hall        = require('../models/hall'),
    Table       = require('../models/table'),
    Restaurant  = require('../models/restaurant'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all halls #1
var hall_list = (req,res, next)=>{
    Hall.find()
        .populate('tables')
        .populate('restaurant')
        .exec((err, list_hall) =>{
            if(err){
                return next(err)
            }
            res.render('hall_list', { title: 'Hall List', hall_list: list_hall})
        })
}

//Display hall create form on GET #2.1
var hall_create_get = (req,res,next)=>{
    async.parallel({
        tables: (callback) =>{
            Dish.find(callback)
        },
        restaurant: (callback) =>{
            Cook.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('hall_create', {title: 'Hall Create', tables: results.tables,restaurant: results.restaurant,errors: errors.array()});
    });
}

//Handle hall create form on POST #2.2
var hall_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var hall = new Hall(
            {
                name: req.body.name,
                tables: req.body.tables,
                restaurant: req.body.restaurant
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                tables: (callback) =>{
                    Dish.find(callback)
                },
                restaurant: (callback) =>{
                    Cook.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('hall_create', {title: 'Hall Create', tables: results.tables,restaurant: results.restaurant,errors: errors.array()});
            });
            return;
        }
        else {
            hall.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]


//Display details for a specefic hall #3
var hall_details = (req,res, next)=>{
    Hall.findById(req.params.id)
        .populate('tables')
        .populate('restaurant')
        .exec((err, hall)=> {
        if (err) { return next(err); }
        if (hall == null) { 
            var err = new Error('Hall not found');
            err.status = 404;
            return next(err);
        }
        res.render('hall_details', { title: 'Hall Detail', hall: hall});
    });
}

//Display hall update form on GET #4.1
var hall_edit_get = (req,res,next)=>{
    async.parallel({
        hall: (callback) =>{
            Hall.findById(req.params.id)
                .populate('cook')
                .populate('dish')
                .exec(callback)
        },
        tables: (callback) =>{
            Dish.find(callback)
        },
        restaurant: (callback) =>{
            Cook.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (hall == null) { 
            var err = new Error('Hall not found');
            err.status = 404;
            return next(err);
        }
        res.render('hall_edit', { title: 'Update Hall', hall: results.hall, tables: results.tables, restaurant: results.restaurant});
    })       
}

//Handle hall update form on PUT #4.2
var hall_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var hall = new Hall(
            {
                name: req.body.name,
                tables: req.body.tables,
                restaurant: req.body.restaurant,
                _id:  req.params.id
            }
        );
        if (!errors.isEmpty()) {
            async.parallel({
                tables: (callback) =>{
                    Dish.find(callback)
                },
                restaurant: (callback) =>{
                    Cook.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('hall_create', {title: 'Hall Create', tables: results.tables,restaurant: results.restaurant,errors: errors.array()});
            });
            return;
        }
        else {
            Hall.findByIdAndUpdate(req.params.id, hall, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display hall update form on DELETE #5
var hall_delete_delete = (req,res,next)=>{
    Hall.findByIdAndRemove(req.body.restaurantid, function deleteHall(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}




module.exports = {
    hall_list,
    hall_create_get,
    hall_create_post,
    hall_details,
    hall_edit_get,
    hall_edit_put,
    hall_delete_delete
}