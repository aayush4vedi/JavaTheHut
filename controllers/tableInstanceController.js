var TableInstance       = require('../models/tableInstance'),
    Hall                = require('../models/hall'),
    Employee            = require('../models/employee'),
    async               = require('async')
        
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all tableInstances #1
var tableInstance_list = (req,res, next)=>{
    TableInstance.find()
        .exec((err, list_tableInstance) =>{
            if(err){
                return next(err)
            }
            res.render('tableInstance_list', { title: 'TableInstance List', tableInstance_list: list_tableInstance})
        })
}

//Display tableInstance create form on GET #2.1
var tableInstance_create_get = (req,res,next)=>{
    res.render('tableInstance_create', {title: 'TableInstance Create'});
}

//Handle tableInstance create form on POST #2.2
var tableInstance_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('capacity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('available').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('location').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('tableInstance').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('employee').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('name').escape(),
    sanitizeBody('capacity').escape(),
    sanitizeBody('available').escape(),
    sanitizeBody('location').escape(),
    sanitizeBody('tableInstance').escape(),
    sanitizeBody('employee').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var tableInstance = new TableInstance(
            {
                name: req.body.name,
                capacity: req.body.capacity,
                available: req.body.available,
                location: req.body.location,
                tableInstance: req.body.tableInstance,
                employee: req.body.employee
            }
        );

        if (!errors.isEmpty()) {
            res.render('tableInstance_create', {title: 'TableInstance Create'});
            return;
        }
        else {
            tableInstance.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details for a specefic tableInstance #3
var tableInstance_details = (req,res, next)=>{
    async.parallel({
        tableInstance: (callback) => {
            TableInstance.findById(req.params.id)
                .exec(callback)
        },
        tableInstance_hall: (callback) => {
            Hall.find({ 'tableInstance': req.params.id }, 'name')
                .exec(callback)
        },
        tableInstance_employee: (callback) => {
            Employee.find({ 'tableInstance': req.params.id }, 'name')
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.tableInstance == null) { 
            var err = new Error('TableInstance not found');
            err.status = 404;
            return next(err);
        }
        res.render('tableInstance_detail', { title: 'TableInstance Detail', tableInstance: results.tableInstance, tableInstance_hall: results.tableInstance_hall, tabltableInstance_employeee_hall: results.tableInstance_employee});
    });

}

//Display tableInstance update form on GET #4.1
var tableInstance_edit_get = (req,res,next)=>{
    TableInstance.findById(req.params.id, (err, tableInstance)=> {
        if (err) { return next(err); }
        if (tableInstance == null) { 
            var err = new Error('TableInstance not found');
            err.status = 404;
            return next(err);
        }
        res.render('tableInstance_edit', { title: 'Update TableInstance', tableInstance: tableInstance });
    });
}

//Handle tableInstance update form on PUT #4.2
var tableInstance_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('capacity').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('available').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('location').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('tableInstance').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('employee').isLength({ min: 3 }).trim().withMessage('Invalid length'),

    sanitizeBody('name').escape(),
    sanitizeBody('capacity').escape(),
    sanitizeBody('available').escape(),
    sanitizeBody('location').escape(),
    sanitizeBody('tableInstance').escape(),
    sanitizeBody('employee').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var tableInstance = new TableInstance(
            {
                name: req.body.name,
                capacity: req.body.capacity,
                available: req.body.available,
                location: req.body.location,
                tableInstance: req.body.tableInstance,
                employee: req.body.employee
            }
        );

        if (!errors.isEmpty()) {
            res.render('tableInstance_create', {title: 'TableInstance Create'});
            return;
        }
        else {
            tableInstance.findByIdAndUpdate(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display tableInstance update form on DELETE #5.1
var tableInstance_delete_delete = (req,res,next)=>{
    TableInstance.findByIdAndRemove(req.body.restaurantid, function deleteTableInstance(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}


//=================Utils controllers================//

//Display all bookings by tableID on GET #7
var booking_for_table_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: booking_for_table_get');
}

//Display mark attendance form on GET #6.1
var tableInstance_location_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: tableInstance_location_get');
}

//show availability: GET #7.1
var tableInstance_availability_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: tableInstance_availability_get');
}

//no need for new form.Just edit form will do here
//update availabiltity- show form: GET #7.2
var tableInstance_update_availability_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: tableInstance_update_availability_get');
}

//update availabiltity: PUT #7.3
var tableInstance_update_availability_put = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: tableInstance_update_availability_put');
}


module.exports = {
    tableInstance_list,
    tableInstance_create_get,
    tableInstance_create_post,
    tableInstance_details,
    tableInstance_edit_get,
    tableInstance_edit_put,
    tableInstance_delete_delete,
    tableInstance_location_get,
    tableInstance_availability_get,
    tableInstance_update_availability_get,
    tableInstance_update_availability_put
}