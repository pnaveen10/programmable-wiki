var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

var path = require('path');
var exec = require('child_process').exec;

var morgan = require('morgan')
app.use(morgan('dev'));

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

var conString = "postgres://YourUsername:YourPassword$1@localhost/DatabaseName";

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

var client = new pg.Client(conString);
app.get('/getDb', (req, res) => {
	client.connect(function(err) {
		if(err) {
			console.log(err);
		}
		client.query('select * from "ORMSummaryContents"', function(err, result) {
			if(err) console.log(err);
			res.send(result.rows)
		})
	})

})

app.get('/view_page/:id', function(req, res) {
    var id = req.params.id;
    var client = new pg.Client(conString);
	client.connect(function(err) {
		if(err) {
			console.log(err);
		}
		console.log("coming 1")
		var sql_query = "select code from wiki_master where id = '" +id+"'"
		client.query(sql_query, function(err, result) {
			if(err){
				console.log(err);
				res.end("error on fetching code for the particular id")
			}
			var code_to_be = result.rows[0].code;
			console.log("code_to_be" + code_to_be)
			var tempFileName = "tempPythonFile" + (new Date).getTime() + ".py";
			fs.writeFile(tempFileName, code_to_be, function(err) {
				if(err) {
					console.log(err);
					res.render('error', {error: err});
				}
			})

			var child = exec("py " + tempFileName, function(error, stdout, stderr) {
				console.log(stdout);
				console.log(stderr);
				res.end(stdout);
			});
		})

	})
});

app.post('/dummy' (req,res) => {
	res.end("success")
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
				 res.end("successfully edited")
			})
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
				 res.end("successfully added")
			})
		})
	}

})
