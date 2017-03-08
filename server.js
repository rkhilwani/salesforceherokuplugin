var express=require('express');
var app=express();
var sleep = require('sleep');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var pg = require('pg');
app.set('port', (process.env.PORT || 5000));
pg.defaults.ssl = true;
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
var config = {
  user: 'byemztchoixznv', //env var: PGUSER
  database: 'd6qh8k2rck35v8', //env var: PGDATABASE
  password: '35b5fd10b572744d4018dfc72c1856ba9a2118d5233bd7d521e4231ff7aea9bf', //env var: PGPASSWORD
  host: 'ec2-23-21-220-23.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  //idleTimeoutMillis: 80000, // how long a client is allowed to remain idle before being closed
};
//var pool1 = pgp('postgres://oprvfmfrktmuim:9db871afbdbf2f8bd1339d53de02359022e7ef5fb58392230d3a99cf32b63d48@ec2-54-204-32-145.compute-1.amazonaws.com:5432/d4q2qo2gph5otk');
//var pool1=pgp(config);
var pool = new pg.Pool(config);
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
app.post("/", function(req, res){
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
	


	sleep.sleep(5);
  
  client.query("select sfdcbusinessrule.BusinessRuleExecute($1,$2)",[sfdcid,bussinessRuleType],function(err,result){
	  
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
	


	sleep.sleep(5);
  
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
