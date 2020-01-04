var Table       = require('../models/table'),
    Hall        = require('../models/hall'),
    Waiter      = require('../models/waiter'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all tables #1
var table_list = (req,res, next)=>{
    Table.find()
        // .populate('hall')
        .populate('waiter')
        .exec((err, list_table) =>{
            if(err){
                return next(err)
            }
            res.render('table/table_list', { title: 'Table List', tables: list_table})
        })
}

//Display table create form on GET #2.1
var table_create_get = (req,res,next)=>{
    async.parallel({
        // halls: (callback) =>{
        //     Hall.find(callback)
        // },
        waiters: (callback) =>{
            Waiter.find(callback)
            .populate('employee')
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('table/table_create', {title: 'Table Create', waiters: results.waiters });
    });
}

//Handle table create form on POST #2.2
var table_create_post = [
    body('name').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('capacity').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('available').isLength({ min: 1 }).trim().withMessage('Invalid length'),

    sanitizeBody('*').escape(),

    (req,res,next)=>{
        console.log('***req.body:',req.body);
        const errors = validationResult(req);
        var table = new Table(
            {
                name: req.body.name,
                capacity: req.body.capacity,
                available: req.body.available,
                location: {
                    x: req.body.locationx,
                    y: req.body.locationx,
                    z: req.body.locationx,
                },
                // hall: req.body.hall,
                waiter: req.body.waiter
            }
        );
        //TODO: check if location cordinates are not overlapping
        if (!errors.isEmpty()) {
            console.log("ERROR in creating table...redirecting to create form");

            async.parallel({
                // halls: (callback) =>{
                //     Hall.find(callback)
                // },
                waiters: (callback) =>{
                    Waiter.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('table/table_create', {title: 'Table Create', waiters: results.waiters });
            });
            return;
        }
        else {
            table.save(function (err) {
                if (err) { return next(err); }
                res.redirect('../table');
            });
        }
    }
]

//Display details for a specefic table #3
var table_details = (req,res, next)=>{
    Table.findById(req.params.id)
        // .populate('hall')
        .populate('waiter')
        .exec((err, table) => {
            if (err) { return next(err); } 
            if (table == null) { 
                var err = new Error('Table not found');
                err.status = 404;
                return next(err);
            }
            res.render('table/table_details', { title: 'Table Detail', table: table});
    });

}

//Display table update form on GET #4.1
var table_edit_get = (req,res,next)=>{
    async.parallel({
        table: (callback) =>{
            Table.findById(req.params.id)
                .populate('waiter')
                .exec(callback)
        },
        // halls: (callback) =>{
        //     Hall.find(callback)
        // },
        waiters: (callback) =>{
            Waiter.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('table/table_edit', { title: 'Update Table', table: results.table,waiters: results.waiters });
    });
}

//Handle table update form on PUT #4.2
var table_edit_put = [
    body('name').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('capacity').isLength({ min: 1 }).trim().withMessage('Invalid length'),
    body('available').isLength({ min: 1 }).trim().withMessage('Invalid length'),

    sanitizeBody('*').escape(),

    (req,res,next)=>{
        console.log("hereeeeee");
        
        const errors = validationResult(req);
        var table = new Table(
            {
                name: req.body.name,
                capacity: req.body.capacity,
                available: req.body.available,
                location: {
                    x: req.body.locationx,
                    y: req.body.locationx,
                    z: req.body.locationx,
                },
                // hall: req.body.hall,
                waiter: req.body.waiter,
                _id: req.params.id
            }
        );
        //TODO: check if location cordinates are not overlapping
        
        if (!errors.isEmpty()) {
            console.log("ERROR in updating table...redirecting to create form");

            async.parallel({
                table: (callback) =>{
                    Table.findById(req.params.id)
                        .populate('waiter')
                        .exec(callback)
                },
                // halls: (callback) =>{
                //     Hall.find(callback)
                // },
                waiters: (callback) =>{
                    Waiter.find(callback)
                        .populate('employee')
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('table/table_create', {title: 'Table Create', waiters: results.waiters });
            });
            return;
        }
        else {
            Table.findByIdAndUpdate(req.params.id, table, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('../table');
            });
        }
    }
]

//Display table update form on DELETE #5.1
var table_delete_delete = (req,res,next)=>{
    Table.findByIdAndDelete(req.params.id, function deleteTable(err) {
        if (err) { return next(err); }
        res.redirect('../table');
    })
}


module.exports = {
    table_list,
    table_create_get,
    table_create_post,
    table_details,
    table_edit_get,
    table_edit_put,
    table_delete_delete
}