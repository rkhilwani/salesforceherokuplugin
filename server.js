var express=require('express');
var app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var pg = require('pg');
app.set('port', (process.env.PORT || 5000));
pg.defaults.ssl = true;
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
var config = {
  user: 'oprvfmfrktmuim', //env var: PGUSER
  database: 'd4q2qo2gph5otk', //env var: PGDATABASE
  password: '9db871afbdbf2f8bd1339d53de02359022e7ef5fb58392230d3a99cf32b63d48', //env var: PGPASSWORD
  host: 'ec2-54-204-32-145.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 60000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);
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
app.post("/:id", function(req, res){
pool.connect(function(err, client) {
  if (err){
  console.log(err);
  throw err;
  }
  console.log('Connected to postgres! Getting schemas...');
  var param=req.params.id;
  var teaminsta=req.body.teaminst;
	console.log(param);
	console.log(teaminsta);
  
  //client.query("SELECT salesforceorg2.Team_Instance_Account_PopulateV2($1)",[param]);
	
    //res.write('Population Completed');//send image
	//res.end();
	client.query("SELECT name from salesforceorg2.AxtriaSalesIQTM__Position__c where AxtriaSalesIQTM__Team_Instance__c =$1",[param],function(err,ret){
		for(var i = 0; i &lt; ret.row.length; i++) 
		res.write(JSON.stringify(ret.row[i]));
		res.end();
		
		
	};
	
  console.log('Population completed');
});
});

