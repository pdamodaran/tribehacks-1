'use strict';

angular.module('raw', [
    'raw.controllers',
    'raw.filters',
    'raw.services',
    'raw.directives',
    'ui',
    'ngSanitize',
    'colorpicker.module'
])

.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        redirectTo: '/',
        templateUrl: 'partials/main.php',
        controller: 'rawCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });

});