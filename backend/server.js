var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

var path = require('path');
var exec = require('child_process').exec;

app.post("/compileCode", (req, res) => {
	console.log(req)
	var tempFileName = "tempPythonFile" + (new Date).getTime() + ".py";
	fs.writeFile(tempFileName, req.body.code, function(err) {
		if(err) {
			console.log(err);
			res.render('error', {error: err});
		}
	})

	var child = exec("python " + tempFileName, function(error, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
	});
})

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


var conString = "postgres://postgres:root@localhost/wiki";

app.listen(3001, function() {
  console.log('listening on 3001')
})

// React PROD build
// app.use('/static', express.static(path.resolve(__dirname + '\\..\\react-ui\\build\\static')));
// app.get('/', (req, res) => {
// 	res.sendFile(path.resolve(__dirname + '\\..\\react-ui\\build\\index.html'));
// })

// React DEV build
app.use('/dist', express.static(path.resolve(__dirname + '\\..\\react-ui\\dist')));
app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname + '\\..\\react-ui\\dist\\devindex.html'));
})
	
app.get('/getDb', (req, res) => {
	var client = new pg.Client(conString);
	client.connect(function(err) {
		if(err) {
			console.log(err);
		}
		client.query('select * from "wiki_master"', function(err, result) {
			if(err) console.log(err);
			 res.send(result)
			 client.end();
		})

	})

})


app.post('/save_or_edit', (req, res) => {
	var id = req.body.id;
	if(id) {
		var client = new pg.Client(conString);
		client.connect(function(err) {
			if(err) {
				console.log(err);
			}
			var sql_query = "update wiki_master set title = '" +req.body.form_data.title+"', description = '" +req.body.form_data.desc+"', code = '" +req.body.form_data.code+"', type = '" +req.body.form_data.type+"'"
			console.log(sql_query)
			client.query(sql_query, function(err, result) {
				if(err){
					 console.log(err);
					  res.end("query failed");
				}
				 res.end("success")
			})
		client.end();
		})
	}
	else
	{
		var client = new pg.Client(conString);
		client.connect(function(err) {
			if(err) {
				console.log(err);
			}
			var sql_query = "insert into wiki_master(title, description, code, type) values ('" +req.body.form_data.title+"','"+req.body.form_data.desc+"', '"+req.body.form_data.code+"', '"+req.body.form_data.type+"')"
			console.log(sql_query)
			client.query(sql_query, function(err, result) {
				if(err){
					 console.log(err);
					  res.end("query failed");
				}
				 res.end("success")
			})
		})
	}

})

