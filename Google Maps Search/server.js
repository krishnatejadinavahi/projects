var express = require('express');
var app = express();
var path = require('path');
var bodyParser=require('body-parser');
var fs = require("fs");



app.use(bodyParser.json());
// viewed at http://localhost:8080
app.use(express.static('public'));
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/public/request_pin.html'));
});

/*app.post('/save_pin', function(req, res) {

console.log(req.body);



fs.readFile('public/map.html', function (err, data) {

var text=data.toString();


var split_text=text.split("\n");
//console.log(text.split("\n"));

fs.writeFile('public/map.html', '',  function(err) 
{


});

for(var i=0;i<split_text.length;i++)
{

	if(split_text[i].indexOf('position: {')!=-1)
	{
		fs.appendFile('public/map.html', 'position: {lat:'+ req.body.lat+', lng:'+ req.body.lng+'},\n',  function(err) 
			{


			});
	}

	else if(split_text[i].indexOf('center')!=-1)
	{
		fs.appendFile('public/map.html', 'center: {lat:'+ req.body.lat+', lng:'+ req.body.lng+'},\n',  function(err) 
			{


			});
	}

	else
	{
		fs.appendFile('public/map.html', split_text[i]+"\n",  function(err) 
			{


			});
	}

}





});

/*fs.writeFile('public/map.html', 'Simply Easy Learning!',  function(err) 
{


});
 
res.send('ok');

});*/


app.listen(8001);
