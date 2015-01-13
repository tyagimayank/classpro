var express = require('express');
var hbs=require('hbs');//Handle Bar allows access of data sent to the client on the html page {{title}}
var path=require('path');
var bodyParser = require('body-parser');
//User Model
var usersController = require('./controllers/users'); // for user defined js files
var app=express(); //create express server

app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');
app.engine('html',hbs.__express);
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended:false
    }));

app.use(express.static('public'));//allows accessing public folder's files by typing the route in the browser

//Routes
app.get('/',function(request,response){
    var user=usersController.getUser(request.params.id);
    response.render('index',{
        title:"Home",users:usersController.getUsers});
});

app.get('/users/:id',function(request,response){
    var user=usersController.getUser(request.params.id);
    response.render('profile',{  //allows sending data to client
        title:"User Profile",user:user});
});


app.get('/login',function(request,response){
    response.render('login',{title:"Login"});
});

app.get('/signup',function(request,response){
    response.render('signup',{title:"signup"});
});

app.get('/about',function(request,response){
    response.render('about',{title:"About Us"});
});


app.post('/login',usersController.postLogin);

app.listen(3000);