/*This file has controller code for performing operations on GISTS*/


//controller git_app
angular.module('git_app').controller('gist_ctrl',['$scope','$http','git_service','$location','$window','gist_service','$timeout',function($scope,$http,git_service,$location,$window,gist_service,$timeout){


//Start of Create GIST
//change the view to new_gist when user selects create new gist
$scope.add_gist=function(){
   $location.url('new_gist');
}


//add the file to files object as required by API
$scope.add_file=function(){

gist_service.files[$scope.gist_file_name]={"content": $scope.gist_file_content};
console.log(gist_service.files);
$scope.gist_file_name='';
$scope.gist_file_content='';

}

//construct the object as required and make a POST request to create a GIST successfully
$scope.confirm_new_gist=function(){

gist_service.files[$scope.gist_file_name]={"content": $scope.gist_file_content};

$http({
      
      method : 'POST',
      url:"https://api.github.com/gists?access_token="+git_service.token,
      data:{'description':$scope.gist_description,'public':$scope.gist_public,'files':gist_service.files}
     

      
    }).success(function(data){

      console.log(data);
      swal("GIST created successfully"); //sweet alert

      gist_service.files={}

    }).error(function(err,status){

     console.log(err);
     swal(err['message']);
        

    })

}
// End of create GIST


//Start of edit GIST

//Make a GET request to the API
$scope.edit_gist=function(){
  
//git_service is the service. login stores the username and token has the access token
  $http({
      
      method : 'GET',
      url:"https://api.github.com/users/"+git_service.login+"/gists?access_token="+git_service.token+"&per_page=200"
 
         
    }).success(function(data){

     // console.log(data);
     
     gist_service.gist_ids=data;
     

     console.log(gist_service.gist_ids);    

    }).error(function(err,status){

      console.log(err);
      

    })


//update the view 
  $location.url('edit_gist');


}

$scope.get_gist_id=function(){

  return gist_service.gist_ids;
}


//file content update
$scope.gist_c_update=function(){

  gist_service.files_for_edit[$scope.gist_content_update_name]={"content": $scope.gist_content_update_content};

  $scope.gist_content_update_name='';
  $scope.gist_content_update_content='';

  console.log(gist_service.files_for_edit);

}

//file name and content update
$scope.gist_nc_update=function(){

   gist_service.files_for_edit[$scope.gist_nc_update_old_name]={'filename':$scope.gist_nc_update_new_name,'content':$scope.gist_nc_update_content}

   $scope.gist_nc_update_old_name=''
   $scope.gist_nc_update_new_name=''
   $scope.gist_nc_update_content=''


 console.log(gist_service.files_for_edit);

}


//delete file
$scope.gist_del=function(){

  gist_service.files_for_edit[$scope.gist_delete_name]=null;
  $scope.gist_delete_name='';

}

/*Make a patch request with the updated object. SINCE PATCH HAS CORS ISSUE, a proxy has been made and the patch request is made
from the server side Node.JS code */
$scope.confirm_edit_gist=function(){


  $http({

      method : 'POST',
      //url:"https://api.github.com/repos?access_token="+git_service.token,
      url:'/proxy2',
      data:{forpatch:{description:$scope.gist_description,files:gist_service.files_for_edit},id:$scope.gist_id_for_patch,token:git_service.token}


  }).success(function(data,status){

      console.log(data);
      if(data==404)
      swal("Not Found")
      else  
      swal("GIST edited successfully");

    }).error(function(err){


        console.log(err);
        swal(err['message']);

  })

}


$scope.search_gist=function(){

  $location.url('search_gist');

}


//API call to get the GIST details
$scope.get_gist_details=function(id){

    $http({
      
      method : 'GET',
      url:"https://api.github.com/gists/"+id+"?access_token="+git_service.token+"&per_page=200"
 
         
    }).success(function(data){

      console.log(data);
      $scope.gist_information=data;

    })

}

//Automatically populate id in the textbox
$scope.auto_pop_id=function(id){
  $scope.gist_id_for_patch=id;
}


}]);