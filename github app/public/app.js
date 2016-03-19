//app module

var app=angular.module('git_app',["service1","ngRoute"]);

//routeprovider to update views accordingly
app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/login.html', controller: 'main'})
            .when('/options', {templateUrl: '/options.html', controller: 'view_ctrl'})
            .when('/list_repos', {templateUrl: '/list_repos.html', controller: 'view_ctrl'})
            .when('/choices', {templateUrl: '/choices.html', controller: 'view_ctrl'})
            .when('/repo_options', {templateUrl: '/repo_options.html', controller: 'repo_ctrl'})
            .when('/new_repo', {templateUrl: '/new_repo.html', controller: 'repo_ctrl'})
            .when('/edit_repo', {templateUrl: '/edit_repo.html', controller: 'repo_ctrl'})
            .when('/search_repo', {templateUrl: '/search_repo.html', controller: 'repo_ctrl'})
            .when('/gist_options', {templateUrl: '/gist_options.html', controller: 'gist_ctrl'})
            .when('/new_gist', {templateUrl: '/new_gist.html', controller: 'gist_ctrl'})
            .when('/edit_gist', {templateUrl: '/edit_gist.html', controller: 'gist_ctrl'})
            .when('/search_gist', {templateUrl: '/search_gist.html', controller: 'gist_ctrl'})
            .when('/pr_options', {templateUrl: '/pr_options.html', controller: 'pr_ctrl'})
            .when('/new_pr', {templateUrl: '/new_pr.html', controller: 'pr_ctrl'})
            .when('/edit_pr', {templateUrl: '/edit_pr.html', controller: 'pr_ctrl'})
            .when('/profiles_options', {templateUrl: '/profiles_options.html', controller: 'profiles_ctrl'})
            .when('/edit_profiles', {templateUrl: '/edit_profiles.html', controller: 'profiles_ctrl'})
            .when('/search_profiles', {templateUrl: '/search_profiles.html', controller: 'profiles_ctrl'})
            .otherwise({redirectTo: '/'});
}]);

