angular.module('starter.services', [])
    .factory('loginService.data', ['Restangular','environmentSetting',
        function (Restangular,environmentSetting) {
            return {
                login: function () {
                    var url = environmentSetting.AgileCollaboration.login;
                    return Restangular.all(url).getList();
                } 
            }
        }
    ])
    .factory('loginService', ['$rootScope','loginService.data',
        function ($rootScope, loginServiceModel) {
            var viewModels = {
                login: function () {
                    return loginServiceModel.login().then(function (result) {
                        $rootScope.User = result[0];
                    })
                }
            }
         return viewModels;
}]);