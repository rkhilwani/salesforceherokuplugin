var express=require('express');
var app=express();

var pg = require('pg');
app.set('port', (process.env.PORT || 5000));
pg.defaults.ssl = true;
var config = {
  user: 'oprvfmfrktmuim', //env var: PGUSER
  database: 'd4q2qo2gph5otk', //env var: PGDATABASE
  password: '9db871afbdbf2f8bd1339d53de02359022e7ef5fb58392230d3a99cf32b63d48', //env var: PGPASSWORD
  host: 'ec2-54-204-32-145.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);
app.get("/", function(req, res){
console.log('App Running');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});