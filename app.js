#!/usr/bin/env node
var express           = require("express"),
    app               = express();

var indexRoutes       = require("./routes/index");

    
app.set("view engine", "ejs");
app.set('views', __dirname+'/views');
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);

/*
const PORT =  5000;
const IP = '172.17.32.184';

app.listen(PORT, IP, function(){
    console.log("Server Started!", IP+":"+PORT);
 }); */

var fs = require('fs');
var http = require('http');
var https = require('https');
//var privateKey  = fs.readFileSync(__dirname+'/ssl/csb_2019.key', 'utf8');
//var certificate = fs.readFileSync(__dirname+'/ssl/csb2.crt', 'utf8');

var privateKey  = fs.readFileSync('/var/lib/ssl/csb_2019.key', 'utf8');
var certificate = fs.readFileSync('/var/lib/ssl/csb2.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};


// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(5000);
httpsServer.listen(443);

