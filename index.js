var express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverrid = require('method-override');

//App config    
mongoose.connect('mongodb://localhost/blog_app');    
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverrid('_method'));
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
    res.render('new');
});
app.post('/blogs',(req,res)=>{
    Blog.create(req.body.blog,(err,newBlog)=>{
        if(err){
            console.log('ERROR: ',err);
        }else{
            console.log("Successfully created: ",newBlog);
        }
    });
    res.redirect('/');
});
//SHOW
app.get('/blogs/:id',(req,res)=>{
    Blog.findById(req.params.id,(err, found)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.render('show', {blog: found})
        }
    });
});
//EDIT
app.get('/blogs/:id/edit',(req,res)=>{
    Blog.findById(req.params.id,(err, found)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.render('edit', {blog: found})
        }
    });
});
//UPDATE
app.put('/blogs/:id',(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err,updateBlog)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.redirect('/blogs/' + req.params.id );
        }
    });
});
//DESTROY
app.delete('/blogs/:id',(req,res)=>{
    Blog.findByIdAndDelete(req.params.id, (err,deleteBlog)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.redirect('/blogs');
        }
    });
});




//SERVER
app.listen(3000,()=>{
    console.log('I love you 3000');
});




