angular.module('meme', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope, $http){
    $scope.test = 'Hello world!';
    $scope.memes = [];
    $scope.addMeme = function() {
      if($scope.formContent === '') { return; }
      console.log("In addMeme with "+$scope.formContent);
      $scope.create({
	title: $scope.formContent,
	upvotes: 0,
      });
      $scope.formContent='';
    };
    $scope.incrementUpvotes = function(meme) {
      return $http.put('/memes/' + meme._id + '/upvote')
	.success(function(data) {
	  console.log("upvote worked");
	  meme.upvotes += 1;
	});
    };
    $scope.decrementUpvotes = function(meme) {
      return $http.put('/memes/' + meme._id + '/downvote')
	.success(function(data) {
	console.log("downvote worked");
	meme.upvotes -=1;
      });
    };
    $scope.getAll = function() {
      return $http.get('/memes').success(function(data) {
	angular.copy(data, $scope.memes);
      });
    };
    $scope.getAll();
    $scope.create = function(meme) {
      return $http.post('/memes', meme).success(function(data) {
        $scope.memes.push(data);
      });
    };
    $scope.delete = function(meme) {
      $http.delete('/memes/' + meme._id)
	.success(function(data) {
	  console.log("delete worked");
          $scope.getAll();
        });
    };
  }
]);
