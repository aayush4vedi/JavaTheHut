var express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser');

//App config    
mongoose.connect('mongodb://localhost/blog_app');    
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

//Mongoose Model- Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: 
        {   
            type: String, 
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzzUX98ZnkvRQ30ZO_LpPr8-GXgk8_1buxpHBYYpCwSxq1IJNt"
        },
    body: String,
    created: 
        {
            type: Date,  
            default: Date.now
        }
});
var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//     title: "Test title",
//     body: "Test body"
// });

//RESTful Routes
app.get('/',(req,res)=>{
    // res.render('home');
    res.redirect('/blogs');
});

app.get('/blogs',(req,res)=>{
    Blog.find({},(err,allBlogs)=>{
        if(err){
            console.log('ERROR: ',err);
        }else{
            res.render('index',{blogs: allBlogs});
        }
    });
});

app.listen(3000,()=>{
    console.log('I love you 3000');
});