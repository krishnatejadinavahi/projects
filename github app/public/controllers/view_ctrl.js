//view_ctrl controller

angular.module('git_app').controller('view_ctrl',['$scope','$http', 'git_service','$location','$window',function($scope,$http,git_service,$location,$window){

$scope.user_info={};


//Update views to show the users profile details and allow him to search for other users
$scope.get_info=function(){

    $location.url('list_repos');


}

//update the display object with data from the service
$scope.send_obj=function(){

   var user_json=git_service.userdata;

   console.log(user_json);

   return user_json;

}

//make API call to receive the repo data and set it in the service
$scope.set_repo_data=function(){

  var user_json=git_service.userdata;
//alert(git_service.token);
  console.log(user_json["repos_url"]+"?per_page=100");
  $http.get(user_json["repos_url"]+"?access_token="+git_service.token+"&per_page=100").success(function(data){

    git_service.push_repo_data(data);
   // console.log(git_service.pop_repo_data());  
    $scope.repo_data=git_service.pop_repo_data();


  })

}

//When user searches for other user, update the data and display the details of the new user
$scope.change_user=function(){
   

        $http.get("https://api.github.com/users/"+$scope.other_user+"?access_token="+git_service.token).success(function(data){


                console.log(data);
            
                git_service.userdata=data;

                //git_service.login=data["login"];

                $scope.myobj=git_service.userdata;

                $scope.set_repo_data();

                if ($scope.$root!=null && $scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                    $scope.$apply();
                }
                
                $scope.other_user='';

              }).error(function(err){

                //alert(err['message'])
                swal(err['message']);

              })


}

//update view to show the choices Repo, Profile,GISTS, PRs
$scope.make_choice=function(){

  $location.url('choices');

}

/*all the remaining functions update views accordingly*/
$scope.init_repos=function(){
  $location.url('repo_options');
}


$scope.init_gists=function(){
  $location.url('gist_options');
}


$scope.init_prs=function(){
  $location.url('pr_options')
}

$scope.init_profiles=function(){
  $location.url('profiles_options')
}

}]);