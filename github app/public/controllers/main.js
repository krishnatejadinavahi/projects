/*This file has code to make the authentication API request and get the client id, client secret and access token*/

//controller main
angular.module('git_app').controller('main',['$scope','$http', 'git_service','$location','$window','$q',function($scope,$http,git_service,$location,$window,$q){

//method which retrieves code and puts the code in URL
$scope.login=function(){

 $window.location.href ="https://github.com/login/oauth/authorize?client_id=cd1dee6f7b4c873dcc87&scope=user,user:email,notifications,repo,public_repo,gist";
 //use $window instead of window
}

//check if we got a code, if so make an API request ot get the access token

//A proxy is needed here because the brower generates an CORS issue. So, the request is made through the server.
 if ("onhashchange" in window) {

  if((window.location.href.indexOf('code=')!=-1)&&(git_service.code_set==0)){

  
    var code=window.location.href.split('=')[1];

    git_service.code_set=1;


           /*$http({
              
              url:'/proxy',
              data:{client_id:'cd1dee6f7b4c873dcc87',client_secret:'2fddf2f0e4ec8b01ea42fc8adecbc4e885ce6e9c',code:code},
              method : 'POST'

              
            }).success(function(response){

              //console.log(response);

              var token=response.split('=')[1].split('&')[0];

              git_service.token=token;

              console.log(token);

              $http.get("https://api.github.com/user?access_token="+token).success(function(data){


                console.log(data);

//store the values in the service

                git_service.userdata=data;

                git_service.login=data["login"];

                $location.url('options'); 
                

              })

            })*/


//location.url returns url parameters also. location.path returns the url without parameters.
//So just for safety, use $location.url

      function f1(){
        var q=$q.defer();

        $http({
              
              url:'/proxy',
              data:{client_id:'cd1dee6f7b4c873dcc87',client_secret:'2fddf2f0e4ec8b01ea42fc8adecbc4e885ce6e9c',code:code},
              method : 'POST'

              
            }).success(function(response){
              git_service.token=response.split('=')[1].split('&')[0];
              q.resolve(response.split('=')[1].split('&')[0]);
            })

            return q.promise;
      }



      function f2(result) {

        var q1=$q.defer();
        $http.get("https://api.github.com/user?access_token="+result).success(function(data){


        q1.resolve(data);

      })
      return q1.promise;
      }



      f1().then(function(result){
        return f2(result);
      }).then(function(data){


        console.log(data);

//store the values in the service

        git_service.userdata=data;

        git_service.login=data["login"];

        $location.url('options');

      })



  }

}

}]);