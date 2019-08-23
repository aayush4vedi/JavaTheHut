var express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    mongoose    = require('mongoose'),
    Hotel       = require('./models/hotel'),
    Comment     = require('./models/comment')
    seedDB      = require('./seeds')

mongoose.connect('mongodb://localhost/yelp_hotel');    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+ '/public'));
app.set('view engine','ejs');
seedDB();

app.get('/', (req,res)=>{ 
    res.render('home'); 
});
//INDEX
app.get('/hotels', (req,res)=>{
    Hotel.find({},(err, allHotels)=>{
        if(err){
            console.log(err);
        }else{
            res.render('hotels/index',{hotels: allHotels});
        }
    });
});
//NEW
app.post('/hotels', (req,res)=>{
    Hotel.create(req.body.hotel,(err, hotel)=>{
        if(err){
            console.log(err);
        }else{
            console.log('SUCCESSFULLY created entry', hotel);
        }
    });
    res.redirect('/hotels');
});
//order is important here!!!
//CREATE 
app.get('/hotels/new', (req,res)=>{
    res.render('hotels/new');
});
//SHOW
app.get('/hotels/:id',(req,res)=>{
    Hotel.findById(req.params.id).populate('comments').exec((err,found)=>{
        if(err){
            console.log(err);
        }else{
            res.render('hotels/show',{hotel: found});
            // console.log('added comments to: ',found);
        }
    });
});
// ============================
// COMMENTS ROUTES
// ============================
//CREATE
app.get('/hotels/:id/comments/new',(req,res)=>{
    Hotel.findById(req.params.id, (err, hotel)=>{
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', {hotel: hotel});
        }
    });
});
//NEW
app.post('/hotels/:id/comments',(req,res)=>{
    //lookup for hotel using id
    //create new comment
    //connect comment to hotel
    //redirect to show page
    Hotel.findById(req.params.id, (err, hotel)=>{
        if(err){
            console.log(err);
            res.redirect('/hotels/'+req.params.id);
        }else{
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err);
                }else{
                    hotel.comments.push(comment);
                    hotel.save();
                    console.log('Created comment!',comment);
                    res.redirect('/hotels/' + hotel._id);
                }
            });
        }
    });
});



app.listen(3000,()=>{
    console.log('I love you 3000');
});