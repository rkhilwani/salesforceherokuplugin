var express=require('express');
var app=express();
var sleep = require('sleep');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();
//var async = require("async");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var url = require('url');
console.log(process.env.DATABASE_URL);
var params = url.parse(process.env.DATABASE_URL);
var auth = params.auth.split(':');

var config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
};

var pg = require('pg');
app.set('port', (process.env.PORT || 5000));
pg.defaults.ssl = true;
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
var pool = new pg.Pool(config);

//Call post method to create a preview or populate request.
app.post("/", function(req, res){
    pool.connect(function(err,client,done) {
        //Checking if there is a connection error
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        console.log('Connected to postgres! Getting schemas...');
        console.log(req.body);

        //Get data from request
        var sfdcid=req.body.Business_Rule_Change_request_sfid;
        var bussinessRuleType=req.body.bussinessRuleType;

        console.log(sfdcid);
        console.log(sfdcid.length);
        console.log(bussinessRuleType);
        console.log(bussinessRuleType.length);

        //Query postgerss to execute rule and generate data.
        client.query("select sfdcbusinessrule.BusinessRuleExecute($1,$2)",[sfdcid,bussinessRuleType]);

        //call `done(err)` to release the client back to the pool (or destroy it if there is an error) 
        //done(err);

        if(err) {
            return console.error('error running query', err);
        }

        res.status(200).send('Connection Closed');
    });

    pool.on('error', function (err, client) { 
      console.error('idle client error', err.message, err.stack)
    });

    console.log('Population completed');
});

//Method For deletion Starts Here
app.post("/delete", function(req, res){
    pool.connect(function(err, client,done) {
        //Checking if there is a connection error
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        console.log('Connected to postgres! Getting schemas...');
        console.log(req.body);

        var sfdcid=req.body.Business_Rule_Change_request_sfid;
        var bussinessRuleType=req.body.bussinessRuleType;
     
        console.log(sfdcid);
        console.log(sfdcid.length);
        console.log(bussinessRuleType);
        console.log(bussinessRuleType.length);

        client.query("select sfdcbusinessrule.delete_businessruleexecute($1,$2)",[sfdcid,bussinessRuleType],function(err,result){
        
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error) 
        done(err);
        if(err){
           console.log(err);
           return console.error('error running query', err);
        }
        res.status(200).send(result.rows);
      })

    });
    console.log('Deletion Completed');
});
