var app = angular.module('myapp',["firebase","ngRoute"]);





app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        		.when('/', {templateUrl: '/login.html',   controller: 'main'})
                .when('/message', {templateUrl: '/message.html',   controller: 'main'})
                .when('/chat', {templateUrl: '/chat.html',   controller: 'main'})
                .otherwise({redirectTo: '/'});
}]);






app.controller('main', function($scope,$http,$firebaseAuth){

var mydata = new Firebase('https://glowing-heat-925.firebaseio.com/');

/*mydata.push({name: 'teja', text: 'hello'});


mydata.on('child_added', function(snapshot) {


var message = snapshot.val();
console.log(message.name, message.text);

});*/

$scope.authObj = $firebaseAuth(mydata);

$scope.login=function(){


	   // var ref = new Firebase("https://glowing-heat-925.firebaseio.com");
    	$scope.authObj = $firebaseAuth(mydata);


		$scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
		  console.log("Logged in as:", authData.google.displayName);

		var username=authData.google.displayName;

		localStorage.setItem('username',username);

		window.open('#message','_self',false);
	    
	    /*firebaseRef.on('value', function(snapshot) {
  
	    		var message = snapshot.val();
				//console.log(message);


				window.open('#message','_self',false);
				if(message==null)
				{
					firebaseRef.push({name: authData.google.displayName,msg: Math.random()});


				}
				else
				{

				}

	});*/

				  

				




		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});

}



$scope.start_chat=function()
{
	
		$scope.mate=$scope.chat_mate;
		
		

		if($scope.chat_mate!=undefined)
		{
		localStorage.setItem('chat_mate',$scope.chat_mate);

	//	firebaseRef1.push({name: Math.random(),msg: Math.random()});
	//	firebaseRef3.push({name: Math.random(),msg: Math.random()});



		var friendRef = new Firebase('https://glowing-heat-925.firebaseio.com/requests/'+$scope.chat_mate+'/'+localStorage.getItem('username'));
		
		friendRef.push({name:localStorage.getItem('username')});


		var friendRef1 = new Firebase('https://glowing-heat-925.firebaseio.com/myfriends/'+localStorage.getItem('username')+'/'+$scope.chat_mate);

		friendRef1.push({name:$scope.chat_mate})



		window.open('#chat','_self',false);
	}



}



$scope.start_chat1=function(friend)
{
	
		$scope.chat_mate=friend.friendname;

		$scope.mate=$scope.chat_mate;
		

		localStorage.setItem('chat_mate',$scope.chat_mate);

	//	firebaseRef1.push({name: Math.random(),msg: Math.random()});
	//	firebaseRef3.push({name: Math.random(),msg: Math.random()});


		


		var friendRef = new Firebase('https://glowing-heat-925.firebaseio.com/unread/'+localStorage.getItem('username')+'/'+$scope.chat_mate);



		friendRef.remove();




		window.open('#chat','_self',false);

}





$scope.start_chat2=function(friend)
{
	
		$scope.chat_mate=friend;




		$scope.mate=$scope.chat_mate;
		

		localStorage.setItem('chat_mate',$scope.chat_mate);

	//	firebaseRef1.push({name: Math.random(),msg: Math.random()});
	//	firebaseRef3.push({name: Math.random(),msg: Math.random()});


		var friendRef = new Firebase('https://glowing-heat-925.firebaseio.com/requests/'+localStorage.getItem('username')+'/'+$scope.chat_mate);



		friendRef.remove();




		var friendRef1 = new Firebase('https://glowing-heat-925.firebaseio.com/myfriends/'+localStorage.getItem('username')+'/'+$scope.chat_mate);

		friendRef1.push({name:$scope.chat_mate})

		window.open('#chat','_self',false);

}




$scope.start_chat3=function(friend)
{
	
		$scope.chat_mate=friend;




		$scope.mate=$scope.chat_mate;
		

		localStorage.setItem('chat_mate',$scope.chat_mate);

	//	firebaseRef1.push({name: Math.random(),msg: Math.random()});
	//	firebaseRef3.push({name: Math.random(),msg: Math.random()});


		var friendRef = new Firebase('https://glowing-heat-925.firebaseio.com/unread/'+localStorage.getItem('username')+'/'+$scope.chat_mate);



		friendRef.remove();

		window.open('#chat','_self',false);

}

setInterval(function()
{ 

var objDiv = document.getElementById("myarea");

if(objDiv!=null)
objDiv.scrollTop = objDiv.scrollHeight;

}, 600);




