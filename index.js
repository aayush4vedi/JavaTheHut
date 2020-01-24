var express             = require('express'),
        app             = express(),
        port            = process.env.PORT || 3000


// configuration ===============================================================

// ==========================
//ROUTES
// ==========================

app.get('/', (req,res)=>{ res.send('yo!'); });

app.post('/dict/:word', (req,res)=>{
    word = req.body.word;
    
})





app.listen(port,()=>{console.log('I love you 3000');});