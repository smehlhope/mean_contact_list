var myApp = angular.module('myApp', []);

myApp.controller('AppController', function($scope, $http) {

	console.log('AppController running!');


	$scope.addContact = function(newContact) {
		console.log("newContact ctrl: ", newContact);
		
		$http.post('/contactlist', $scope.newContact).success(function(res) {
			console.log('Getting addContact data back from server: ', res);
			});
		getContacts();
		$scope.newContact = {};
	}

	var getContacts = function() {
		$http.get('/contactlist').success(function(res) {
			$scope.contactlist = res;
			$scope.newContact = {};
		})
	}

	getContacts();

	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/contactlist/'+id).success(function(res) {
			getContacts();
		})
	}

	$scope.edit = function(id) {
		console.log(id);
		$http.get('/contactlist/'+id).success(function(res) {
			$scope.newContact = res;
		})
	}
	$scope.update = function(newContact) {
		console.log(newContact);
		$http.put('/contactlist/'+ newContact._id, $scope.newContact).success(function(res) {
			getContacts();
		})
		
	}
	$scope.clear = function() {
		$scope.newContact = "";
	}
});
