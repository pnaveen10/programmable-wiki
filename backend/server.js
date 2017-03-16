var express = require('express');
var app = express();

var path = require('path');

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
