var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');


//TODO: move to DB
var hotels = [
    {name: 'The Elanza Hotel', image:'https://lh3.googleusercontent.com/p/AF1QipPjN1pQ00OOS2aMxAvnAwD7rFjQg_UH1pputFPL=w592-h404-n-k-rw-no-v1'},
    {name: 'Grand Mercure Bangalore', image:'https://lh3.googleusercontent.com/p/AF1QipPnaPc7H5JX1zJYEWeNZh1RdYB_iauTgPI-nEaZ=w592-h404-n-k-rw-no-v1'},
    {name: 'La Marvella', image:'https://lh3.googleusercontent.com/p/AF1QipM7KZhlFpLiSZwjSLL-E9tRlzey9MRNdjaRRJ6u=w592-h404-n-k-rw-no-v1'},
    {name: 'Hotel Davanam Sarovar Portico Suites', image:'https://lh3.googleusercontent.com/p/AF1QipPGnA_UFw44sS5u2bTdKA8rP07WYPFCrjHFGgoy=w592-h404-n-k-rw-no-v1'},
    {name: 'The Elanza Hotel', image:'https://lh3.googleusercontent.com/p/AF1QipPjN1pQ00OOS2aMxAvnAwD7rFjQg_UH1pputFPL=w592-h404-n-k-rw-no-v1'},
    {name: 'Grand Mercure Bangalore', image:'https://lh3.googleusercontent.com/p/AF1QipPnaPc7H5JX1zJYEWeNZh1RdYB_iauTgPI-nEaZ=w592-h404-n-k-rw-no-v1'},
    {name: 'La Marvella', image:'https://lh3.googleusercontent.com/p/AF1QipM7KZhlFpLiSZwjSLL-E9tRlzey9MRNdjaRRJ6u=w592-h404-n-k-rw-no-v1'},
    {name: 'La Marvella', image:'https://lh3.googleusercontent.com/p/AF1QipM7KZhlFpLiSZwjSLL-E9tRlzey9MRNdjaRRJ6u=w592-h404-n-k-rw-no-v1'},
    {name: 'La Marvella', image:'https://lh3.googleusercontent.com/p/AF1QipM7KZhlFpLiSZwjSLL-E9tRlzey9MRNdjaRRJ6u=w592-h404-n-k-rw-no-v1'},
    {name: 'La Marvella', image:'https://lh3.googleusercontent.com/p/AF1QipM7KZhlFpLiSZwjSLL-E9tRlzey9MRNdjaRRJ6u=w592-h404-n-k-rw-no-v1'},
];
//home page
app.get('/', (req,res)=>{ 
    res.render('home'); 
});
//camps
app.get('/hotels', (req,res)=>{
    res.render('hotels', {hotels:hotels});
});

app.post('/hotels', (req,res)=>{
    var newHotel = {name: req.body.name, image: req.body.image};
    hotels.push(newHotel);
    res.redirect('/hotels');
});

app.get('/hotels/new', (req,res)=>{
    res.render('new');
});




app.listen(3000,()=>{
    console.log('I love you 3000');
});