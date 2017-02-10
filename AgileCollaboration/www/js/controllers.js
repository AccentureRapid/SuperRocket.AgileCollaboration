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

}])
.controller('ProjectsCtrl', ['$rootScope','$scope','agileService',function($rootScope,$scope,agileService) {

   // Perform the login action when the user submits the login form
  $scope.getMyProjects = function() {
 
      if($rootScope.currentUser.Id > 0)
      {
            var user = {};
            user.userName= $rootScope.currentUser.UserName;
            agileService.getMyProjects(user).then(function (result) {
                        $scope.projects = result;
            });
      }
  };

    $scope.getMyProjects();
  
}])
.controller('TicketCtrl', ['$rootScope','$scope','agileService','$stateParams',
function($rootScope,$scope,agileService,$stateParams) {

   $scope.getCurrentStatusTickets = function() {
 
      if($rootScope.currentUser.Id > 0)
      {     
            var status = $stateParams.ticketId;
            var data = {};
            data.Status= status;
            data.userName= $rootScope.currentUser.UserName;

            agileService.search(data).then(function (result) {
                        $scope.tickets = result.Items;
            });
      }
   };

    $scope.getCurrentStatusTickets();

}]);
