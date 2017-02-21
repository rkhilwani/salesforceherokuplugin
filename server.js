var express=require('express');
var app=express();

var pg = require('pg');

pg.defaults.ssl = true;
app.get("/api/contacts", function(req, res){
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT AxtriaSalesIQTM__Client_Position_Code__c FROM AxtriaSalesIQTM__Position__c;')
    .on('row', function(row) {
      res.JSON(row);
    });
});
});