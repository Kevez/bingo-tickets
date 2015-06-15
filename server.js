//
// Small Express server to serve the index.html file.
//

var express = require('express'),
	app = express();

app.set('port', 4444);

// Server all static assets from this directory
app.use(express.static(__dirname));

// Just the one route needed here
app.get('/', function (req, res) {
	res.sendfile('index.html');
});

// Fire up the server
var server = app.listen(app.get('port'), function () {
	console.log('Server started on port ' + app.get('port'));
});