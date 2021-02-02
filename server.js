var express = require('express');
var path = require('path');
var port = 9999;
var app = express();
app.use('/', express.static(path.join(__dirname, 'src')));

app.listen(port, function () {
    console.log('Server started: http://localhost:' + port + '/');
});