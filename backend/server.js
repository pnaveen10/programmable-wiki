var express = require('express');
var pg = require('pg');
var app = express();

var path = require('path');

//For pool connection
/*var config = {
  user: '', //env var: PGUSER
  database: '', //env var: PGDATABASE
  password: '', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 15, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);
pool.connect(function(err, client, done) {
	if(err) {
		console.log(err)
	}
	else{
		console.log("hai");
	}
})*/

var conString = "postgres://YourUsername:YourPassword@localhost/DatabaseName";

var client = new pg.Client(conString);
client.connect(function(err) {
	if(err) {
		console.log(err);
	}
	client.query('Select * from "TableName"', function(err, result) {
		if(err) console.log(err);
		console.log(result.rows);
	})
})

app.listen(3001, function() {
  console.log('listening on 3001')
})

app.use('/static', express.static(path.resolve(__dirname + '\\..\\react-ui\\build\\static')));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname + '\\..\\react-ui\\build\\index.html'));
})