$scope.send=function(e)
{

	//alert(e.keyCode);

	//alert($scope.chat_mate);




	if(e.keyCode==13)
	{
	//	$scope.comments=[];

		if($scope.my_message!="")
		{

		var firebaseRef = new Firebase('https://glowing-heat-925.firebaseio.com/'+localStorage.getItem('username'));
		
		var firebaseRef1 = new Firebase('https://glowing-heat-925.firebaseio.com/'+localStorage.getItem('username')+'/'+localStorage.getItem('chat_mate'));

		



		var firebaseRef2 = new Firebase('https://glowing-heat-925.firebaseio.com/'+localStorage.getItem('chat_mate'));

		var firebaseRef3 = new Firebase('https://glowing-heat-925.firebaseio.com/'+localStorage.getItem('chat_mate')+'/'+localStorage.getItem('username'));



		firebaseRef1.push({name: localStorage.getItem('username'),msg: $scope.my_message});
		firebaseRef3.push({name: localStorage.getItem('username'),msg: $scope.my_message});




		
		
		console.log($scope.comments);
		$scope.my_message="";



		var unreadRef=new Firebase('https://glowing-heat-925.firebaseio.com/unread/'+localStorage.getItem('chat_mate')+'/'+localStorage.getItem('username'));

		unreadRef.push({name:localStorage.getItem('username')});

		var audio = new Audio('http://www.basementarcade.com/arcade/guant/coin.wav');

//var audio = new Audio('http://soundbible.com/2084-Glass-Ping.html');
		audio.play();



}

}


}




$scope.comments=[];

$scope.friends=[];

$scope.pendings=[];

$scope.unreads=[];

var firebaseRef1 = new Firebase('https://glowing-heat-925.firebaseio.com/'+localStorage.getItem('username')+'/'+localStorage.getItem('chat_mate'));

firebaseRef1.on('value', function(snapshot) {

$scope.comments=[]; 
//$scope.unseens=[];

				//$scope.friends.push({friendname:localStorage.getItem('chat_mate')});



				///console.log
	    /*		var message = snapshot.val();
	    		console.log(message);
	    		console.log(message.name+" "+message.msg);
	    		$scope.box=message.name+": "+message.msg;*/

	    		//console.log(snapshot.val());

	    		snapshot.forEach(function(messageSnapshot) {
			    // Will be called with a messageSnapshot for each child under the /messages/ node
			    var key = messageSnapshot.key();  // e.g. "-JqpIO567aKezufthrn8"



			  //  console.log(messageSnapshot.child("msg").val());  // e.g. "barney"
			  //  console.log(messageSnapshot.child("name").val());  // e.g. "Welcome to Bedrock City!"


			  	if(messageSnapshot.child("name").val()==localStorage.getItem('username'))
			  	{
			    $scope.comments.push({name:'You',msg:messageSnapshot.child("msg").val()});
			    
				}
				else
				{
				$scope.comments.push({name:messageSnapshot.child("name").val(),msg:messageSnapshot.child("msg").val()});
				
				}
			    //$scope.box=messageSnapshot.child("name").val()+": "+messageSnapshot.child("msg").val();

			    
      });


//$scope.comments=[];

//$scope.$apply();

if ($scope.$root!=null && $scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
    $scope.$apply();
}

});


		//var friendRef1 = new Firebase('https://glowing-heat-925.firebaseio.com/myfriends/'+localStorage.getItem('username')+'/'+$scope.chat_mate);

		//friendRef1.push({name:$scope.chat_mate})

var firebaseRef = new Firebase('https://glowing-heat-925.firebaseio.com/myfriends/'+localStorage.getItem('username'));
firebaseRef.on('value', function(snapshot) {

snapshot.forEach(function(messageSnapshot) {

//console.log(messageSnapshot.key());


$scope.friends.push({friendname:messageSnapshot.key()});



});
if ($scope.$root!=null && $scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
    $scope.$apply();
}

});


var friendRef = new Firebase('https://glowing-heat-925.firebaseio.com/requests/'+localStorage.getItem('username'));

friendRef.on('value', function(snapshot) {

snapshot.forEach(function(messageSnapshot) {

//console.log(messageSnapshot.key());

//console.log(messageSnapshot.val()+"   "+messageSnapshot.val()['name']);

if($scope.pendings.indexOf(messageSnapshot.key())==-1)
$scope.pendings.push(messageSnapshot.key());

});

if ($scope.$root!=null && $scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
    $scope.$apply();
}

});


$scope.logout=function()
{
	window.open('#','_self',false);
}


var unreadRef=new Firebase('https://glowing-heat-925.firebaseio.com/unread/'+localStorage.getItem('username'));

unreadRef.on('value', function(snapshot) {

snapshot.forEach(function(messageSnapshot) {

//console.log(messageSnapshot.key());

if($scope.unreads.indexOf(messageSnapshot.key())==-1)
$scope.unreads.push(messageSnapshot.key());


});
if ($scope.$root!=null && $scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
    $scope.$apply();
}

});



});