var Order           = require('../models/order'),
    DishInstance    = require('../models/dishInstance'),
    async       = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all orders #1
var order_list = (req,res,next)=>{
    Order.find()
        .exec((err, list_order) =>{
            if(err){
                return next(err)
            }
            res.render('order_list', { title: 'Order List', order_list: list_order})
        })
}

//Display order create form on GET #2.1
var order_create_get = (req,res,next)=>{
    res.render('order_create', {title: 'Order Create'});
}

//Handle order create form on POST #2.2
var order_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('items').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('cancellationReqs').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('items').escape(),
    sanitizeBody('cancellationReqs').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var order = new Order(
            {
                status: req.body.status,
                items: req.body.items,
                cancellationReqs: req.body.cancellationReqs,
            }
        );

        if (!errors.isEmpty()) {
            res.render('order_create', {title: 'Order Create'});
            return;
        }
        else {
            order.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details for a specefic order #3 
var order_details = (req,res,next)=>{
    async.parallel({
        order: (callback) =>{
            Order.findById(req.params.id)
                .exec(callback)
        },
        items : (callback) =>{
            DishInstance.find({ 'order': req.params.id }, 'name quantity')
                .exec(callback)
        },
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.order == null) { 
            var err = new Error('Order not found');
            err.status = 404;
            return next(err);
        }
        res.render('order_detail', { title: 'Order Detail', order: results.order, items: results.items});
    });
}

//Display order update form on GET #4.1
var order_edit_get = (req,res,next)=>{
    Order.findById(req.params.id, (err, order)=> {
        if (err) { return next(err); }
        if (order == null) { 
            var err = new Error('Order not found');
            err.status = 404;
            return next(err);
        }
        res.render('order_edit', { title: 'Update Order', order: order });
    });
}

//Handle order update form on PUT #4.2
var order_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('items').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('cancellationReqs').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('items').escape(),
    sanitizeBody('cancellationReqs').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var order = new Order(
            {
                status: req.body.status,
                items: req.body.items,
                cancellationReqs: req.body.cancellationReqs,
            }
        );
        if (!errors.isEmpty()) {
            res.render('order_create', { title: 'Update Order', order: order, errors: errors.array() });
            return;
        }
        else {
            Order.findByIdAndUpdate(req.params.id, order, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display order update form on DELETE #5
var order_delete_delete = (req,res,next)=>{
    Order.findByIdAndRemove(req.body.orderid, function deleteOrder(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}

//same form to handle both(request button-customer, approve button-kitchen manager)
//Display Cancellation form GET #6.1
var order_cancellation_get = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: order_cancellation_get');
}

//Display Cancellation form POST #6.2
var order_cancellation_post = (req,res,next)=>{
    res.send('NOT IMPLEMENTED: order_cancellation_post');
}

module.exports = {
    order_list,
    order_create_get,
    order_create_post,
    order_details,
    order_edit_get,
    order_edit_put,
    order_delete_delete,
    order_cancellation_get,
    order_cancellation_post
}