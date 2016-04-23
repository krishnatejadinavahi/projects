//pr_control controller for PULL REQUESTS

angular.module('git_app').controller('pr_ctrl',['$scope','$http','git_service','$location','$window','gist_service','$timeout',function($scope,$http,git_service,$location,$window,gist_service,$timeout){

//The div corresponding to information about PR's must be hidden until and unless the user wants to view it.
$scope.hide_div=1;


//Update the view
$scope.add_pr=function(){
  $location.url('new_pr');
}

//Make POST request so that the changes made are reflected in the GITHUB profile
$scope.confirm_new_pr=function(){
  console.log($scope.pr);

  $http({
      
      method : 'POST',
      url:"https://api.github.com/repos/"+git_service.login+"/"+$scope.pr_reponame+"/pulls?access_token="+git_service.token,
      data:$scope.pr
     
      
    }).success(function(data){

      console.log(data);
      swal("Pull Request created");

    }).error(function(err,status){

      console.log(err);
      swal(err['message']);

    })

}

//Update the view from create to edit
$scope.edit_pr=function(){

  $location.url('edit_pr');


}

//GET all the pull requests to display them so that the user can easily make a choice.
$scope.search_pull_req=function(){
$scope.user_name_pr=git_service.login;
  $http({
      
      method : 'GET',
      url:"https://api.github.com/repos/"+git_service.login+"/"+$scope.pr_edit_reponame+"/pulls?access_token="+git_service.token,
    
      
    }).success(function(data){

      console.log(data);
      $scope.pull_req_info=data;

    }).error(function(err,status){

      console.log(err);
      swal(err['message']);

    })
}

//Automatically populate id in the text box
$scope.auto_gen_number=function(num){
  $scope.hide_div=1;
  //$scope.pr_number='';
  $scope.pr_number=num;
}

//The changes must be "Patch"ed. But since CORS issue arises, the Patch request is made from the server side Node.JS code(proxy)
$scope.confirm_edit_pr=function(){


    $http({

      method : 'POST',
      //url:"https://api.github.com/repos?access_token="+git_service.token,
      url:'/proxy3',
      data:{forpatch:$scope.pr_edit,owner:git_service.login,repo:$scope.pr_edit_reponame,number:$scope.pr_number,token:git_service.token}


  }).success(function(data,status){

      console.log(data);
      if(data==404)
      swal("Not Found")
      else
      swal("Pull Request edited successfully");
   

    }).error(function(err){


        console.log(err);
        swal(err['message']);

  })

}

//Display information about a single PR. GET the data and display it
$scope.display_single_pr=function(){

$scope.hide_div=0;
    $http({
      
      method : 'GET',
      url:"https://api.github.com/repos/"+git_service.login+"/"+$scope.pr_edit_reponame+"/pulls/"+$scope.pr_number+"?access_token="+git_service.token,
    
      
    }).success(function(data){

      console.log(data);
      $scope.single_req_data=data;

    }).error(function(err,status){

      console.log(err);
      swal(err['message']);

    })


}

}]);