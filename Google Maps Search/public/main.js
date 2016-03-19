angular.module('App', ['ngMaps']) .controller('Main', function($scope,$http) {


  $scope.map = {
    center: [localStorage.getItem('lat'), localStorage.getItem('lng')]
  }

  $scope.marker = {
  position: [localStorage.getItem('lat'), localStorage.getItem('lng')],
  options: function(){
    return {
      draggable: true
    }
  },
  events: {
    click: function(e) {
      alert(e.latLng)
    }
  }
} 



$scope.go_clicked=function()
{
  //    alert($scope.pin);
     // window.open ('display_map.html','_self',false);


      $http({
              
              url:'http://maps.googleapis.com/maps/api/geocode/json?address='+$scope.pin,
              method : 'GET'

              
            }).success(function(response){
              
             // alert(response.results[0].geometry.bounds.northeast.lat+"   "+response.results[0].geometry.bounds.northeast.lng);
            
             console.log(response);


              localStorage.setItem('lat',response.results[0].geometry.location.lat);
              localStorage.setItem('lng',response.results[0].geometry.location.lng);

              console.log(localStorage.getItem('lat')+"   "+localStorage.getItem('lng'));


                $scope.map = {
                center: [localStorage.getItem('lat'), localStorage.getItem('lng')]
              }


                $scope.marker = {
                position: [localStorage.getItem('lat'), localStorage.getItem('lng')],
                options: function(){
                  return {
                    draggable: true
                  }
                },
                events: {
                  click: function(e) {
                    alert(e.latLng)
                  }
                }
              } 

window.open ('display_map.html','_self',false);
          });







}


$scope.go_back=function()
{
  window.open ('request_pin.html','_self',false);
}

var directionsDisplay = new google.maps.DirectionsRenderer();
$scope.rests=function(val)
{
  var rest_arr=[];
//alert(val);  
      $http({
              
              url:'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+localStorage.getItem('lat')+','+localStorage.getItem('lng')+'&radius=10000&types='+val+'&key=AIzaSyAv1cBrNcv6-E-RAbDmZCpVizKYcKvdwwc',
              method : 'GET'

              
            }).success(function(response){
              
            //  console.log(response.results.length);

             for(var i=0;i<response.results.length;i++)
             {
              var temp=[];
              temp.push(response.results[i].geometry.location.lat);
              temp.push(response.results[i].geometry.location.lng);
              rest_arr.push(temp);
              //console.log(response.results[i].geometry.location.lat+"    "+response.results[i].geometry.location.lng);
             }

            
var image = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';

$scope.points = {
  /*coords: [
    [47,-122],
    [48,-123],
    [47,-123],
    [48,-122]
  ],*/
  coords: rest_arr,
  options: function(coords, properties, i, map) {
    return {
      draggable: true,
      icon: image,

    }
  },
  events: {
    click: function(e, point, map, points) {
    console.log(e.latLng.toString().split('(')[1].split(')')[0].split(','));

   //console.log(JSON.parse(e.latLng.toString()));

    var start = new google.maps.LatLng(localStorage.getItem('lat'), localStorage.getItem('lng'));
    var end = new google.maps.LatLng(e.latLng.toString().split('(')[1].split(')')[0].split(',')[0], e.latLng.toString().split('(')[1].split(')')[0].split(',')[1]);

    // also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map); // map should be already initialized.

    var request = {
        origin : start,
        destination : end,
        travelMode : google.maps.TravelMode.DRIVING
    };
    var directionsService = new google.maps.DirectionsService(); 
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    }
  },
  decimals: 3
};

});
}







});
