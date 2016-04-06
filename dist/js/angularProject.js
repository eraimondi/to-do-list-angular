var app = angular.module('app',['ui.router']);
var notas = function(myScope,$state) {
    myScope.notitas =
        [
            {
                id: 1,
                title: "Hacer mock",
                description: "mock working",
                done: true
            },
            {
                id: 2,
                title: "aprender a usar router ui",
                description: "lo que dice la descripcion",
                done: false
            }];

    myScope.remove = function (algo) {
        myScope.notitas.splice(algo.id - 1, 1);
        for (var i = algo.id - 1; i < myScope.notitas.length; i++) {

            if (myScope.notitas[i].id != 1)
                myScope.notitas[i].id = myScope.notitas[i].id - 1;
        }
    };
    myScope.add = function (nota) {
        var newnota = {};
        newnota.id = myScope.notitas.length + 1;
        newnota.done = false;
        newnota.description = nota.description;
        newnota.title = nota.title;
        myScope.notitas.push(newnota);
    };
    myScope.edit = function(nota) {
        console.log(nota);
        $state.go('edit', {id : nota.id,description : nota.description,title:nota.title});
    };
    myScope.close = function (nota){
        $state.go('list',{nota:nota});
    }
};

notas.$inject = ['$scope','$state'];
app.controller('notas',notas);

////////////////////////ROUTER//////////////////
app.config(RouterFunction);
RouterFunction.$inject = ['$stateProvider', '$urlRouterProvider'];
function RouterFunction($stateProvider,$urlRouterProvider)
{
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('list', {
            url: "/",
            templateUrl: "app/todo.template.view.html"
        })
        .state('edit', {
            url: "/list",
            templateUrl: "app/todo.template.edit.view.html",
            params: {
                nota: null
            },
            controller: 'notas'
        })

        .state('route2', {
            url: "/route2",
            templateUrl: "route2.html"
        })
        .state('route2.list', {
            url: "/list",
            templateUrl: "route2.list.html",
            controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        })
    };


