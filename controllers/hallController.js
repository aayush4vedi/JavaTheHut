var Hall        = require('../models/hall'),
    Table       = require('../models/table'),
    Restaurant  = require('../models/restaurant')

//===================CRUD controllers================//

//List all halls #1
var hall_list = (req,res, next)=>{
    Hall.find()
        .exec((err, list_hall) =>{
            if(err){
                return next(err)
            }
            res.render('hall_list', { title: 'Hall List', hall_list: list_hall})
        })
}

//Display hall crete form on GET #2.1
var hall_create_get = (req,res,next)=>{
    res.render('hall_create', {title: 'Hall Create'});
}

//Handle hall crete form on POST #2.2
var hall_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),
    body('tables').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),
    body('restaurant').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),

    sanitizeBody('name').escape(),
    sanitizeBody('tables').escape(),
    sanitizeBody('restaurant').escape(),

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
            res.render('restaurant_create', {title: 'Restaurant Create'});
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
    async.parallel({
        hall: (callback) => {
            Hall.findById(req.params.id)
                .exec(callback)
        },
        hall_tables: (callback) => {
            Table.find({ 'hall': req.params.id }, 'capacity available location')
                .exec(callback)
        },
        hall_restaurnat: (callback) => {
            Restaurant.find({ 'hall': req.params.id }, 'name')
                .exec(callback)
        },
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.hall == null) { 
            var err = new Error('Hall not found');
            err.status = 404;
            return next(err);
        }
        res.render('hall_detail', { title: 'Hall Detail', hall: results.hall, hall_tables: results.hall_tables, hall_restaurnat: results.hall_restaurnat});
    });
}

//Display hall update form on GET #4.1
var hall_edit_get = (req,res,next)=>{
    Hall.findById(req.params.id, (err, hall)=> {
        if (err) { return next(err); }
        if (hall == null) { 
            var err = new Error('Hall not found');
            err.status = 404;
            return next(err);
        }
        res.render('hall_edit', { title: 'Update Hall', hall: hall });
    });
}

//Handle hall update form on PUT #4.2
var hall_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),
    body('tables').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),
    body('restaurant').isLength({ min: 3 }).trim().withMessage('Name must be >= 3 characters.'),

    sanitizeBody('name').escape(),
    sanitizeBody('tables').escape(),
    sanitizeBody('restaurant').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        var hall = new Hall(
            {
                name: req.body.name,
                tables: req.body.tables,
                restaurant: req.body.restaurant
            }
        );
        if (!errors.isEmpty()) {
            res.render('hall_form', { title: 'Update Hall', hall: hall, errors: errors.array() });
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