var express=require('express');
var app=express();

var pg = require('pg');
app.set('port', (process.env.PORT || 5000));
pg.defaults.ssl = true;
app.get("/", function(req, res){
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
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});