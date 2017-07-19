var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

    $urlRouterProvider.otherwise('home');
  }
]);

app.factory('posts', [function(){
  var o = {
    posts:  [
      {title: "post 1", upVotes: 5},
      {title: "post 2", upVotes: 3},
      {title: "post 3", upVotes: 7},
      {title: "post 4", upVotes: 2.5},
    ]
  };

  return o;
}
]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts)
  {
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function(){
      if (!scope.body==='') {return;}
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      })
    }
  }
]);

app.controller('MainCtrl', [
  '$scope', 'posts',
  function($scope, posts)
  {
    $scope.posts = posts.posts;



    $scope.addPost = function(){
      if (!$scope.title || $scope.title==='') {return;}
      $scope.posts.push({
        title:$scope.title,
        link:$scope.link,
        upVotes:0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ] });
        $scope.title='';
        $scope.link='';
      }

      $scope.incrementUpVotes = function(post) {
        post.upVotes++;
      }
    }
  ]);
