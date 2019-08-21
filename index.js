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
//HOME
app.get('/',(req,res)=>{
    res.redirect('/blogs');
});
//INDEX
app.get('/blogs',(req,res)=>{
    Blog.find({},(err,allBlogs)=>{
        if(err){
            console.log('ERROR: ',err);
        }else{
            res.render('index',{blogs: allBlogs});
        }
    });
});
//NEW
app.get('/blogs/new',(req,res)=>{
    console.log('about to render');
    res.render('new');
    console.log('rendered!');
    
});
app.post('/blogs',(req,res)=>{
    // console.log("here");
    // console.log('req:', req);
    
    // var newBlog={
    //     title: req.title,
    //     // image: req.image,
    //     body: req.body
    // }
    Blog.create(req.body.blog,(err,newBlog)=>{
        if(err){
            console.log('ERROR: ',err);
        }else{
            console.log("Successfully created: ",newBlog);
        }
    });
    res.redirect('/');
});

app.listen(3000,()=>{
    console.log('I love you 3000');
});