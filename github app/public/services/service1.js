//basic service service1 

angular.module("service1",[]).service('git_service',function(){
	
this.userdata={};//object that has user details
this.code_set=0;
this.repoData=[];//array with repo details
this.token='';//access token
this.login='';//username
this.repos_info={};

//set repo data
this.push_repo_data=function(data){
this.repoData=data;
}

//get repo data
this.pop_repo_data=function(){
	return this.repoData;
}

//gist_service for GIST operations
}).service('gist_service',function(git_service){

this.files={};//files object that is a part of GIST POST request
this.gist_ids={};//GIST ids

this.files_for_edit={};


})