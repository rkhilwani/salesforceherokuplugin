var express=require('express');
var app=express();

var pg = require('pg');

pg.defaults.ssl = true;
app.get("/api/contacts", function(req, res){
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
});