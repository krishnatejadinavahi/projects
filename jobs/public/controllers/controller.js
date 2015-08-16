var myApp = angular.module('myApp', []);
myApp.controller('appctrl', function($scope,$http) {

	$scope.logout=-1;
	
localStorage.setItem('log',0);
    $scope.validate=function()
    {
    	var ins=0;
    	//console.log($scope.uname+" "+$scope.pass);
    	if($scope.uname===undefined||$scope.pass===undefined)
    		{
    		var p=angular.element(document.querySelector('#divalert'));
    		var q=angular.element(document.querySelector('#divalert p'));
    		
    		q.text("Empty boxes");
    		p.css('visibility','visible');
    		
    		
    		console.log($scope.uname+" "+$scope.pass);
    		$scope.uname=undefined;
    		$scope.pass=undefined;
    		}
    	else if($scope.uname!=undefined && $scope.pass!=undefined)
    		{
    		$http({
    			url:'/job',
    			method:'GET'
    		}).success(function(response){
    			
    			//console.log(JSON.parse(response));
    			console.log(response[0]['name']+response.length);
    			for(var i=0;i<response.length;i++)
    				{
    				if(response[i]['name']==$scope.uname)
    					{
    		    		var p=angular.element(document.querySelector('#divalert'));
    		        	var q=angular.element(document.querySelector('#divalert p'));
    		        	q.text("User already exists");
    		    		p.css('visibility','visible');
    		    		ins=-1;
    		    		break;
    					}
    				}
    			console.log("ins value is"+ins);
        		if(ins!=-1)
        		{
        		var x={name:$scope.uname,pass:$scope.pass};
        		console.log(x['name']);
        		$http({
        			
        			url:'/',
        			data:x,
        			method : 'POST'

        			
        		}).success(function(response){
        			$scope.uname=undefined;
            		$scope.pass=undefined;
        			console.log(response);
        			
        		});
        		}
    		});
    		
    		
    		

    		}
    }
    $scope.clo=function()
    {
    	var p=angular.element(document.querySelector('#divalert'));

		p.css('visibility','hidden');
    }
    
    
    $scope.login=function()
    {
    	$http({
    		method:'GET',
    		url:'/login'
    	}).success(function(response){
    		$scope.temp=0;
    		for(var i=0;i<response.length;i++)
    			{
    			if(response[i]['name']==$scope.uname&&response[i]['pass']==$scope.pass)
    				{
    				
    				$scope.temp=1;
    				break;
    				}
    
    			}
    		if($scope.temp==0)
    			{
				
				var p=angular.element(document.querySelector('#divalert'));
				var q=angular.element(document.querySelector('#divalert p'));
				q.text("Invalid details");
				p.css('visibility','visible');
    			}

    		
    		
    	});
    }

$scope.edit_profile=function()
{
	$scope.temp2=0;
$http({
	
	url:'/edit',
	data:{name:$scope.uname},
	method:'POST'
}).success(function(response){
	
	
	//console.log(response.length);
	
	if(response.length==0)
		{
		$scope.temp1=1;
		}
	else
		{
		$scope.temp1=1;
		//var tex=angular.element(document.querySelector('#ta'));
		//tex.text(response[0]['profile']);
		
		$scope.proff=response[0]['profile'];
		}
	
});
}


$scope.sub_profile=function()
{
	var tex=angular.element(document.querySelector('#ta'));
	//console.log(tex.val());
	
//	console.log($scope.proff);
	
	$http({
		url:'subprof',
	//	data:{name:$scope.uname,profile:tex.val()},
		data:{name:$scope.uname,profile:$scope.proff},
		method:'POST'
	}).success(function(response){
		
	});
}


$scope.can=function()
{
	$scope.temp2=-1;
	$scope.temp3=-1;
	$scope.temp6=-1;
	$scope.temp10=-1;
	$scope.temp11=-1;
	$scope.temp12=-1;
	$scope.temp20=-1;
}


/*$scope.postjob=function()
{
$scope.temp3=1;
}*/

$scope.publishjob=function()
{
	console.log($scope.jobcode);
	if($scope.jobcode==undefined||$scope.jobname==undefined||$scope.jobdesc==undefined)
		{
		var p=angular.element(document.querySelector('#divalert'));
		p.css('visibility','visible');
		
		$scope.alertdata="fill all the boxes";
		}
	else
		{
		
		$http({
			method:'POST',
			url:'/verify',
			data:{jcode:$scope.jobcode}
		
		
		}).success(function(response){
			
		console.log(response);	
		if(response==-1)
			{
			$scope.ttemp=-1;
			$scope.jobcode=null;
			$scope.jobname=null;
			$scope.jobdesc=null;
			var p=angular.element(document.querySelector('#divalert'));
			p.css('visibility','visible');
			
			$scope.alertdata="job with that job code already exists, try a new code";
			}
		else
			{

			$scope.ttemp=0;

			puttt();
			}
		});


		function puttt()
		{
		$http({
			method:'POST',
			url:'/publishjob',
			data:{name:$scope.uname,jcode:$scope.jobcode,jname:$scope.jobname,jdesc:$scope.jobdesc}
		}).success(function(response){

		});
		$scope.jobcode=null;
		$scope.jobname=null;
		$scope.jobdesc=null;
		}

		}
}


$scope.sear=function()
{
	$scope.temp6=1;
	if($scope.searjob==undefined)
		{
		var p=angular.element(document.querySelector('#divalert'));
		p.css('visibility','visible');
		
		$scope.alertdata="type something to search";
		}
	else
		{
		$http({
			method:'POST',
			data:{search:$scope.searjob},
			url:'/searjob'
		}).success(function(response){
			//console.log(response);
			$scope.retdata=response;
		});
		}
}

$scope.selejob=function(a)
{
$http({
	method:'POST',
	url:'jretr',
	data:{jobcode:a}
}).success(function(response){
	console.log(response[0]);
	$scope.sj11=response[0]['jcode'];
	$scope.sj22=response[0]['jname'];
	$scope.sj33=response[0]['jdesc'];
	$scope.sj44=response[0]['name'];
});

$scope.temp10=1;
$scope.temp20=-1;
}


$scope.apply=function()
{
	alert($scope.sj11+" "+$scope.sj22+" "+$scope.sj33+" "+$scope.sj44);
	
	
	$http({
		method:'POST',
		url:'adm1',
		data:{applicant:$scope.uname,jcode:$scope.sj11}
	}).success(function(response){
		console.log(response);
		if(response==1)
			{
			dpt();
			}
		else
			{
			var p=angular.element(document.querySelector('#divalert'));
			p.css('visibility','visible');
			
			$scope.alertdata="you have already applied to this job";
			}
	});
	
	
	function dpt()
	{
	$http({
		method:'POST',
		url:'adm',
		data:{applicant:$scope.uname,poster:$scope.sj44,jcode:$scope.sj11,jname:$scope.sj22,jdesc:$scope.sj33}
	});
	}
}


$scope.jobsuposted=function()
{
	$scope.temp11=1;
$http({
	method:'POST',
	url:'jup',
	data:{poster:$scope.uname}
}).success(function(response){
	console.log(response[0]);
	$scope.tabldata=response;
});
}

$scope.clikk=function(a,b,c)
{
	
	$scope.temp11=-1;
	$scope.temp12=1;
	$http({
		method:'POST',
		data:{uname:a},
		url:'/viewuser'
	}).success(function(response){
		$scope.vp11=response[0]['name'];
		$scope.vp22=response[0]['profile'];
		$scope.vp33=b;
		$scope.v55=c;
	});
}

$scope.leavemsg=function(a,b,c)
{


	//alert(a+" "+b+" "+c);
	if($scope.messs==undefined)
		{
		var p=angular.element(document.querySelector('#divalert'));
		p.css('visibility','visible');
		
		$scope.alertdata="enter a message";
		
		}

	else
		
		{
		//alert("coming");
	$http({
		method:'POST',
		url:'/dell',
		data:{applicant:b,jcode:a}
	});
		
		
		$http({
			method:'POST',
			data:{applicant:b,jcode:a,jname:c,status:$scope.messs},
			url:'ending'
		});
		$scope.messs=undefined;
		}
}

$scope.yja=function()
{
$scope.temp20=1;
$http({
	method:'POST',
	url:'yourja',
	data:{uname:$scope.uname}
}).success(function(response){
	console.log(response);
	$scope.userjobapps=response;
});
}
});