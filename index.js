var express = require('express');
var app = express();

app.get('/', (req,res)=>{ res.send('yo!'); });

app.post('/dict/')





app.listen(3000,()=>{console.log('I love you 3000');});