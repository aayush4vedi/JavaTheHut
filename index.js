var express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    mongoose    = require('mongoose'),
    Hotel       = require('./models/hotel'),
    seedDB      = require('./seeds')

seedDB();
mongoose.connect('mongodb://localhost/yelp_hotel');    
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

app.get('/', (req,res)=>{ 
    res.render('home'); 
});
app.get('/hotels', (req,res)=>{
    Hotel.find({},(err, allHotels)=>{
        if(err){
            console.log(err);
        }else{
            res.render('index',{hotels: allHotels});
        }
    });
});

app.post('/hotels', (req,res)=>{
    var newHotel = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    Hotel.create(newHotel,(err,newHotel)=>{
        if(err){
            console.log(err);
        }else{
            console.log('SUCCESSFULLY created entry', newHotel);
        }
    });
    res.redirect('/hotels');
});
//order is important here!!!
app.get('/hotels/new', (req,res)=>{
    res.render('new');
});
//SHOW
app.get('/hotels/:id',(req,res)=>{
    Hotel.findById(req.params.id).populate('comments').exec((err,found)=>{
        if(err){
            console.log(err);
        }else{
            res.render('show',{hotel: found});
            console.log('added comments to: ',found);
        }
    });
});



app.listen(3000,()=>{
    console.log('I love you 3000');
});