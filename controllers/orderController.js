var Order           = require('../models/order'),
    DishInstance    = require('../models/dishInstance'),
    Dine            = require('../models/dine'),
    async           = require('async')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//===================CRUD controllers================//

//List all orders #1
var order_list = (req,res,next)=>{
    Order.find()
        .populate('items')
        .populate('cancellationReqs')
        .populate('dine')
        .exec((err, list_order) =>{
            if(err){
                return next(err)
            }
            res.render('order/order_list', { title: 'Order List', orders: list_order})
        })
}

//Display order create form on GET #2.1
var order_create_get = (req,res,next)=>{
    async.parallel({
        dishes: (callback) =>{
            DishInstance.find(callback)
        },
        dines : (callback) =>{
            Dine.find(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        res.render('order/order_create', {title: 'Order Create', dishes: results.dishes,dines: results.dines });
    });
}

//Handle order create form on POST #2.2
var order_create_post = [
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        console.log('***req.body:',req.body);
        const errors = validationResult(req);
        var order = new Order(
            {
                status: req.body.status,
                items: req.body.items,
                dine : req.body.dine,
                cancellationReqs: req.body.cancellationReqs,
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                dishes: (callback) =>{
                    DishInstance.find(callback)
                },
                dines : (callback) =>{
                    Dine.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('order/order_create', {title: 'Order Create', dishes: results.dishes,dines: results.dines });
            });
            return;
        }
        else {
            order.save(function (err) {
                if (err) { return next(err); }
                res.redirect('../order');
            });
        }
    }
]

//Display details for a specefic order #3 
var order_details = (req,res,next)=>{
    Order.findById(req.params.id)
        .populate('dine')
        .populate('items')
        .populate('cancellationReqs')
        .exec((err, order)=> {
        if (err) { return next(err); } 
        if (results.order == null) { 
            var err = new Error('Order not found');
            err.status = 404;
            return next(err);
        }
        res.render('order/order_details', { title: 'Order Detail', order: order});
    });
}

//Display order update form on GET #4.1
var order_edit_get = (req,res,next)=>{
    async.parallel({
        order: (callback) =>{
            Order.findById(req.params.id)
                .populate('dine')
                .populate('items')
                .populate('cancellationReqs')
                .exec(callback)
        },
        all_disheinstances: (callback) =>{
            DishInstance.find()
                .exec(callback)
        },
        all_dines: (callback) =>{
            Dine.find()
                .exec(callback)
        }
    },(err, results) => {
        if (err) { return next(err); } 
        if (results.category == null) { 
            var err = new Error('Order not found');
            err.status = 404;
            return next(err);
        }
        res.render('order/order_edit', { title: 'Update Order', order: results.order, all_disheinstances: results.all_disheinstances, all_dines: results.all_dines});
    });
}

//Handle order update form on PUT #4.2
var order_edit_put = [
    sanitizeBody('*').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var order = new Order(
            {
                status: req.body.status,
                items: req.body.items,
                dine : req.body.dine,
                cancellationReqs: req.body.cancellationReqs,
                _id : req.params.id
            }
        );
        if (!errors.isEmpty()) {
            async.parallel({
                dishes: (callback) =>{
                    DishInstance.find(callback)
                },
                dines : (callback) =>{
                    Dine.find(callback)
                }
            },(err, results) => {
                if (err) { return next(err); } 
                res.render('order/order_create', {title: 'Order Create', dishes: results.dishes,dines: results.dines });
            });
            return;
        }
        else {
            Order.findByIdAndUpdate(req.params.id, order, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('../order');
            });
        }
    }
]

//Display order update form on DELETE #5
var order_delete_delete = (req,res,next)=>{
    Order.findByIdAndDelete(req.params.id, function deleteOrder(err) {
        if (err) { return next(err); }
        res.redirect('../order');
    })
}
//TODO: handle cancellation
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