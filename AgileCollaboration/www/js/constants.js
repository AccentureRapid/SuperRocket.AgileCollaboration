angular.module('starter.constants.module', [])
    .constant('starter.constants', {})
    .constant('starter.constants.environment', {
        PROD: {
            ENV: 'PROD',
            BASE_URL: 'http://agile.dystudio.cn/api/'
        },
        STAGE: {
            ENV: 'STAGE',
            BASE_URL: 'http://localhost:8080/api/'
        },
        DEV: {
            ENV: 'DEV',
            BASE_URL: 'http://localhost:8080/api/'
        },
        LOCAL: {
            ENV: 'LOCAL',
            BASE_URL: 'http://localhost:8080/api/'
        },
        MOCK: {
            ENV: 'MOCK',
            BASE_URL: 'http://localhost/LearningCMS/app/'
        }
    })

    .provider('environmentSetting', ['starter.constants.environment', function (envs) {
        var config_MOCK = {
            AgileCollaboration: {
                login: 'json/GetLoginUser.json'
            }
        },
        config_ENV = {
            AgileCollaboration: {
                login: 'AgileCollaboration/login',
                getDashBoardViewModel:'AgileCollaboration/GetDashBoardViewModel',
            }
        },
        config = {
            common: {
                authorize: 'nonce',
                upload: 'media',
                region: 'ip-country'
            }
        }


        this.setEnvironment = function (environment) {
            if (environment === envs.MOCK.ENV) {
                config_MOCK.BASE_URL = envs.MOCK.BASE_URL;
                config_MOCK.ESO_URL = envs.MOCK.ESO_URL;
                config_MOCK.ADMIN_URL = envs.MOCK.ADMIN_URL;
                config = config_MOCK;
            }
            else if (environment === envs.LOCAL.ENV) {
                config_ENV.BASE_URL = envs.LOCAL.BASE_URL;
                config_ENV.ESO_URL = envs.LOCAL.ESO_URL;
                config_ENV.ADMIN_URL = envs.LOCAL.ADMIN_URL;
                config = config_ENV;
            }
            else if (environment === envs.DEV.ENV) {
                config_ENV.BASE_URL = envs.DEV.BASE_URL;
                config_ENV.ESO_URL = envs.DEV.ESO_URL;
                config_ENV.ADMIN_URL = envs.DEV.ADMIN_URL;
                config = config_ENV;
            }
            else if (environment === envs.STAGE.ENV) {
                config_ENV.BASE_URL = envs.STAGE.BASE_URL;
                config_ENV.ESO_URL = envs.STAGE.ESO_URL;
                config_ENV.ADMIN_URL = envs.STAGE.ADMIN_URL;
                config = config_ENV
            }
            else if (environment === envs.PROD.ENV) {
                config_ENV.BASE_URL = envs.PROD.BASE_URL;
                config_ENV.ESO_URL = envs.PROD.ESO_URL;
                config_ENV.ADMIN_URL = envs.PROD.ADMIN_URL;
                config = config_ENV;
            }
        };

        this.$get = function () {
            return config;
        };
    }])

    .run(['$rootScope', 'starter.constants', function ($rootScope, constants) {
        $rootScope.constants = constants;
    }]);