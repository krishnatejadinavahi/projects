//profiles_ctrl controller for operations related to Profiles

angular.module('git_app').controller('profiles_ctrl',['$scope','$http','git_service','$location','$window','gist_service','$timeout',function($scope,$http,git_service,$location,$window,gist_service,$timeout){

//Update view
$scope.edit_profiles=function(){

$location.url('edit_profiles');

}


//The changes must be "Patch"ed. But since CORS issue arises, the Patch request is made from the server side Node.JS code(proxy)

$scope.confirm_edit_profile=function(){

  console.log($scope.my_profile);

  $http({

      method : 'POST',
      url:'/proxy4',
      data:{forpatch:$scope.my_profile,token:git_service.token}


  }).success(function(data,status){

      console.log(data);
      if(data==404)
      swal("Not Found")
      else
      swal("Profile edited successfully")
   

    }).error(function(err,status){


        console.log(err);
        swal(err['message']);

  })

}

//Update the view from edit to search
$scope.search_profiles=function(){

  $location.url('search_profiles');

}

//Get the profile data corresponding to the user
$scope.get_user_profile=function(){


      $http({

      method : 'GET',
      url:'https://api.github.com/users/'+git_service.login+'?access_token='+git_service.token
      

  }).success(function(data){

    console.log(data);

    $scope.person_info=data;


  }).error(function(err){

    console.log(err);

  })



}


}]);