angular.module('starter.services', [])
    .factory('agileService.data', ['Restangular','environmentSetting',
        function (Restangular,environmentSetting) {
            return {
                login: function (data) {
                    var url = environmentSetting.AgileCollaboration.login;
                    return Restangular.all(url).post(data);
                } ,
                getDashBoardViewModel: function (data) {
                    var url = environmentSetting.AgileCollaboration.getDashBoardViewModel;
                    return Restangular.one(url).get(data);
                } ,
                getMyProjects: function (data) {
                    var url = environmentSetting.AgileCollaboration.getMyProjects;
                    return Restangular.all(url).getList(data);
                } ,

                 search: function (data) {
                    var url = environmentSetting.AgileCollaboration.search;
                    return Restangular.one(url).get(data);
                } 
            }
        }
    ])
    .factory('agileService', ['$rootScope','agileService.data',
        function ($rootScope, agileServiceModel) {
            var viewModels = {
                login: function (data) {
                    return agileServiceModel.login(data).then(function (result) {
                        return result;
                    })
                },

                getDashBoardViewModel:function (data) {
                    return agileServiceModel.getDashBoardViewModel(data).then(function (result) {
                        return result;
                    })
                },

                getMyProjects:function (data) {
                    return agileServiceModel.getMyProjects(data).then(function (result) {
                        return result;
                    })
                },

                search:function (data) {
                    return agileServiceModel.search(data).then(function (result) {
                        return result;
                    })
                }
            }
         return viewModels;
}]);