var Table = require('../models/table'),
    Hall  = require('../models/hall')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all tables #1
var table_list = (req,res, next)=>{
    Table.find()
        .exec((err, list_table) =>{
            if(err){
                return next(err)
            }
            res.render('table_list', { title: 'Table List', table_list: list_table})
        })
}

//Display table create form on GET #2.1
var table_create_get = (req,res,next)=>{
    res.render('table_create', {title: 'Table Create'});
}

//Handle table create form on POST #2.2
var table_create_post = [
    body('capacity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('available').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('location').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('table').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('capacity').escape(),
    sanitizeBody('available').escape(),
    sanitizeBody('location').escape(),
    sanitizeBody('table').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var table = new Table(
            {
                capacity: req.body.capacity,
                available: req.body.available,
                location: req.body.location,
                table: req.body.table
            }
        );

        if (!errors.isEmpty()) {
            res.render('table_create', {title: 'Table Create'});
            return;
        }
        else {
            table.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details for a specefic table #3
var table_details = (req,res, next)=>{
    async.parallel({
        table: (callback) => {
            Table.findById(req.params.id)
                .exec(callback)
        },
        table_hall: (callback) => {
            Hall.find({ 'table': req.params.id }, 'name')
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.table == null) { 
            var err = new Error('Table not found');
            err.status = 404;
            return next(err);
        }
        res.render('table_detail', { title: 'Table Detail', table: results.table, table_hall: results.table_hall});
    });

}

//Display table update form on GET #4.1
var table_edit_get = (req,res,next)=>{
    Table.findById(req.params.id, (err, table)=> {
        if (err) { return next(err); }
        if (table == null) { 
            var err = new Error('Table not found');
            err.status = 404;
            return next(err);
        }
        res.render('table_edit', { title: 'Update Table', table: table });
    });
}

//Handle table update form on PUT #4.2
var table_edit_put = [
    body('capacity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('available').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('location').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('table').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('capacity').escape(),
    sanitizeBody('available').escape(),
    sanitizeBody('location').escape(),
    sanitizeBody('table').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var table = new Table(
            {
                capacity: req.body.capacity,
                available: req.body.available,
                location: req.body.location,
                table: req.body.table,
                _id:  req.params.id
            }
        );

        if (!errors.isEmpty()) {
            res.render('table_create', {title: 'Table Create'});
            return;
        }
        else {
            Table.findByIdAndUpdate(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display table update form on DELETE #5.1
var table_delete_delete = (req,res,next)=>{
    Table.findByIdAndRemove(req.body.restaurantid, function deleteTable(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}


//=================Utils controllers================//

//Display mark attendance form on GET #6.1
var table_location_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_location_get');
}

//show availability: GET #7.1
var table_availability_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_availability_get');
}

//no need for new form.Just edit form will do here
//update availabiltity- show form: GET #7.2
var table_update_availability_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_update_availability_get');
}

//update availabiltity: PUT #7.3
var table_update_availability_put = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: table_update_availability_put');
}


module.exports = {
    table_list,
    table_create_get,
    table_create_post,
    table_details,
    table_edit_get,
    table_edit_put,
    table_delete_delete,
    table_location_get,
    table_availability_get,
    table_update_availability_get,
    table_update_availability_put
}