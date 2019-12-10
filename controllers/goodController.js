var Good = require('../models/good')

//===================CRUD controllers================//

//List all goods #1
var good_list = (req,res, next)=>{
    Good.find()
    .exec((err, list_good) =>{
        if(err){
            return next(err)
        }
        res.render('good_list', { title: 'Good List', good_list: list_good})
    })
}

//Display good crete form on GET #2.1
var good_create_get = (req,res,next)=>{
    res.render('good_create', {title: 'Good Create'});
}

//Handle good crete form on POST #2.2
var good_create_post = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('linkToPurchase').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('threshold').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('defaultPurchase').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('quantityInStock').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('linkToPurchase').escape(),
    sanitizeBody('threshold').escape(),
    sanitizeBody('defaultPurchase').escape(),
    sanitizeBody('quantityInStock').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var good = new Good(
            {
                name: req.body.name,
                linkToPurchase: req.body.namlinkToPurchasee,
                threshold: req.body.threshold,
                defaultPurchase: req.body.defaultPurchase,
                quantityInStock: req.body.naquantityInStockme,
            }
        );

        if (!errors.isEmpty()) {
            res.render('good_create', {title: 'Good Create'});
            return;
        }
        else {
            Good.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display details for a specefic good #3
var good_details = (req,res, next)=>{
    Good.findById(req.params.id, (err, good)=> {
        if (err) { return next(err); }
        if (good == null) { 
            var err = new Error('Good not found');
            err.status = 404;
            return next(err);
        }
        res.render('good_detail', { title: 'Good Detail', good: results.good, good_dishes: results.good_dishes });
    });
}

//Display good update form on GET #4.1
var good_edit_get = (req,res, next)=>{
    Good.findById(req.params.id, (err, good)=> {
        if (err) { return next(err); }
        if (good == null) { 
            var err = new Error('Good not found');
            err.status = 404;
            return next(err);
        }
        res.render('good_edit', { title: 'Update Good', good: good });
    });
}

//Handle good update form on PUT #4.2
var good_edit_put = [
    body('name').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('linkToPurchase').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('threshold').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('defaultPurchase').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    body('quantityInStock').isLength({ min: 3 }).trim().withMessage('Invalid length'),
    
    sanitizeBody('name').escape(),
    sanitizeBody('linkToPurchase').escape(),
    sanitizeBody('threshold').escape(),
    sanitizeBody('defaultPurchase').escape(),
    sanitizeBody('quantityInStock').escape(),

    (req,res,next)=>{
        const errors = validationResult(req);
        var good = new Good(
            {
                name: req.body.name,
                linkToPurchase: req.body.namlinkToPurchasee,
                threshold: req.body.threshold,
                defaultPurchase: req.body.defaultPurchase,
                quantityInStock: req.body.naquantityInStockme,
            }
        );

        if (!errors.isEmpty()) {
            res.render('good_create', {title: 'Good Create'});
            return;
        }
        else {
            Good.findByIdAndUpdate(req.params.id, good, {}, (err)=> {
                if (err) { return next(err); }
                res.redirect('/');      //TODO: add redirect url here
            });
        }
    }
]

//Display good update form on DELETE #5
var good_delete_delete = (req,res,next)=>{
    Good.findByIdAndRemove(req.body.goodid, function deleteGood(err) {
        if (err) { return next(err); }
        res.redirect('/');      //TODO: add redirect url here
    })
}



module.exports = {
    good_list,
    good_create_get,
    good_create_post,
    good_details,
    good_edit_get,
    good_edit_put,
    good_delete_delete
}