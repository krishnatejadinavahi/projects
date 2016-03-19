//repo_ctrl controller for operations related to repositories

angular.module('git_app').controller('repo_ctrl',['$scope','$http', 'git_service','$location','$window',function($scope,$http,git_service,$location,$window){


//Update view
$scope.add_repo=function(){
  $location.url('new_repo');
}


//Make POST request so that changes are visible in GITHUB profile
$scope.confirm_new_repo=function(){
  console.log($scope.repo);

    $http({
      
      method : 'POST',
      url:"https://api.github.com/user/repos?access_token="+git_service.token,
      data:$scope.repo
     

      
    }).success(function(data){

      console.log(data);

      swal("Repo created");


    }).error(function(err,status){

      console.log(err['message']);
      if(status==422)
      {
      swal("Repo exists");
      } 
      else{
        swal(err['message']);
      }

    })
}


//The changes must be "Patch"ed. But since CORS issue arises, the Patch request is made from the server side Node.JS code(proxy)

$scope.edit_repo=function(){
  $location.url('edit_repo');
}

$scope.confirm_edit_repo=function(){

  //console.log($scope.old_repo);

      $http({
      
      method : 'POST',
      //url:"https://api.github.com/repos?access_token="+git_service.token,
      url:'/proxy1',
      data:{oldrepo:$scope.old_repo,token:git_service.token,login:git_service.login}
     

      
    }).success(function(data){

      console.log(data);
     if(data==404){

        swal("Repo does not exist")
      }

      else
      {

      swal("Edit successful");


      }

    }).error(function(err,status){


        console.log(status);
        swal(err['message']);

 

    })

}

//Update view
$scope.search_repo=function(){
  $location.url('search_repo');
}


//Make GET request, use the data that has been received to display information related to the repo
$scope.confirm_search_repo=function(){
$scope.ref_disable=0;

  $http({
      
      method : 'GET',
      //url:"https://api.github.com/repos?access_token="+git_service.token,
      url:'https://api.github.com/repos/'+git_service.login+'/'+$scope.search_old_repo.name+'?access_token='+git_service.token,

      
    }).success(function(data){

     $scope.search_results=data;
     git_service.repos_info=data;//store in the service

    }).error(function(err,status){

       
        if(status==404)
        {

          swal("repo does not exist");
        }
        else{
          swal(err['message']);
        }

    })


}



}]);