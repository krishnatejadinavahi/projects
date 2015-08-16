var express = require('express');
var app = express();

var mongojs=require('mongojs');
var db=mongojs('job',['job','userdata','jobdata','janda','jstat']);

var bodyParser=require('body-parser');

app.use(express.static(__dirname+"/public"));

app.use(bodyParser.json());
app.post('/',function(req,res){

	console.log(req.body);
	db.job.insert(req.body,function(err,doc){
		res.json(doc);
	});
});

app.get('/job',function(req,res){
	db.job.find(function(err,doc){
	console.log(doc);
	res.json(doc);
	});
	
	
});

app.get('/login',function(req,res){
	db.job.find(function(err,doc){
		res.json(doc);
	});
});

app.post('/edit',function(req,res){
	
	//console.log(req.body['name']);
	
	db.userdata.find({name:req.body['name']},function(err,doc){
		
		//console.log(doc[0]['_id']);
	
	
	
		//console.log(doc);
		res.json(doc);
	
	
	
	});
	
});



app.post('/subprof',function(req,res){
	
	console.log(req.body['name']);
	
	db.userdata.find({name:req.body['name']},function(err,doc){
		if(doc.length!=0)
			{
			
			db.userdata.update({name:req.body['name']},{name:req.body['name'],profile:req.body['profile']});
			}
		else
			{
			
			db.userdata.insert({name:req.body['name'],profile:req.body['profile']});
			}
	});
	
	
	
	
	
});


app.post('/publishjob',function(req,res){
	
	//console.log(req.body);
	db.jobdata.insert(req.body,function(err,doc){
		
	});
	
});


app.post('/verify',function(req,res){
	
//	console.log(req.body);
	db.jobdata.find({jcode:req.body['jcode']},function(err,doc){
		if(doc.length!=0)
			{
			res.send('-1');
			}
		else
			{
			res.send('1');
			}
	});
	
});

app.post('/searjob',function(req,res){
	console.log(req.body);
	db.jobdata.find({},{jname:1,_id:0,jcode:1},function(err,doc){
		//console.log(doc);
		res.send(doc);
	});
	
});

app.post('/jretr',function(req,res){
	//console.log(req.body);
	db.jobdata.find({jcode:req.body['jobcode']},{_id:0},function(err,doc){
		//console.log(doc);
		res.send(doc);
	});
})


app.post('/adm',function(req,res){
	//console.log(req.body);
	db.janda.insert(req.body,function(err,doc){
		
	});
});



app.post('/adm1',function(req,res){
	//console.log(req.body);
	db.janda.find(req.body,function(err,doc){
		//console.log(doc.length);
		if(doc.length!=0)
			{
			res.send('-1');
			}
		else
			{
			res.send('1');
			}
	});
});

app.post('/jup',function(req,res){
	//console.log(req.body);
	db.janda.find({poster:req.body['poster']},function(err,doc){
		//console.log(doc);
		res.send(doc);
	});
});



app.post('/viewuser',function(req,res){
	//console.log(req.body);
	db.userdata.find({name:req.body['uname']},function(err,doc){
		//console.log(doc);
		res.send(doc);
	});
});


app.post('/dell',function(req,res){
	//console.log(req.body);
	
	db.janda.remove({applicant:req.body['applicant'],jcode:req.body['jcode']},function(err,doc){
		
	});
	
});


app.post('/ending',function(req,res){
	//console.log(req.body);
	db.jstat.insert(req.body,function(err,doc){
		
	});
});


app.post('/yourja',function(req,res){
	//console.log(req.body);
	db.jstat.find({applicant:req.body['uname']},function(err,doc){
		console.log(doc);
		res.send(doc);
	});
});

app.listen(8080);
console.log("running");