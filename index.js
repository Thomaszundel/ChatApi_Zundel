//import dependencies
var express = require('express');
var app = express();
var apiRoutes = require('./routes/chatApi');

var morgan = require('morgan');


//setup out app (server / middleware)
app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

//middleware
// function logAccess(req,res,next){
//     console.log(req.method, req.originalUrl);
//     next();
// };

// app.use(logAccess);

app.use(morgan('combined'));
//add some endpoints


app.use('/api',apiRoutes);
//serve out our app
var server = app.listen(3000, function (){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening on ", host, port);
});