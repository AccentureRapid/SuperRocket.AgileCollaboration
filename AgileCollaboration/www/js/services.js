angular.module('starter.services', [])
    .factory('loginService.data', ['Restangular','environmentSetting',
        function (Restangular,environmentSetting) {
            return {
                login: function (data) {
                    var url = environmentSetting.AgileCollaboration.login;
                    return Restangular.all(url).post(data);
                } 
            }
        }
    ])
    .factory('loginService', ['$rootScope','loginService.data',
        function ($rootScope, loginServiceModel) {
            var viewModels = {
                login: function (data) {
                    return loginServiceModel.login(data).then(function (result) {
                        return result;
                    })
                }
            }
         return viewModels;
}]);