angular.module('starter.controllers', [])

.controller('AppCtrl', ['$rootScope','$scope', '$ionicModal','$timeout','$state','agileService',

function($rootScope, $scope, $ionicModal, $timeout,$state,agileService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var vm = this; 
  // Form data for the login modal
  $scope.loginData = {};
  $rootScope.currentUser = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {

    $scope.modal = modal;
    CheckCurrentUserLogin();

  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

     console.log('Doing login', $scope.loginData);
     agileService.login($scope.loginData).then(function (result) {
          if (result.Id > 0)
          {
            $rootScope.currentUser = result;
            $scope.$broadcast('onLoginSuccess', result);
            $timeout(function() {
              $scope.closeLogin();
            }, 1000);
          }else
          {
            alert("login failed please check your username and password.")
          }
     });
  };

 

  function CheckCurrentUserLogin(){
     
     
     if($rootScope.currentUser.Id == null)
     {
        $scope.modal.show();
     }else
     {
        $state.go('app.tickets')
     }
  };

}])

.controller('TicketsCtrl', ['$rootScope','$scope','agileService',function($rootScope,$scope,agileService) {


 $scope.$on('onLoginSuccess', function(event,data) {
		$scope.getDashBoardViewModel(data);
	});

   // Perform the login action when the user submits the login form
  $scope.getDashBoardViewModel = function(data) {
 
      if($rootScope.currentUser.Id > 0)
      {
            var user = {};
            user.userName= data.UserName;
            agileService.getDashBoardViewModel(user).then(function (result) {
                        $scope.allTickets = result.AllTickets;
            });
      }
  };

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
}])

.controller('TicketCtrl', function($scope, $stateParams) {
});
