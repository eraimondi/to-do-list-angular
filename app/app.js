var app = angular.module('app',[]);
var notas = function(myScope){
	myScope.notitas =
		[{id:1,title:"Hacer mock",description:"mock working",done:true},
		{id:2,title:"aprender a usar router ui",description:"lo que dice la descripcion",done:false}];
	myScope.remove = function(algo) {
	myScope.notitas.splice(algo.id - 1, 1);
	for (var i = algo.id - 1; i < myScope.notitas.length; i++) {
		if(myScope.notitas[i].id != 1)
			myScope.notitas[i].id = myScope.notitas[i].id-1;
	}
			}
	myScope.add = function() {
		this.nota.id = myScope.notitas.length+1;
		this.nota.done = false;
		myScope.notitas.push(angular.copy(this.nota));}
	};
notas.$inject = ['$scope'];
app.controller('notas',notas);
