var express = require('express');
var app = express();
var path = require('path');
var bodyParser=require('body-parser');
var http=require('http');
var request=require('request')

app.use(bodyParser.json());
// viewed at http://localhost:8080
app.use(express.static('public'));


/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/


app.get('/', function(req, res) {


    res.sendFile(path.join(__dirname + '/public/index.html'));
});
//__dirname stores the directory in which server,js is present
//path.join concatenates dirname and the given value

app.post('/proxy',function(req,res){


request({
    url: 'https://github.com/login/oauth/access_token?client_id='+req["body"]["client_id"]+'&client_secret='+req["body"]["client_secret"]+'&code='+req["body"]["code"], //URL to hit
    method: 'POST',
    headers: {
     //   'Content-Type': 'MyContentType', //type of the data being sent. in this case it is applications/json
      //  'Custom-Header': 'Custom Value'
    },
    
}, function(error, response, body){
    if(error) {
        //console.log(error);
    } else {
    	res.send(body);
       // console.log(response.statusCode, body);
    }

  });
})

app.post('/proxy1',function(req,res){


    //console.log(req.body.oldrepo);



        var postData = req.body.oldrepo;


    request({
        url: 'https://api.github.com/repos/'+req.body.login+'/'+req.body.oldrepo.name+'?access_token='+req.body.token,
        method: 'patch',
        headers: {
          //  'Content-Type': 'MyContentType',
         //   'Custom-Header': 'Custom Value',
            'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'

        },
        json: true,
        body: postData
    
}, function(error, response, body){
    if(error) {
       // console.log(error);
    } else {
        if(response.statusCode==404)
            res.send('404');
        else
        res.send(body);
        //console.log(response.statusCode, body);
    }

  });


});


app.post('/proxy2',function(req,res){

    postData = req.body.forpatch;

    //console.log(postData);


    request({
        url: 'https://api.github.com/gists/'+req.body.id+'?access_token='+req.body.token,
        method: 'patch',
        headers: {
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value',
            'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'

        },
        json: true,
        body: postData
    
}, function(error, response, body){
    if(error) {
      //  console.log(error);
    } else {
        if(response.statusCode==404)
            res.send('404');
        else
        res.send(body);
       // console.log(response.statusCode, body);
    }

  });


});



app.post('/proxy3',function(req,res){

    postData = req.body.forpatch;

    //console.log(req.body);


    request({
        url: 'https://api.github.com/repos/'+req.body.owner+'/'+req.body.repo+'/pulls/'+req.body.number+'?access_token='+req.body.token,
        method: 'patch',
        headers: {
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value',
            'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'

        },
        json: true,
        body: postData
    
}, function(error, response, body){
    if(error) {
        //console.log(error);
    } else {
        if(response.statusCode==404)
            res.send('404');
        else
        res.send(body);
      //  console.log(response.statusCode, body);
    }

  });


});





app.post('/proxy4',function(req,res){

    postData = req.body.forpatch;

   // console.log(req.body);


    request({
        url: 'https://api.github.com/user?access_token='+req.body.token,
        method: 'patch',
        headers: {
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value',
            'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'

        },
        json: true,
        body: postData
    
}, function(error, response, body){
    if(error) {
       // console.log(error);
    } else {
        if(response.statusCode==404)
            res.send('404');
        else
        res.send(body);
       // console.log(response.statusCode, body);
    }

  });


});







var port=Number(process.env.PORT || 8001);

app.listen(port);