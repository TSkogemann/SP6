var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/allPersons', {
                    templateUrl: 'allPersons.html',
                    controller: 'allPersonController'
                }).
                when('/showPerson', {
                    templateUrl: 'showPerson.html',
                    controller: 'allPersonController'
                }).
                when('/newPerson', {
                    templateUrl: 'newPerson.html',
                    controller: 'newPersonController'
                });
    }])
// test - der mangler et ; hvis service fjernes
        .service("personService", function personService() {
            var personService = this;
            personService.message = "default";
             personService.selectedPerson = {};
            
            personService.persons = [{id: 1, name: "Jens", age: 18}
        , {id: 2, name: "Peter", age: 23}
        , {id: 3, name: "Hanne", age: 23}];
    
   
    
    personService.createPerson = function(createId, createName, createAge){
        personService.persons.push({
            id: createId, 
            name: createName, 
            age: createAge});
    };
    
    personService.selectPerson = function (person){
      console.log("selectPerson bliver kald med " + person);
        personService.selectedPerson = person;  
    };
    
        });

mainApp.controller('allPersonController', function ($scope, personService) {
    $scope.message = "allPersonController";
    $scope.persons = personService.persons;
    $scope.personService = personService;
    

// model that holds the last clicked element
    $scope.selected = null;
    // function that can be called from when a person is clicked
    $scope.clicked = function (value) {
        console.log("funktion clicked bliver kaldt");
        console.log("value = " +value);
        personService.selectPerson(value);
    };
});

mainApp.controller('newPersonController', function ($scope, personService, $location) {

    $scope.createNewPerson = function (newPersonName, newPersonId, newPersonAge) {

        personService.createPerson(newPersonId, newPersonName, newPersonAge);
        $location.path('allPersons');
    };

    $scope.message = "newPersonController working";

});

mainApp.controller('showPersonController', function ($scope) {
    $scope.message = "show new person";
    

});
			