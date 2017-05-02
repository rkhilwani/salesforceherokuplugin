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

app.post("/", function(req, res){
pool.connect(function(err,client,done) {
 /* if (err){
  //console.log(err);
  throw err;
  }*/
  	console.log('Connected to postgres! Getting schemas...');
  //var param=req.params.id;
  //var param2=param;
  //var text;
  	console.log(req.body);
  	var sfdcid=req.body.Business_Rule_Change_request_sfid;
  	var bussinessRuleType=req.body.bussinessRuleType;
 // console.log(req.body.tempobj);
	console.log(sfdcid);
	console.log(sfdcid.length);
	console.log(bussinessRuleType);
	console.log(bussinessRuleType.length);
	


	
  
 /* client.query("select sfdcbusinessrule.BusinessRuleExecute($1,$2)",[sfdcid,bussinessRuleType],function(err,result){
	  	
			done(); 
	   //pool.end();
	  //res.status(200).send('Connection Closed');
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
	 
           res.status(200).send(result.rows);
	  
  	});
*/	

	client.query("select sfdcbusinessrule.BusinessRuleExecute($1,$2)",[sfdcid,bussinessRuleType]);
	// done();
	
	res.status(200).send('Connection Closed');
	pool.end();
});	

	
pool.on('error', function (err, client) {
 
  console.error('idle client error', err.message, err.stack)
});
	
  console.log('Population completed');
});	

//Method For deletion Starts Here

app.post("/delete", function(req, res){
pool.connect(function(err, client,done) {
  if (err){
  //console.log(err);
  throw err;
  }
  console.log('Connected to postgres! Getting schemas...');
  //var param=req.params.id;
  //var param2=param;
  //var text;
  console.log(req.body);
  var sfdcid=req.body.Business_Rule_Change_request_sfid;
  var bussinessRuleType=req.body.bussinessRuleType;
 // console.log(req.body.tempobj);
	console.log(sfdcid);
	console.log(sfdcid.length);
	console.log(bussinessRuleType);
	console.log(bussinessRuleType.length);
	


	
  
  client.query("select sfdcbusinessrule.delete_businessruleexecute($1,$2)",[sfdcid,bussinessRuleType],function(err,result){
	  
			done(); 
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
	  
  });	
	
	});
	
  console.log('Population completed');
});	
	




//res.write('Population Completed');
	//send image
	//res.end();
	//var resp = client.query("SELECT Name from salesforceorg2.AxtriaSalesIQTM__Team_Instance_Account__c where AxtriaSalesIQTM__Team_Instance__c =$1 limit 1",[param]);
		//resp.on('row',function(row){
			//for(var i = 0; i &lt; ret.rows.length(); i++) 
		//res.write(JSON.stringify(ret.rows[i]));
		//res.end();
		//res.json(ret);
	//	res.send(JSON.stringify(row));
		
		
	
/*app.post("/:id", function(req, res){
pool.connect(function(err, client) {
  if (err){
  console.log(err);
  throw err;
  }
  console.log('Connected to postgres! Getting schemas...');
  var param=req.params.id;
  var teaminsta=req.body.teaminst;
  var finalparam=String(param);
	console.log(param);
	console.log(teaminsta);
  //res.send('Population Completed');
	pool1.func('salesforceorg2.Team_Instance_Account_PopulateV3',abc)
	.then(function (data) {
        console.log(data);
			res.send('Population Completed');// print result data;
    })
    .catch(function (error) {
        console.log(error); // print error;
    });
	//pool1.func('SELECT Name from salesforceorg2.AxtriaSalesIQTM__Team_Instance_Account__c where AxtriaSalesIQTM__Team_Instance__c =$1 limit 1', [param])
    //.then(function (data) {
      //  res.send(data);
    //})
    //.catch(function (error) {
        // error;
    //});
	
  console.log('Population completed');
});
});
*/
/*
app.get("/", function(req, res){
	pool.connect(function(err, client) {
	if (err) throw err;
	console.log('Connected to postgres! Getting schemas...');

  
  client
    .query('SELECT AxtriaSalesIQTM__Client_Position_Code__c FROM salesforceorg2.AxtriaSalesIQTM__Position__c limit 1;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
	  res.json(row);
    });
  console.log('nishant');
});
});
*/
