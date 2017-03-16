var express = require('express');
var app = express();

app.listen(3001, function() {
  console.log('listening on 3001')
})

app.get('/test', (req, res) => {
	res.send("hai");
})
