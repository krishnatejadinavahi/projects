
var myApp = angular.module('myApp', []);
myApp.controller('appctrl', function($scope,$rootScope,$http) 
{


$rootScope.myval=100;

$scope.place_array=[];
$scope.count = 0;




$scope.go_clicked= function ()
 {
 //	window.open ('www.google.com','_self',false)
 
 	$http({
        			
        			url:'http://maps.googleapis.com/maps/api/geocode/json?address='+$scope.pin,
        			method : 'GET'

        			
        		}).success(function(response){
        			
        		//	alert(response.results[0].geometry.bounds.northeast.lat+"   "+response.results[0].geometry.bounds.northeast.lng);
        		
        			localStorage.setItem('lat',response.results[0].geometry.bounds.northeast.lat);
        			localStorage.setItem('lng',response.results[0].geometry.bounds.northeast.lng);


 	$http({
        			
        			url:'/save_pin',
        			data: {pin:$scope.pin,lat:response.results[0].geometry.bounds.northeast.lat,lng:response.results[0].geometry.bounds.northeast.lng},
        			method : 'POST'

        			
        		}).success(function(response){
        			
        			window.open ('map.html','_self',false)
        		});


});

 }

$scope.rests=function()
{
$scope.place_array.push(1);
$scope.place_array.push(2);

alert(document.getElementById('o1').getAttribute("value"));

	 	$http({
        			
        			url:'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyAv1cBrNcv6-E-RAbDmZCpVizKYcKvdwwc',
        			method : 'GET'

        			
        		}).success(function(response){
        			
        			console.log(response);
        		});



  /*  var markers = [
        ['London Eye, London', 51.503454,-0.119562],
        ['Palace of Westminster, London', 51.499633,-0.124755]
    ];
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });*/

} 

});

